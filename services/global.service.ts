import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class GlobalService {

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient) { }

  
    getAll() {
        return this.http.get("");
    }

}
