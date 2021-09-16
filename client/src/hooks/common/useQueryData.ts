import { useLocation } from 'react-router-dom';
import { extractQueryData } from '../../utils/helpers/queryHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useQueryData = (): any => {
  const pathLocation = useLocation();
  const queryString = pathLocation?.search;
  const queryData = extractQueryData(queryString);
  return queryData;
};

export default useQueryData;
