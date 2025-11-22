// global API response types
export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorCode?: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

export interface StandardResponse<T> {
  statusCode?: number;
  success: boolean;
  message: string;
  data: T;
  error?: unknown;
  meta?: unknown;
}
