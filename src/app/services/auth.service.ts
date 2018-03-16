import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AuthService {

    url = 'http://10.77.1.10:6002';

    constructor(public http: HttpClient) { }

    login(json) {
        return new Promise((resolve, reject) => {
            this.http.post(this.url + '/cliente/ingreso', json)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
        })
    }

}
