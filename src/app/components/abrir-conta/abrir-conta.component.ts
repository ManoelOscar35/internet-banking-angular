import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ListAccounts } from 'src/app/models/listAccounts';
import { RegisterAccounts } from 'src/app/models/registerAccounts';
import { ContasService } from 'src/app/services/contas.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-abrir-conta',
  templateUrl: './abrir-conta.component.html',
  styleUrls: ['./abrir-conta.component.scss']
})
export class AbrirContaComponent {


  user!: string;
  loading: boolean = false; 
  emptyResult: boolean = false;
  arrAccounts: any[] = [];
  contaEditar: boolean = false;
  unsubscribe$: Subject<any> = new Subject<any>();
  
  displayedColumns: string[] = [
    "ID",
    "email",
    "nomeCliente",
    "cpf",
    "agencia",
    "conta",
    "senha",
    "editar",
    "deletar"
  ];
  public dataSource = new MatTableDataSource<any>();

  contaForm: FormGroup = this.fb.group({
    id: [null],
    email: [null, [Validators.required, Validators.email]],
    nameClient: [null, Validators.required],
    cpf: [null, Validators.required],
    agency: [null, Validators.required],
    account: [null, Validators.required],
    password: [null, Validators.required],
  });

  @ViewChild('form') form: any;

  constructor(
    private contasService: ContasService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  save() {
    let email = this.contaForm.value.email;
    let nameClient = this.contaForm.value.nameClient;
    let cpf = this.contaForm.value.cpf;
    let agency = this.contaForm.value.agency;
    let account = this.contaForm.value.account;
    let password = this.contaForm.value.password;

    let user = this.localStorageService.getLocalStorage('user');

    const payload = {
      user: {
        title: user,
        accounts: {
          email,
          nameClient,
          cpf, 
          agency,
          account,
          password
        }
      }
      
    }

    /*
    if(this.contaEditar) {
      this.contasService.edit(payload).subscribe({
        next: (conta: Conta) =>  { 
          console.log(conta),
          this.notify("Atualizado!"),
          setTimeout(() => { window.location.reload() }, 3000)
          
        },
        error: () => this.notify("Erro ao atualizar, tente novamente!")
      });
    } else {
      this.contasService.add(payload).subscribe({
        next: (conta: Conta) => {
          console.log(conta),
          this.notify("Adicionado!"),
          setTimeout(() => { window.location.reload() }, 3000)
        },
        error: () => this.notify("Erro ao adicionar, tente novamente!")
      });
    }*/

    this.contasService.registerAccounts(payload).subscribe({
      next: (account: RegisterAccounts) => {
        console.log(account),
        this.notify("Adicionado!"),
        this.router.navigate(["pre-dashboard"])
      },
      error: () => this.notify("Erro ao adicionar, tente novamente!")
    });

    
  }

  /*

  edit(conta: Conta) {
    console.log(conta)
    this.contaEditar = true;
    this.contaForm.patchValue({
      id: conta.id,
      nomeCliente: conta.cliente.conta.nomeCliente,
      cpf: conta.cliente.conta.cpf,
      agencia: conta.cliente.conta.agencia,
      conta: conta.cliente.conta.conta,
      senha: conta.cliente.conta.senha
    })

  }

  delete(c: Conta) {
    this.contasService.delete(c.id).subscribe({
      next: () => {
        this.notify("Deletado!"),
        setTimeout(() => { window.location.reload() }, 3000)
        
      },
      error: () => this.notify("Erro ao deletar, tente novamente!") 
    })
  }*/

  notify(msg: string) {
    this.snackBar.open(msg, "OK!", {duration: 3000});
  }

  applyFilter(event: any) {
    const filterValues = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValues.trim().toLocaleLowerCase();
  }

  


}
