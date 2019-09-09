import {Component, Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import {catchError} from "rxjs/internal/operators/catchError";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class Interceptor implements HttpInterceptor{
    spinner;
    intercept(request: HttpRequest<any>, next: HttpHandler):Observable<any>{
        let token = window.localStorage.getItem('token');
        if(token){
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer' + ' ' + token,
                }
            });
        }
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if(error.error instanceof ErrorEvent){
                errorMessage = 'Error: ' + error.error.message;
            }
            else{
                this.spinner = false;
                errorMessage = 'Error: ' + error.status + ' message: ' + error.message +'!Opps Some Internal Server Error';
            }
            alert(errorMessage);
            this.router.navigate(['/login']);
            return throwError(errorMessage);
            })
        );
    }

    constructor(private router: Router) {}
}
