// lifted from https://gist.github.com/jedrichards/c02af3496f4e304b720a9624db647dfb

import { DocumentNode } from 'graphql';
import { useEffect, useState } from 'react';
import { QueryHookOptions, OperationVariables, useQuery } from '@apollo/client';

function useCachedQuery<TData, TVariables extends OperationVariables>(
  query: DocumentNode,
  options: QueryHookOptions<TData, TVariables> = {},
) {
  const [data, setData] = useState<TData | null>(null);
  const res = useQuery<TData, TVariables>(query, options);

  useEffect(() => {
    if (res.data && Object.keys(res.data).length > 0) {
      setData(res.data);
    }
  }, [res, res.networkStatus]);

  return {
    ...res,
    data,
  };
}

export default useCachedQuery;
