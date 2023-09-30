import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, retry, throwError } from "rxjs";
import { environment } from "../environment/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private rootUrl = environment.apiEndPoint;
  private version = "api/v1";
  private baseUrl = `${this.rootUrl}/${this.version}`;

  constructor(private http: HttpClient) {}

  get(url: string, cb: any) {
    const endpoint = this.baseUrl + url;
    this.http
      .get<ResponseObject>(endpoint)
      .pipe(retry(3), catchError(this.handleError))
      .subscribe((data) => {
        if (data.success) {
          cb(data);
        } else {
          this.showErrorMessage(data);
        }
      });
  }

  public search(url: string, query: any, cb: any, silent = false) {
    const endpoint = this.baseUrl + url;
    const params = new HttpParams({
      fromObject: query,
    });
    this.http
      .get<ResponseObject>(endpoint, { params })
      .pipe(
        //  retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .subscribe((data) => {
        if (!data.success) {
          this.showErrorMessage(data);
        } else {
          cb(data);
        }
      });
  }

  post(url: string, body: any, cb: any) {
    const endpoint = this.baseUrl + url;
    this.http
      .post<ResponseObject>(endpoint, body)
      .pipe(retry(0), catchError(this.handleError))
      .subscribe((data) => {
        if (data) {
          cb(data);
        } else {
          this.showErrorMessage(data);
        }
      });
  }

  patch(url: string, body: any, cb: any) {
    const endpoint = `${this.baseUrl} + ${url}`;
    this.http
      .patch(endpoint, body)
      .pipe(retry(3), catchError(this.handleError))
      .subscribe((data) => {
        if (data) {
          cb(data);
        } else {
          this.showErrorMessage(data);
        }
      });
  }

  public delete(url: string, cb: any, silent = false) {
    const endpoint = this.baseUrl + url;
    this.http
      .delete<ResponseObject>(endpoint)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      )
      .subscribe((data) => {
        if (!data.success) {
          this.showErrorMessage(data);
        } else {
          cb(data);
        }
      });
  }

  private showErrorMessage = (message: any) => {
    console.log(message);
  };

  private handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      if (error.status === 401) {
        console.log("login user out");
      }
      this.showErrorMessage(error.error);
    }

    return throwError(() => "Something went wrong, please try again later");
  };
}

export interface ResponseObject {
  success: boolean;
  data: any;
}
