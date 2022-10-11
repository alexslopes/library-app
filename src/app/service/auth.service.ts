import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiURLBase + "/api/usuarios";
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      console.log(this.jwtHelper.decodeToken(token));
      return usuario;
    }
    return null;
  }

  getAuthorities(){
    const token = this.obterToken();
    if(token){
      const authorities = this.jwtHelper.decodeToken(token).authorities;
      return authorities;
    }
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false;
  }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  tentarLogar(username: string, password: string) : Observable<any> {
    const params = new HttpParams()
                        .set('username', username)
                        .set('password', password)
                        .set('grant_type', 'password');

    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),//codifica a string
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenURL, params.toString(), { headers}); //quando o nome do valor é igual a propriedade, pode-se omitir o valor ex.(header:header} -> {header}
  }

  obterDadosdaConta() : Observable<any> {
    return this.http.get<any>(this.apiUrl + "/obter-dados-conta");
  }
}
