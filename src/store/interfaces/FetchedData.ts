/**
 * Describes an interface for some data fetched from a server, where the data may be undefined while fetching.
 * Used within selectors to help manage deeply derived state and to manage fine-grained loading state within
 * the ui
 */
export interface FetchedData<T> {
  data: T | undefined;
  isLoading: boolean;
}
