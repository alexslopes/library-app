import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Usuario } from 'src/app/login/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  authorities: string[];
  usuarioLogado: Usuario;

  constructor(
    private autService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authorities = this.autService.getAuthorities();
    this.obterDadosdoUsuario()
  }

  logout() {
    this.autService.encerrarSessao();
    this.router.navigate(['/login'])
  }

  obterDadosdoUsuario() {
    this.autService.obterDadosdaConta().subscribe(
      response => {
        this.usuarioLogado = response;
      }
    );
  }

}
