import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../apis/cruds-api/src';

export default () => {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000',
      }),
    ],
  });

}