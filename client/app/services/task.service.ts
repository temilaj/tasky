import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private _http:Http){

    }

    getTasks(){
        return this._http.get('/api/v1/tasks')
            .map(res => res.json());
    }

    saveTask(task){
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/task', JSON.stringify(task), {headers: headers})
            .map(res => res.json());
    }

    updateTask(task){
        var headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/task/'+task._id, JSON.stringify(task), {headers: headers})
            .map(res => res.json());
        
    }
}