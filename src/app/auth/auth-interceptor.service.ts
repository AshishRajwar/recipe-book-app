import { HttpClient, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private http: HttpClient, private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {       

        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {                
                // return this.http.get<Recipe[]>(
                //     'https://ng-complete-guide-154b0-default-rtdb.firebaseio.com/recipes.json',
                //     {
                //         params: new HttpParams().set('auth',user.token)
                //     }
                // );
                if(!user) {
                    return next.handle(req); 
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        )        
    }

}