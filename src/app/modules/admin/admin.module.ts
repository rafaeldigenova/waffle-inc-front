import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from './services/admin.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    DashboardComponent,
    FuncionariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AdminService
  ],
})
export class AdminModule { }
