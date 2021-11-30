import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Cliente from '../models/cliente.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  readonly baseUrl = 'https://localhost:5001/api/v1/cliente/'

  constructor(private http: HttpClient) { }

  listarAcoes(): Observable<Cliente[]> {
    return this.http
      .get<Cliente[]>(this.baseUrl + 'listar')
      .pipe(
        catchError(this.tratarErro)
      );
  }

  consultarCliente(id: number): Observable<Cliente> {
    return this.http
      .get<Cliente>(this.baseUrl + 'consultar/' + id, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  incluirCliente(cliente: Cliente) {
    return this.http
      .post(this.baseUrl + 'incluir/', cliente, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  alterarCliente(cliente: Cliente) {
    return this.http
      .put(this.baseUrl + 'alterar/', cliente, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  excluirCliente(Id: number) {
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
