import { CombinedError, useQuery } from 'urql';
import {
  Balloon,
  GetBalloonDataDocument,
  GetBalloonDataQueryVariables,
} from '../../graphql/generated';

export interface UseGetProductPageData {
  product: Balloon | undefined | null;
  fetching: boolean;
  error: CombinedError | undefined;
}

export const useProduct = ({
  id,
}: GetBalloonDataQueryVariables): UseGetProductPageData => {
  const [result] = useQuery({
    query: GetBalloonDataDocument,
    variables: { id },
  });
  const { data, fetching, error } = result;
  const product = data?.balloon;

  return { product, fetching, error };
};
