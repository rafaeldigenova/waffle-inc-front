import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, filter, retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('input') input: ElementRef;

  public email: string = '';
  public senha: string = '';
  public loadingLogin = false;

  constructor(private toastr: ToastrService,
    private repository: RepositoryService,
    private router: Router) { }

  login() {
    this.loadingLogin = true;
    var result = this.repository.login(this.email, this.senha)
      .pipe(
        retry(1)
      )
      .subscribe(
        data => {
          sessionStorage.setItem('accessToken', data.accessToken);
          sessionStorage.setItem('ROLE', data.role);
          if (data.role === "Admin") {
            this.abrirAdmin();
          } else {
            this.abrirFuncionario();
          }
        },
        error => {
          this.toastr.error("Erro ao tentar logar. Por favor, revise a senha informada e tente novamente.");
          this.loadingLogin = false;
        }
      );
  }

  abrirAdmin() {
    this.router.navigate(['/admin/funcionarios']);
  }

  abrirFuncionario() {
    this.router.navigate(['/funcionario']);
  }
}
