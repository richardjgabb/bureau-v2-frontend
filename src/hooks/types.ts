export interface FetchState<T> {
    data: {
      message: string;
      status: number;
      data: T;
  } | null;
    loading: boolean;
    error: Error | null;
}
