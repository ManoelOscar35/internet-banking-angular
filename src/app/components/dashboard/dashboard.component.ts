import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  valor: number = 0;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  depositar(num: string) {
    this.valor+= parseFloat(num);
  }

  sacar(num: string) {
    this.valor-= parseFloat(num);
  }


}
