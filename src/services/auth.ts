import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()

export class AuthService {
    constructor(private http: HttpClient) {
    }

    get(url) {
        return this.http.get(url);
    }

    post(url, data): Observable<any> {

        const httpOptions = {
            headers : new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.http.post(url, data.toString(), httpOptions);
        
    }

}