import { Injectable } from '@angular/core';
import { RegisterAccounts } from '../models/registerAccounts';
import { BehaviorSubject, Observable, catchError, delay, first, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../models/registerUser';
import { environment } from 'src/environments/environments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginUser } from '../models/loginUser';
import { ListAccounts } from '../models/listAccounts';
import { RegisterAccountDetails } from '../models/accountDetails';
import { ListAccountDetails } from '../models/listAccountDetails';
import { RegisterSacarConta } from '../models/sacarConta';
import { ListSacarConta } from '../models/listSacarConta';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  notify(msg: string) {
    this.snackBar.open(msg, "OK!", {duration: 3000});
  }

  registerUser(user: any): Observable<RegisterUser> {
    

    return this.http.post<RegisterUser>(`${environment.BASE_URL}/auth/register/user`, user)
    .pipe(
      catchError((err) => {
        if(err.status === 0 && err.status !== 404) {
          this.notify('Ocorreu um erro na aplicação, tente novamente!');
        } else if(err.status === 404) {
          this.notify(err.error.message);
        } else {
          this.notify('Ocorreu um erro no servidor, tente mais tarde!');
        }

        return throwError(() => err)
      })
    )
  }

  loginUser(user: any): Observable<LoginUser> {
    
    return this.http.post<LoginUser>(`${environment.BASE_URL}/auth/login`, user)
    .pipe(
      catchError((err) => {
        if(err.status === 0 && err.status !== 404) {
          this.notify('Ocorreu um erro na aplicação, tente novamente!');
        } else if(err.status === 404) {
          this.notify(err.error.message);
        } else {
          this.notify('Ocorreu um erro no servidor, tente mais tarde!');
        }

        return throwError(() => err)
      })
    )
  }

  registerAccounts(account: any): Observable<RegisterAccounts> {
    return this.http.post<RegisterAccounts>(`${environment.BASE_URL}/auth/accounts`, account)
      .pipe(
        catchError((err) => {
          return throwError(() => err)
        })
      )
  }

  getRegisterAccounts(user: any): Observable<ListAccounts> {
    let headers = new HttpHeaders();
    headers = headers.set('user', user);
    
    return this.http.get<ListAccounts>(`${environment.BASE_URL}/list/accounts`, {headers})
      .pipe(
        first(),
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.notify('Ocorreu um erro na aplicação, tente novamente!');
          } else if(err.status === 404) {
            this.notify(err.error.message);
          } else {
            this.notify('Ocorreu um erro no servidor, tente mais tarde!');
          }

          return throwError(() => err)
        })
      )
  }

  
  registerAccountDetails(accountDetails: any): Observable<RegisterAccountDetails> {
    //let headers = new HttpHeaders();
    //headers = headers.set('accountDetails', accountDetails);
    return this.http.post<RegisterAccountDetails>(`${environment.BASE_URL}/register/account/details`, accountDetails)
      .pipe(
        catchError((err) => {
          return throwError(() => err)
        })
      )
  }

  getRegisterAccountDetails(user: any): Observable<ListAccountDetails> {
    let headers = new HttpHeaders();
    headers = headers.set('user', user);
    
    return this.http.get<ListAccountDetails>(`${environment.BASE_URL}/list/account/details`, {headers})
      .pipe(
        first(),
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.notify('Ocorreu um erro na aplicação, tente novamente!');
          } else if(err.status === 404) {
            this.notify(err.error.message);
          } else {
            this.notify('Ocorreu um erro no servidor, tente mais tarde!');
          }

          return throwError(() => err)
        })
      )
  }
  
  registerSacarConta(sacarConta: any): Observable<RegisterSacarConta> {
    //let headers = new HttpHeaders();
    //headers = headers.set('accountDetails', accountDetails);
    return this.http.post<RegisterSacarConta>(`${environment.BASE_URL}/register/sacar/conta`, sacarConta)
      .pipe(
        catchError((err) => {
          return throwError(() => err)
        })
      )
  }

  getRegisterSacarConta(user: any): Observable<ListSacarConta> {
    let headers = new HttpHeaders();
    headers = headers.set('user', user);
    
    return this.http.get<ListSacarConta>(`${environment.BASE_URL}/list/sacar/conta`, {headers})
      .pipe(
        first(),
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.notify('Ocorreu um erro na aplicação, tente novamente!');
          } else if(err.status === 404) {
            this.notify(err.error.message);
          } else {
            this.notify('Ocorreu um erro no servidor, tente mais tarde!');
          }

          return throwError(() => err)
        })
      )
  }

  getUser(id: string): Observable<any> {
    
    return this.http.get<any>(`${environment.BASE_URL}/user/${id}`)
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.notify('Ocorreu um erro na aplicação, tente novamente!');
          } else if(err.status === 404) {
            this.notify(err.error.message);
          } else {
            this.notify('Ocorreu um erro no servidor, tente mais tarde!');
          }

          return throwError(() => err)
        })
      )
  }

  /*
  deleteRevenues(id: string): Observable<DeleteRevenues> {
    
    return this.httpClient.delete<DeleteRevenues>(`${environment.BASE_URL}/delete/revenue/${id}`)
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!');
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message);
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!');
          }

          return throwError(() => err)
        })
      )
  }

  updateRevenues(id: string, payload: any): Observable<UpdateRevenues> {
    return this.httpClient.put<UpdateRevenues>(`${environment.BASE_URL}/update/revenues/${id}`, payload)
      .pipe(
        catchError((err) => {
          if(err.status === 0 && err.status !== 404) {
            this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente!');
          } else if(err.status === 404) {
            this.utilsService.showError(err.error.message);
          } else {
            this.utilsService.showError('Ocorreu um erro no servidor, tente mais tarde!');
          }

          return throwError(() => err)
        })
      )
  }*/

  
}
