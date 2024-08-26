import { HttpInterceptorFn } from '@angular/common/http';

export const userAuthInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token');
  req = req.clone({headers: req.headers.set('Authorization','bearer '+token)});
  return next(req);
};
