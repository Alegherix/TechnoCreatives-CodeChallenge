import { CombinedError, useQuery } from 'urql';
import {
  BalloonConnection,
  BalloonsDocument,
  BalloonsQueryVariables,
} from '../../graphql/generated';

export interface UseGetBalloons
  extends Partial<Exclude<BalloonConnection, '__typename'>> {
  fetching: boolean;
  error: CombinedError | undefined;
}

/**
 * A custom hook that's used to return edges (BalloonEdges), PageInfo for pagination , error and loading state for the Store
 * @param variables The variables such as Filters, Sorting, or Cursors
 */
export const useGetBalloons = (
  variables: BalloonsQueryVariables
): UseGetBalloons => {
  const [result] = useQuery({
    query: BalloonsDocument,
    variables,
  });

  const { data, error, fetching } = result;

  const pageInfo = data?.balloons.pageInfo;
  const edges = data?.balloons.edges;

  return { pageInfo, edges, error, fetching };
};
