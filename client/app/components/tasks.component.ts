import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import {Task } from '../Task';

@Component({
  moduleId: module.id,
  selector: 'tasks-section',
  templateUrl: 'tasks.component.html',
})
export class TasksComponent implements OnInit { 
  tasks: Task[];

  constructor(private _taskService: TaskService){

  }

  ngOnInit(){
    this.tasks = [];
    this._taskService.getTasks()
      .subscribe(tasks =>{
        // console.log(tasks);
        this.tasks = tasks;
      })
  }
}
