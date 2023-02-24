import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Usuario } from 'src/app/login/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  authorities: string[];
  usuarioLogado: Usuario;
  dadosUsuario?: Subscription;

  constructor(
    private autService: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    if(this.dadosUsuario){
      this.dadosUsuario.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.authorities = this.autService.getAuthorities();
    this.obterDadosdoUsuario()
  }

  logout() {
    this.autService.encerrarSessao();
    this.router.navigate(['/login'])
  }

  obterDadosdoUsuario() {
    this.dadosUsuario = this.autService.obterDadosdaConta().subscribe(
      response => {
        this.usuarioLogado = response;
      }
    );
  }

}
