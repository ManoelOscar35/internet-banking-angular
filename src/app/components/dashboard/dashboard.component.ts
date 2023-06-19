import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { RegisterAccountDetails } from 'src/app/models/accountDetails';
import { ListAccountDetails } from 'src/app/models/listAccountDetails';
import { ListSacarConta } from 'src/app/models/listSacarConta';
import { RegisterSacarConta } from 'src/app/models/sacarConta';
import { ContasService } from 'src/app/services/contas.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  date: any = new Date();
  now: any = new Date;
  horas: any = `${this.now.getHours()}:${this.now.getMinutes()}:${this.now.getSeconds()}`;
  valor!: number;
  deposito: number = 0;
  numDeposito: number = 0;
  numSaque: number = 0;
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private snackBar: MatSnackBar,
    private contasService: ContasService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder
  ) { }

  depositoForm: FormGroup = this.fb.group({
    deposito: [null, Validators.required]
  });

  saqueForm: FormGroup = this.fb.group({
    saque: [null, Validators.required]
  });

  ngOnInit() {
    let user = this.localStorageService.getLocalStorage('user');
    this.contasService.getRegisterAccountDetails(user)
      .subscribe({
        next: (valor: ListAccountDetails) => {
          valor.result.forEach((el: any) => {
            this.deposito+= parseFloat(el.user.accountDetails.deposito);
            this.valor = this.deposito;
            this.numDeposito++;
          })
        },
        error: (err: any) => {
          console.error(err)
        }     
      });


    this.contasService.getRegisterSacarConta(user)
      .subscribe({
        next: (valor: ListSacarConta) => {
          valor.result.forEach((el: any) => {
            this.deposito-= parseFloat(el.user.accountDetails.sacar);
            this.valor = this.deposito;
            this.numSaque++;
          })
        },
        error: (err: any) => {
          console.error(err)
        }     
      });
    
  }

  
  detalhesDaConta() {
    let deposito = this.depositoForm.value.deposito;
    let user = this.localStorageService.getLocalStorage('user');
    const payload = {
      user: {
        title: user,
        accountDetails: {
          deposito
        }
      }
    }
    this.contasService.registerAccountDetails(payload).subscribe({
      next: (account: RegisterAccountDetails) => {
        this.notify("Adicionado!")
      },
      error: () => this.notify("Erro ao adicionar, tente novamente!")
    });
  }

  sacarConta() {
    let sacar = this.saqueForm.value.saque;
    let user = this.localStorageService.getLocalStorage('user');
    const payload = {
      user: {
        title: user,
        accountDetails: {
          sacar
        }
      }
    }
    this.contasService.registerSacarConta(payload).subscribe({
      next: (sacarConta: RegisterSacarConta) => {
        this.notify("Adicionado!")
      },
      error: () => this.notify("Erro ao adicionar, tente novamente!")
    });
  }


  notify(msg: string) {
    this.snackBar.open(msg, "OK!", {duration: 3000});
  }



}
