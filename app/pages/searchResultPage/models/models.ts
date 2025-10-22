export type SearchResultDataItem = {
  timestamp: number;
  features: {
    interest: number;
  };
};

export type SearchResultData = {
  data: SearchResultDataItem[];
};
