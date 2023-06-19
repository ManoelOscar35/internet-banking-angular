import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ListAccounts } from 'src/app/models/listAccounts';
import { ContasService } from 'src/app/services/contas.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-pre-dashboard',
  templateUrl: './pre-dashboard.component.html',
  styleUrls: ['./pre-dashboard.component.scss']
})
export class PreDashboardComponent {
  
  unsubscribe$: Subject<any> = new Subject<any>();
  contas: any[] = [];
  senhaConta!: string;

  constructor(
    private contasService: ContasService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  form: FormGroup = this.fb.group({
    conta: [null, [Validators.required]]
  });

  
  ngOnInit() {
    this.getUser();
    this.getRegisterAccounts();
  }

  getUser() {
    const { _id } = this.localStorageService.getLocalStorage('userInfo');
    //console.log(_id)
    this.contasService.getUser(_id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          console.log(res)
        }
      });
  }

  getRegisterAccounts() {
    let user = this.localStorageService.getLocalStorage('user');
    this.contasService.getRegisterAccounts(user)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe({
        next: (contas: ListAccounts) => {
          contas.result.forEach((el) => {
            this.contas.push(el);
          })
        }
      });
  }

  getValueConta(): any {
    for(let i = 0; i < this.contas.length; i++) {
      let conta = this.form.value.conta;
      if(conta == this.contas[i].user.accounts.account) {
        return conta
      } 
      
    }
  }

  submit() {
    if(this.getValueConta() != null) {
      this.router.navigateByUrl("/dashboard");
    }

  }

  ngOnDestroy() {
    this.unsubscribe$.next([]);
    this.unsubscribe$.unsubscribe();
  }
}
