import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'


export class HttpErrorInterceptor implements HttpInterceptor {
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    
                    Swal.fire({
                        title: 'Error!',
                        text: error.error.message,
                        icon: 'error',
                        timer: 2000,
                        confirmButtonText: 'ok'
                      })
                    return throwError('');

                })

            )

    }

}