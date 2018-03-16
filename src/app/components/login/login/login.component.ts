import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    json = { rut: '', passw: '' }
    jsonSend = { rut: '', passw: '' }
    error: string;

    constructor(
        public router: Router,
        public authService: AuthService,
    ) { }

    ngOnInit() {
    }

    doLogin() {
        this.jsonSend.rut = this.json.rut.split('.').join("");
        this.jsonSend.passw = this.json.passw
        this.authService.login(this.jsonSend).then((response) => {
            if (response['data'] != false) {
                localStorage.setItem('_c', response['data'][0]['Cuenta'])
                localStorage.setItem('_nombre', response['data'][0]['Titular'])
                localStorage.setItem('_rut', this.formatRut(response['data'][0]['Rut'], true))
                this.router.navigate(['/home']);
            } else {
                this.error = 'Usuario o contraseña incorrecta';
            }
        })
    }

    formatRut(evt, par = null) {
        let rut = par == null ? evt.target.value : evt;
        var actual = rut.replace(/^0+/, "");
        if (actual != '' && actual.length > 1) {
            var sinPuntos = actual.replace(/\./g, "");
            var actualLimpio = sinPuntos.replace(/-/g, "");
            var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
            var rutPuntos = "";
            var i = 0;
            var j = 1;
            for (i = inicio.length - 1; i >= 0; i--) {
                var letra = inicio.charAt(i);
                rutPuntos = letra + rutPuntos;
                if (j % 3 == 0 && j <= inicio.length - 1) {
                    rutPuntos = "." + rutPuntos;
                }
                j++;
            }
            var dv = actualLimpio.substring(actualLimpio.length - 1);
            rutPuntos = rutPuntos + "-" + dv;
        }

        if (par == null) {
            evt.target.value = rutPuntos;
            this.json.rut = rutPuntos;
        } else {
            return rutPuntos
        }

    }

}
