import { ClienteService } from './../../services/cliente.service';
import { ClienteListaComponent } from './../cliente-lista/cliente-lista.component';
import { AcaoListComponent } from './../acao-list/acao-list.component';
import { AcaoService } from './../../services/acao.service';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import Acao from 'src/app/models/acao.model';
import Cliente from 'src/app/models/cliente.model';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [DialogService]
})
export class DashboardPageComponent implements OnInit {
  loader:boolean = false;

  dockItems: MenuItem[] = [];
  menubarItems: any[] = [];
  acoes: Acao[] = [];

  nomeCliente: string = "";
  saldo: number = 0;

  nome: string = "";
  cotacao: number = 0;
  descricao: string = "";
  variacao: number = 0;

  incluirAcao: boolean = false;
  incluirCliente: boolean = false;

  displayPosition: boolean = false;
  displayModal: boolean = false;
  position: string = "";

  constructor(
    private acaoService: AcaoService,
    private clienteService: ClienteService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private _cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    this.listarAcoes();

    this.primengConfig.ripple = true;

    this.dockItems = [
      {
        label: 'Finder',
        tooltipOptions: {
          tooltipLabel: "Finder",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/finder.svg",
        command: () => {
          this.showPositionDialog('left');
          //this.displayFinder = true;
        }
      },
      {
        label: 'Terminal',
        tooltipOptions: {
          tooltipLabel: "Terminal",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/terminal.svg",
        command: () => {
          //this.displayTerminal = true;
        }
      },
      {
        label: 'App Store',
        tooltipOptions: {
          tooltipLabel: "App Store",
          tooltipPosition: 'top',
          positionLeft: 15,
          positionTop: -15
        },
        icon: "assets/showcase/images/dock/appstore.svg",
        command: () => {
          //this.messageService.add({severity: 'error', summary: 'An unexpected error occurred while signing in.', detail: 'UNTRUSTED_CERT_TITLE'});
        }
      },
      {
        label: 'Safari',
        tooltipOptions: {
          tooltipLabel: "Safari",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/safari.svg",
        command: () => {
          //this.messageService.add({severity: 'warn', summary: 'Safari has stopped working'});
        }
      },
      {
        label: 'Photos',
        tooltipOptions: {
          tooltipLabel: "Photos",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/photos.svg",
        command: () => {
          //this.displayGalleria = true
        }
      },
      {
        label: 'GitHub',
        icon: "assets/showcase/images/dock/github.svg",
      },
      {
        label: 'Trash',
        icon: "assets/showcase/images/dock/trash.png",
        command: () => {
          //this.messageService.add({severity: 'info', summary: 'Empty Trash'});
        }
      }
    ];

    this.menubarItems = [
      {
        label: 'Home',
        className: 'menubar-root',
        command: () => {

        },
      },
      {
        label: 'Ações',
        items: [
          {
            label: 'Nova',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.incluirAcaoModal('left');
            },
          },
          {
            label: 'Listar',
            icon: 'pi pi-fw pi-bars',
            command: () => {
              this.listaAcoes();
            },
          }
        ]
      },
      {
        label: 'Clientes',
        items: [
          {
            label: 'Novo',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.incluirClienteModal('left');
            },
          },
          {
            label: 'Listar',
            icon: 'pi pi-fw pi-bars',
            command: () => {
              this.listaClientes();
            },
          }
        ]
      },
      {
        label: 'Carteiras',
        items: [
          {
            label: 'Nova',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.incluirAcaoModal('left');
            },
          },
          {
            label: 'Listar',
            icon: 'pi pi-fw pi-bars',
            command: () => {
              this.listaAcoes();
            },
          }
        ]
      }
    ];

  }

  listarAcoes() {
    this.acoes = [];

    this.loader = true;

    this.acaoService.listarAcoes()
    .subscribe(
      acoes => this.acoes = acoes,
      error => console.log(error),
    );

    this.loader = false;
    this.changeStatus();
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

  incluirAcaoModal(position: string) {
    this.position = position;
    this.incluirAcao = true;
  }

  incluirClienteModal(position: string) {
    this.position = position;
    this.incluirCliente = true;
  }

  salvarAcao() {
    this.loader = true;
    let acao = new Acao;
    acao.nome = this.nome;
    acao.cotacao = this.cotacao;
    acao.descricao = this.descricao;
    acao.variacao = this.variacao;

    this.acaoService.incluirAcao(acao)
      .subscribe(
        error => console.log(error)
      );

    this.listarAcoes();
    this.changeStatus();
    this.loader = false;

    this.incluirAcao = false;
  }

  salvarCliente() {
    this.loader = true;
    let cliente = new Cliente;
    cliente.nome = this.nomeCliente;
    cliente.saldo = this.saldo;

    this.clienteService.incluirCliente(cliente)
      .subscribe(
        error => console.log(error)
      );

    this.changeStatus();
    this.loader = false;

    this.incluirCliente = false;
  }

  listaAcoes() {
    const ref = this.dialogService.open(AcaoListComponent, {
        header: 'Lista de Ações',
        width: '80%'
    });
  }

  listaClientes() {
    const ref = this.dialogService.open(ClienteListaComponent, {
        header: 'Lista de Clientes',
        width: '80%'
    });
  }

  changeStatus(): void {
    this._cdr.detectChanges();
  }
}
