export enum HttpMethod {
    POST = "POST",
    PUT = "PUT",
    GET = "GET",
    PATCH = "PATCH",
    DELETE = "DELETE",
  }
  
  interface RequestOptions {
    method?: HttpMethod;
    headers?: HeadersInit;
    body?: any;
  }
  
  const fetcher = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
 
    try {
      const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.statusText} (status: ${response.status})`);
      }
  
      return await response.json();
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error ? error.message : "An unknown error occurred while fetching."
      );
    }
  };
  
export default fetcher;
  
  