import {
  ApolloClient,
  ApolloLink,
  Context,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from './websocket';
import { setContext } from '@apollo/client/link/context';

const wsLink =
  typeof window !== 'undefined'
    ? new WebSocketLink({
        url: 'ws://localhost:4000/graphql',
      })
    : null;

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const splitLink =
  typeof window !== 'undefined'
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink!,
        httpLink
      )
    : httpLink;

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//       graphQLErrors.map(({ message, locations, path }) =>
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         )
//       );
//     if (networkError) console.log(`[Network error]: ${networkError}`);
//   });

export function createApolloClient(initialState: NormalizedCacheObject) {
  let link: ApolloLink = splitLink;

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache().restore(initialState),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}
