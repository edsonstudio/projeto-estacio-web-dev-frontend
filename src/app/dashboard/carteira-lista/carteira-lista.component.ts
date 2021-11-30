import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { AcaoService } from './../../services/acao.service';
import { ClienteService } from './../../services/cliente.service';
import { CarteiraService } from './../../services/carteira.service';

import Acao from 'src/app/models/acao.model';
import Cliente from 'src/app/models/cliente.model';
import Carteira from 'src/app/models/carteira.model';

import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-carteira-lista',
  templateUrl: './carteira-lista.component.html',
  styleUrls: ['./carteira-lista.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class CarteiraListaComponent implements OnInit {

  acoes: Acao[] = [];
  acao: Acao = new Acao;

  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente;

  carteiras: Carteira[] = [];
  carteira: Carteira = new Carteira;

  editDialog: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private carteiraService: CarteiraService,
    private acaoService: AcaoService,
    private _cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.listarClientes();
    this.listarAcoes();
    this.listarCarteiras();
  }

  listarAcoes() {
    this.acoes = [];

    this.acaoService.listarAcoes()
    .subscribe(
      acoes => this.acoes = acoes,
      error => console.log(error),
    );

    console.log("this.acoes: ", this.acoes);

    this.changeStatus();
  }

  listarClientes() {
    this.clientes = [];

    this.clienteService.listarClientes()
    .subscribe(
      clientes => this.clientes = clientes,
      error => console.log(error),
    );

    console.log("this.clientes: ", this.clientes);

    this.changeStatus();
  }

  listarCarteiras() {
    this.carteiras = [];

    this.carteiraService.listarCarteiras()
    .subscribe(
      carteiras => this.carteiras = carteiras,
      error => console.log(error),
    );

    console.log("this.carteiras: ", this.carteiras);

    this.changeStatus();
  }

  changeStatus(): void {
    this._cdr.detectChanges();
  }

  editarCarteira(carteira: Carteira) {
    this.carteira = carteira;
    this.editDialog = true;
  }

  salvarCarteira(carteira: Carteira) {
    this.carteiraService.alterarCarteira(carteira)
    .subscribe(
      error => console.log(error)
    );

    this.changeStatus();
    this.editDialog = false;
  }

  hideDialog() {
    this.editDialog = false;
  }

  excluirCarteira(carteira: Carteira) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir o Carteira ?',
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.carteiraService.excluirCarteira(carteira.id)
        .subscribe(
          error => console.log(error)
        );

        this.changeStatus();
      }
  });
  }
}
