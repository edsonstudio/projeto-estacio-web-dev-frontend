import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Acao from '../models/acao.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AcaoService {
  readonly baseUrl = 'https://localhost:5001/api/v1/acao/'

  constructor(private http: HttpClient) { }

  listarAcoes(): Observable<Acao[]> {
    return this.http
      .get<Acao[]>(this.baseUrl + 'listar')
      .pipe(
        catchError(this.tratarErro)
      );
  }

  consultarAcao(id: number): Observable<Acao> {
    return this.http
      .get<Acao>(this.baseUrl + 'consultar/' + id, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  incluirAcao(acao: Acao) {
    return this.http
      .post(this.baseUrl + 'incluir/', acao, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  alterarAcao(acao: Acao) {
    return this.http
      .put(this.baseUrl + 'alterar/', acao, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  excluirAcao(Id: number) {
    return this.http
      .delete(this.baseUrl + 'excluir?Id=' + Id, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  tratarErro(error: any){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
