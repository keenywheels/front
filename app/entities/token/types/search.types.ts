export type SearchResultRequest = {
  token: string;
  start: string;
  end?: string;
};

export type SearchResultRecord = {
  timestamp: string;
  features: {
    interest: number;
    interest_normalized: number;
    sentiment: number;
  };
};

export type SearchResult = {
  token: string;
  records: SearchResultRecord[];
};

export type SearchResultResponse = SearchResult[];
