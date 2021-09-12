import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { HandleErrorService } from "./HandleErrorService";


@Injectable({
  providedIn: 'root'
})
export class ServerErrorsInterceptorService implements HttpInterceptor {
  constructor(
    private error: HandleErrorService,
  ) {}

  // intercept function
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    // returning an observable to complete the request cycle
    return new Observable((observer) => {
      next.handle(request).subscribe(
        (res: HttpResponse<any>) => {
          if (res instanceof HttpResponse) {
            observer.next(res);
          }
        },
        (err: HttpErrorResponse) => {
          this.error.handleError(err);
        }
      );
    });
  }
}