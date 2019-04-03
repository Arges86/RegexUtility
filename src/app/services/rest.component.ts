import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class Rest {

    constructor(private http: HttpClient) {}

    checkPwd(pwd: string) {
        const url = `https://api.pwnedpasswords.com/range/${pwd}`;
        return this.http.get(url, {responseType: 'text'}).pipe(
            map(res => {
                return res.split('\n');
            })
        );
    }
}
