import { parse, ParsedQuery } from 'query-string';

export const extractQueryData = (url: string): ParsedQuery<string> => {
  if (!url) {
    return {};
  }
  return parse(url);
};
