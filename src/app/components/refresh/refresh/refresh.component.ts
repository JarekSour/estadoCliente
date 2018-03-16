import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-refresh',
    templateUrl: './refresh.component.html',
    styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {

    constructor(public router: Router) { }

    ngOnInit() {
        if (localStorage.getItem('_c'))
            this.router.navigate(['/home']);
        else
            this.router.navigate(['/login']);
    }

}
