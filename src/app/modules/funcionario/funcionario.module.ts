import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FuncionarioRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [],
})
export class FuncionarioModule { }
