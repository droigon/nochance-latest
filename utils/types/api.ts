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
