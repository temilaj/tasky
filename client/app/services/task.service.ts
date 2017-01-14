import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private _http:Http){

    }

    getTasks(){
        return this._http.get('/api/v1/tasks')
            .map(res => res.json());
    }
}