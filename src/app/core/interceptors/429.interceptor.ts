import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, mergeMap, Observable, retryWhen, throwError, timer } from "rxjs";
import { MassageService } from "../services/massage.service";

export const retry429Interceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MassageService);

  return next(req).pipe(
    retryWhen(errors =>
      errors.pipe(
        mergeMap((error: HttpErrorResponse, retryCount) => {
          if (error.status === 429 && retryCount < 3) {
            if (retryCount === 0) {
              messageService.setMessage('Rate limit exceeded. Please try again later.');
            }

            const retryAfter = error.headers?.get('Retry-After');
            const waitTime = retryAfter ? +retryAfter * 1000 : 30000;

            return timer(waitTime);
          }
          return throwError(() => error);
        })
      )
    ),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 429) {
        messageService.setMessage('Rate limit exceeded. Please try again later.');
      }
      return throwError(() => error);
    })
  );
};