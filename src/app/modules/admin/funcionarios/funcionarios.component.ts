import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit{

  funcionarios: [];
  carregandoFuncionarios = true;
  funcionario: any = null;
  salvando = false;

  constructor(private toastr: ToastrService,
    private adminService: AdminService) { }


  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.carregandoFuncionarios = true;
    this.adminService.obterFuncionarios()
    .subscribe(
      (respostaFuncionarios) => {
        if (!respostaFuncionarios.executadoComSucesso) {
          this.carregandoFuncionarios = false;
          this.toastr.error(respostaFuncionarios.message);
        } else {
          this.funcionarios = respostaFuncionarios.corpoDaResposta
          this.carregandoFuncionarios = false;
        }
      },
      (err) => {
        this.carregandoFuncionarios = false;
        this.toastr.error('Erro ao tentar carregar os funcionários');
      }
    );
  }

  adicionarFuncionario() {
    this.funcionario = {};
  }

  edit (funcionario: any) {
    this.funcionario = funcionario;
    this.funcionario.senha = '';
  }

  delete (funcionario: any) {
    funcionario.deletando = true;
    this.adminService.deletarFuncionario(funcionario)
      .subscribe(
        (result) => { this.carregarFuncionarios(); },
        (err) => {
          this.toastr.error('Erro ao tentar deletar o funcionário.');
          funcionario.deletando = false;}
      );
  }

  adicionarTelefone () {
    if (!this.funcionario.telefones) {
      this.funcionario.telefones = [];
    }
    this.funcionario.telefones.push({
      codigoDeArea: '',
      numero: '',
    })
  }

  salvar() {
    this.salvando = true;
    if (this.funcionario.liderId) {
      this.funcionario.liderId = parseInt(this.funcionario.liderId, 10);
    }


    if (this.funcionario.id) {
      this.adminService.atualizarFuncionario(this.funcionario)
        .subscribe(
          (respostaAtualizacao) => {
            if (!respostaAtualizacao.executadoComSucesso) {
              this.salvando = false;
              this.toastr.error(respostaAtualizacao.message);
            } else {
              this.funcionario = null;
              this.salvando = false;
              this.toastr.success('Funcionário atualizado!');
            }
          },
          (err) => {
            this.salvando = false;
            var msg = 'Erro ao tentar atualizar o funcionário:';
            Object.entries(err.error.errors).forEach(([key, value]) => {
              msg += ` ${value[0]}`;
            });
            this.toastr.error(msg);
          }
        );
    } else {
      this.adminService.cadastrarFuncionario(this.funcionario)
        .subscribe(
          (respostaAtualizacao) => {
            if (!respostaAtualizacao.executadoComSucesso) {
              this.salvando = false;
              this.toastr.error(respostaAtualizacao.message);
            } else {
              this.funcionario = null;
              this.salvando = false;
              this.toastr.success('Funcionário Cadastrado!');
            }
          },
          (err) => {
            this.salvando = false;
            var msg = 'Erro ao tentar cadastrar o funcionário:';
            Object.entries(err.error.errors).forEach(([key, value]) => {
              msg += ` ${value[0]}`;
            });
            this.toastr.error(msg);
          }
        );
    }
  }
}
