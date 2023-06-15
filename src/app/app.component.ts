import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/localstorage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'internet-banking';

  constructor(
    //private fb: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  /*
  form: FormGroup = this.fb.group({
    agencia: [null, [Validators.required]],
    conta: [null, [Validators.required]]
  });*/

  ngOnInit() {
      
  }

  /*submit() {
    
    this.router.navigate(["pre-dashboard"]);
  }*/

  sair() {
    this.localStorageService.removeLocalStorage('token');
    this.router.navigate(["home"]);
  }



}
