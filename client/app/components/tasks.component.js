"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var task_service_1 = require('../services/task.service');
var TasksComponent = (function () {
    function TasksComponent(_taskService) {
        this._taskService = _taskService;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tasks = [];
        this._taskService.getTasks()
            .subscribe(function (tasks) {
            // console.log(tasks);
            _this.tasks = tasks;
        });
    };
    TasksComponent.prototype.addTask = function (event, taskText) {
        var _this = this;
        // console.log(taskText.value);
        var result;
        var newTask = {
            text: taskText.value,
            isCompleted: false
        };
        result = this._taskService.saveTask(newTask);
        result.subscribe(function (x) {
            _this.tasks.push(newTask);
            taskText.value = '';
        });
    };
    TasksComponent.prototype.setEditState = function (task, state) {
        if (state) {
            task.isEditMode = state;
            console.log("task edit state set to" + state);
        }
        else {
            console.log("task edit state is false");
            delete task.isEditMode;
        }
    };
    TasksComponent.prototype.updateTaskStatus = function (task) {
        var _task = {
            _id: task._id,
            text: task.text,
            isCompleted: !task.isCompleted
        };
        console.log("task updated" + task);
        this._taskService.updateTask(_task)
            .subscribe(function (data) {
            task.isCompleted = !task.isCompleted;
        });
    };
    TasksComponent.prototype.updateTaskText = function (event, task) {
        var _this = this;
        if (event.which == 13) {
            task.text = event.target.value;
            var _task = {
                _id: task._id,
                text: task.text,
                isCompleted: task.isCompleted
            };
            this._taskService.updateTask(_task)
                .subscribe(function (data) {
                _this.setEditState(task, false);
            });
        }
    };
    TasksComponent.prototype.deleteTask = function (task) {
        var tasks = this.tasks;
        console.log("delete task fn in component");
        this._taskService.deleteTask(task._id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == task._id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    };
    TasksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tasks-section',
            templateUrl: 'tasks.component.html',
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map