import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';

import { TasksComponent }  from './components/tasks.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, TasksComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
