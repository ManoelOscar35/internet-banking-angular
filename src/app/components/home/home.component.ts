import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RegisterUser } from 'src/app/models/registerUser';
import { ContasService } from 'src/app/services/contas.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  form!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private contasService: ContasService,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  createFormPayload(
    email = this.getValueControl(this.form, 'email'),
    password = this.getValueControl(this.form, 'password')
  ) {

    const payload = {
      email,
      password
    }

    return payload;
  }

  getValueControl(form: FormGroup, control: string) {
    return form.controls[control].value;
  }

  submit() {
    if(this.isValidForm()) {
      this.contasService.registerUser(this.createFormPayload())
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res: RegisterUser) => {
          this.notify(res.message),
          this.localStorageService.setLocalStorage('userInfo', JSON.stringify(res.user)),
          this.refreshPage()
        }
      }
        
      )
    }
  }

  isValidForm(): boolean {
    return this.form.valid;
  }

  refreshPage() {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK!", {duration: 3000});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  
}
