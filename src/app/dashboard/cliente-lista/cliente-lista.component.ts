import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import Cliente from 'src/app/models/cliente.model';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class ClienteListaComponent implements OnInit {

  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente;

  editDialog: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private _cdr: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
    ) { }

  ngOnInit() {
    this.listarAcoes();
  }

  selectCliente(cliente: Cliente) {
      this.ref.close(cliente);
  }

  listarAcoes() {
    this.clientes = [];

    this.clienteService.listarAcoes()
    .subscribe(
      clientes => this.clientes = clientes,
      error => console.log(error),
    );

    this.changeStatus();
  }

  editarCliente(cliente: Cliente) {
    this.cliente = cliente;
    this.editDialog = true;
  }

  salvarCliente(cliente: Cliente) {
    this.clienteService.alterarCliente(cliente)
    .subscribe(
      error => console.log(error)
    );

    this.changeStatus();
    this.editDialog = false;
  }

  hideDialog() {
    this.editDialog = false;
  }

  excluirCliente(cliente: Cliente) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir o Cliente ' + cliente.nome + '?',
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.excluirCliente(cliente.id)
        .subscribe(
          error => console.log(error)
        );

        this.changeStatus();
      }
  });
  }

  changeStatus(): void {
    this._cdr.detectChanges();
  }

}
