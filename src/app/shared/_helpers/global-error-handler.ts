import {HTTP_INTERCEPTORS, HttpErrorResponse} from "@angular/common/http";
import {ErrorHandler, Injectable} from "@angular/core";
import {HttpRequestInterceptor} from "./http.interceptor";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {
  }

  handleError(error: any) {
    console.error('Error from global error handler', error);
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    alert(
      error?.message || 'Some error occurred. Please try again later.' +
      error?.status || ''
    );

  }
}

export const GLOBAL_ERROR_HANDLER_PROVIDER = [
  { provide: ErrorHandler, useClass: GlobalErrorHandler}
];
