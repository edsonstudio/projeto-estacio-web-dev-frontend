import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Carteira from '../models/carteira.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CarteiraService {
  readonly baseUrl = 'https://localhost:5001/api/v1/carteira/'

  constructor(private http: HttpClient) { }

  listarCarteiras(): Observable<Carteira[]> {
    return this.http
      .get<Carteira[]>(this.baseUrl + 'listar')
      .pipe(
        catchError(this.tratarErro)
      );
  }

  consultarCarteira(id: number): Observable<Carteira> {
    return this.http
      .get<Carteira>(this.baseUrl + 'consultar/' + id, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  incluirCarteira(carteira: Carteira) {
    return this.http
      .post(this.baseUrl + 'incluir/', carteira, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  alterarCarteira(carteira: Carteira) {
    return this.http
      .put(this.baseUrl + 'alterar/', carteira, httpOptions)
      .pipe(
        catchError(this.tratarErro)
      );
  }

  excluirCarteira(Id: number) {
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
