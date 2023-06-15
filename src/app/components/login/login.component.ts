import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginUser } from 'src/app/models/loginUser';
import { ContasService } from 'src/app/services/contas.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private contasService: ContasService,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar,
    private router: Router
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

  createPayload(
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

  login() {
    if(this.isValidForm()) {
      const { email } = this.createPayload();
      this.contasService.loginUser(this.createPayload())
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res: LoginUser) => {
          const {token} = res
          this.notify(res.message),
          this.localStorageService.setLocalStorage('token', JSON.stringify(token))
          this.localStorageService.setLocalStorage('user', JSON.stringify(email))
          this.router.navigate(["pre-dashboard"])
        },
        error: (err: any) => {
          this.router.navigate(["home"]);
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
