import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthorizationService } from "src/app/authorization/authorization.service";
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthorizationService) { }

    /**@method */
    /**intercepts all outgoing http requests and add the store jwt to the request header as authorization */
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "" + authToken
            }
        });
        return next.handle(req);
    }
}