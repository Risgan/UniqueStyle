import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');

    if (token) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(modifiedReq);
    }
  }

  return next(req);
};
