import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService
    .tentarLogar(this.username, this.password)
    .subscribe(response =>
      {const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);//variável global
        this.router.navigate(['/home'])
    }
      , errorResponse => {
        this.errors = ['Usuário e/ou senha incorreto(s).']
      })
  }

  preparaCadastrar(event){
    event.preventDefault(event);//Evita que saia da página
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.login = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario).subscribe( response => {
      this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
      this.cadastrando = false;
      this.username = '';
      this.password = '';
      this.errors = [];
    }, errorResponse => {
      this.mensagemSucesso = null;
      this.errors = errorResponse.error.errors;
    })
  }

}
