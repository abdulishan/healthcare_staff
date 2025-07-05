import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenVal = localStorage.getItem('authToken');
  if(tokenVal){
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenVal}`)
    })
  }
  return next(req);
};
