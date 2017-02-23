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
      });
  }

  addTask(event, taskText){
    // console.log(taskText.value);
    var result;
    var newTask = {
      text: taskText.value,
      isCompleted: false
    };

    result = this._taskService.saveTask(newTask);
    result.subscribe(x => {
      this.tasks.push(newTask);
      taskText.value ='';
    });
  }

  setEditState(task, state){
    if(state){
      task.isEditMode = state;
      console.log("task in edit mode" + state)
    }
    else{
      console.log("task no longer in edit mode");
      delete task.isEditMode;
    }
  }

  updateTaskStatus(task){
    var _task = {
      _id: task._id,
      text: task.text,
      isCompleted: !task.isCompleted
    };
    console.log("task updated" + task.value);
    this._taskService.updateTask(_task)
      .subscribe(data => {
        task.isCompleted  = !task.isCompleted;
      });
  }

  updateTaskText(event, task){
    if(event.which == 13){
      task.text = event.target.value;
      var _task = {
        _id: task._id,
        text: task.text,
        isCompleted: task.isCompleted
      };

      this._taskService.updateTask(_task)
      .subscribe(data => {
        // this.setEditState(task, false);
        task.isCompleted = !task.isCompleted;
      });
    }
  }

  deleteTask(task){
    var tasks = this.tasks;
    console.log("delete task fn in component");
    this._taskService.deleteTask(task._id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < tasks.length; i++){
            if(tasks[i]._id == task._id){
              tasks.splice(i, 1);
            }
          }
        }
      })
  }
}
