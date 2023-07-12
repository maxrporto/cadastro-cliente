import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from '../utils/localstorage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  localStorageUtil = new LocalStorageUtils();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }


  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //     return next.handle(req).pipe(catchError(error => {

  //         if (error instanceof HttpErrorResponse) {

  //             if (error.status === 401) {
  //                 this.localStorageUtil.limparDadosLocaisUsuario();
  //                 console.log(this.router.url );
  //                 //queryParams : é uma coleção da rota
  //                 this.router.navigate(['/conta/login'], { queryParams: { returnUrl: this.router.url } });
  //             }
  //             if (error.status === 403) {
  //                 this.router.navigate(['/acesso-negado']);
  //             }
  //         }

  //         return throwError(error);
  //     }));
}