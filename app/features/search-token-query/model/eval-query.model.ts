import {
  type SearchResult,
  type SearchResultRecord,
  searchToken,
} from '@entities/token';

import { createQueryEval, extractTokens } from '../lib/query-parser.lib';

const interpolate = (
  before: SearchResultRecord,
  after: SearchResultRecord,
  currentDate: Date,
): SearchResultRecord['features'] => {
  const beforeDate = new Date(before.timestamp);
  const afterDate = new Date(after.timestamp);
  const timeDiff = afterDate.getTime() - beforeDate.getTime();
  const currentTimeDiff = currentDate.getTime() - beforeDate.getTime();

  if (timeDiff === 0) {
    return before.features;
  }

  const ratio = currentTimeDiff / timeDiff;

  const interest_normalized =
    before.features.interest_normalized +
    (after.features.interest_normalized - before.features.interest_normalized) *
      ratio;
  const sentiment =
    before.features.sentiment +
    (after.features.sentiment - before.features.sentiment) * ratio;

  return {
    interest_normalized,
    sentiment,
    interest: interest_normalized,
  };
};

const fillMissingDates = (
  records: SearchResultRecord[],
  fullDateRange: string[],
): SearchResultRecord[] => {
  if (records.length === 0) {
    return fullDateRange.map((date) => ({
      timestamp: date,
      features: {
        interest: 0,
        interest_normalized: 0,
        sentiment: 0,
      },
    }));
  }

  const recordsMap = new Map(records.map((r) => [r.timestamp, r]));
  const filledRecords: SearchResultRecord[] = [];

  for (let i = 0; i < fullDateRange.length; i++) {
    const dateStr = fullDateRange[i];
    if (recordsMap.has(dateStr)) {
      filledRecords.push(recordsMap.get(dateStr)!);
    } else {
      let prevRecord: SearchResultRecord | null = null;
      for (let j = i - 1; j >= 0; j--) {
        if (recordsMap.has(fullDateRange[j])) {
          prevRecord = recordsMap.get(fullDateRange[j])!;
          break;
        }
      }

      let nextRecord: SearchResultRecord | null = null;
      for (let j = i + 1; j < fullDateRange.length; j++) {
        if (recordsMap.has(fullDateRange[j])) {
          nextRecord = recordsMap.get(fullDateRange[j])!;
          break;
        }
      }

      const currentDate = new Date(dateStr);
      let features: SearchResultRecord['features'];

      if (prevRecord && nextRecord) {
        features = interpolate(prevRecord, nextRecord, currentDate);
      } else if (prevRecord) {
        features = prevRecord.features;
      } else if (nextRecord) {
        features = nextRecord.features;
      } else {
        features = { interest: 0, interest_normalized: 0, sentiment: 0 };
      }

      filledRecords.push({
        timestamp: dateStr,
        features,
      });
    }
  }

  return filledRecords;
};

export const executeQuerySearch = async (
  query: string,
): Promise<SearchResult | { error: string }> => {
  try {
    const tokens = extractTokens(query);
    if (tokens.length === 0) {
      const result = await searchToken({
        token: query,
        start: new Date(
          new Date().setFullYear(new Date().getFullYear() - 1),
        ).toISOString(),
      });
      if ('error' in result) {
        return { error: `failed to fetch data for token: ${query}` };
      }
      return result.length > 0 ? result[0] : { token: query, records: [] };
    }

    const evaluator = createQueryEval(query);

    const searchPromises = tokens.map((token) =>
      searchToken({
        token,
        start: new Date(
          new Date().setFullYear(new Date().getFullYear() - 1),
        ).toISOString(),
      }),
    );
    const results = await Promise.all(searchPromises);

    const allTimestamps = new Set<string>();
    results.forEach((res) => {
      if (Array.isArray(res) && res.length > 0 && res[0]) {
        res[0].records.forEach((r) => allTimestamps.add(r.timestamp));
      }
    });

    if (allTimestamps.size === 0) {
      return { token: query, records: [] };
    }

    const sortedDates = Array.from(allTimestamps).sort();
    const minDate = new Date(sortedDates[0]);
    const maxDate = new Date(sortedDates[sortedDates.length - 1]);
    const fullDateRange: string[] = [];
    for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
      fullDateRange.push(d.toISOString().split('T')[0]);
    }

    const denseTokenData: Record<string, SearchResultRecord[]> = {};
    results.forEach((res, index) => {
      const tokenName = tokens[index];
      const records =
        Array.isArray(res) && res.length > 0 && res[0] ? res[0].records : [];
      denseTokenData[tokenName] = fillMissingDates(records, fullDateRange);
    });

    const finalRecords: SearchResultRecord[] = [];
    for (const date of fullDateRange) {
      const dailyTokenValues: Record<string, number> = {};
      const sentimentValues: number[] = [];

      tokens.forEach((token) => {
        const record = denseTokenData[token].find((r) => r.timestamp === date);
        dailyTokenValues[token] = record?.features.interest_normalized ?? 0;
        sentimentValues.push(record?.features.sentiment ?? 0);
      });

      const calculatedInterest = evaluator(dailyTokenValues);
      const calculatedSentiment =
        sentimentValues.reduce((a, b) => a + b, 0) /
        (sentimentValues.length || 1);

      finalRecords.push({
        timestamp: date,
        features: {
          interest: calculatedInterest,
          interest_normalized: calculatedInterest,
          sentiment: calculatedSentiment,
        },
      });
    }

    return { token: query, records: finalRecords };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    return { error: message };
  }
};
