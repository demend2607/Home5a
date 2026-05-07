import { env } from "../config/env";

type HttpMethod = "GET" | "POST" | "DELETE";

export class ApiClient {
  constructor(
    private baseUrl: string,
    private defaultHeaders: HeadersInit = { "Content-type": "application/json" },
  ) {}

  private async request<T>(method: HttpMethod, path: string, data?: any): Promise<T> {
    let url = `${this.baseUrl}${path}`;

    const response = await fetch(url, {
      method,
      headers: this.defaultHeaders,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API ${response.status}: ${errorText.slice(0, 200)}`);
    }
    if (response.status === 204) return undefined as T;

    return response.json();
  }
  get<T>(path: string) {
    return this.request<T>("GET", path);
  }

  post<T>(path: string, data: any) {
    return this.request<T>("POST", path, data);
  }
}
export const api = new ApiClient(`${env.apiUrl}/api/v1`);
