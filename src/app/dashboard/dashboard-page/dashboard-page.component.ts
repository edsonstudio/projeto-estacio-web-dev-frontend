import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { AcaoListComponent } from './../acao-list/acao-list.component';
import { CarteiraListaComponent } from './../carteira-lista/carteira-lista.component';
import { ClienteListaComponent } from './../cliente-lista/cliente-lista.component';

import { AcaoService } from './../../services/acao.service';
import { CarteiraService } from './../../services/carteira.service';
import { ClienteService } from './../../services/cliente.service';

import Acao from 'src/app/models/acao.model';
import Carteira from 'src/app/models/carteira.model';
import Cliente from 'src/app/models/cliente.model';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers: [DialogService]
})
export class DashboardPageComponent implements OnInit {

  responsiveOptions: any;
  options: any;

  data: any;

  loader:boolean = false;

  dockItems: MenuItem[] = [];
  menubarItems: any[] = [];

  acoes: Acao[] = [];
  acaoSelecionada: Acao = new Acao;
  acoesNomes: string[] = [];
  acoesCotacoes: number[] = [];

  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente;
  clienteSelecionado: Cliente = new Cliente;

  carteiras: Carteira[] = [];
  carteira: Carteira = new Carteira;

  quantidade: number = 0;
  idCliente: number = 0;
  idAcao: number = 0;
  nomeAcao: string = '';

  nomeCliente: string = "";
  saldo: number = 0;

  nome: string = "";
  cotacao: number = 0;
  descricao: string = "";
  variacao: number = 0;

  incluirAcao: boolean = false;
  incluirCliente: boolean = false;
  incluirCarteira: boolean = false;

  displayPosition: boolean = false;
  displayModal: boolean = false;
  position: string = "";

  constructor(
    private acaoService: AcaoService,
    private clienteService: ClienteService,
    private carteiraService: CarteiraService,
    private primengConfig: PrimeNGConfig,
    public dialogService: DialogService,
    private _cdr: ChangeDetectorRef
    )
    {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
      ];

      this.options = {
        //display labels on data elements in graph
        plugins: {
          datalabels: {
            align: 'end',
            anchor: 'end',
            borderRadius: 4,
            backgroundColor: 'teal',
            color: '#FFFFFF',
            font: {
              weight: 'bold',
            },
          },
          // display chart title
          title: {
            display: true,
            text: 'Cotações das Ações',
            color: 'white',
            font: {
              weight: 'bold',
              size: 20,
            },
          },
          legend: {
            position: 'right',
            labels: {
              color: 'white',
              font: {
                weight: 'bold',
                size: 14,
              },
            }
          }
        }
      };
  }

  ngOnInit(): void {

    this.listarClientes();
    this.listarAcoes();
    this.listarCarteiras();

    this.primengConfig.ripple = true;

    this.dockItems = [
      {
        label: 'Finder',
        tooltipOptions: {
          tooltipLabel: "Gráfico das Cotações",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/finder.svg",
        command: () => {
          this.graficoPizza();
        }
      },
      {
        label: 'Terminal',
        tooltipOptions: {
          tooltipLabel: "Gráfico das Cotações",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/terminal.svg",
        command: () => {
          this.graficoPizza();
        }
      },
      {
        label: 'App Store',
        tooltipOptions: {
          tooltipLabel: "Gráfico das Cotações",
          tooltipPosition: 'top',
          positionLeft: 15,
          positionTop: -15
        },
        icon: "assets/showcase/images/dock/appstore.svg",
        command: () => {
          this.graficoPizza();
        }
      },
      {
        label: 'Safari',
        tooltipOptions: {
          tooltipLabel: "Gráfico das Cotações",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/safari.svg",
        command: () => {
          this.graficoPizza();
        }
      },
      {
        label: 'Photos',
        tooltipOptions: {
          tooltipLabel: "Meu Portifólio",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/photos.svg",
        command: () => {
          window.open("https://www.edson.studio/", "_blank");
        }
      },
      {
        label: 'GitHub',
        tooltipOptions: {
          tooltipLabel: "Meu Github",
          tooltipPosition: 'top',
          positionTop: -15,
          positionLeft: 15
        },
        icon: "assets/showcase/images/dock/github.svg",
        command: () => {
          window.open("https://github.com/edsonstudio", "_blank");
        }
      },
      {
        label: 'Trash',
        icon: "assets/showcase/images/dock/trash.png",
        command: () => {
          this.graficoPizza();
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
              this.incluirCarteiraModal('left');
            },
          },
          {
            label: 'Listar',
            icon: 'pi pi-fw pi-bars',
            command: () => {
              this.listaCarteiras();
            },
          }
        ]
      }
    ];

  }

  listarAcoes() {
    this.acoes = [];

    this.acaoService.listarAcoes()
    .subscribe(
      acoes => this.acoes = acoes,
      error => console.log(error),
    );

    this.loader = false;
    this.changeStatus();
  }

  listarClientes() {
    this.clientes = [];

    this.clienteService.listarClientes()
    .subscribe(
      clientes => this.clientes = clientes,
      error => console.log(error),
    );

    this.changeStatus();
  }

  listarCarteiras() {
    this.carteiras = [];

    this.carteiraService.listarCarteiras()
    .subscribe(
      carteiras => this.carteiras = carteiras,
      error => console.log(error),
    );

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

  incluirCarteiraModal(position: string) {
    this.position = position;
    this.incluirCarteira = true;
  }

  salvarAcao() {
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
    let cliente = new Cliente;
    cliente.nome = this.nomeCliente;
    cliente.saldo = this.saldo;

    this.clienteService.incluirCliente(cliente)
      .subscribe(
        error => console.log(error)
      );

      this.loader = false;

      this.incluirCliente = false;
      cliente = new Cliente;
      this.changeStatus();
  }

  salvarCarteira() {
    let carteira = new Carteira;
    carteira.idAcao = this.acaoSelecionada.id;
    carteira.idCliente = this.clienteSelecionado.id;
    carteira.quantidade = this.quantidade;

    if(this.clienteSelecionado.saldo >= (this.acaoSelecionada.cotacao * this.quantidade)) {

      this.carteiraService.incluirCarteira(carteira)
      .subscribe(
        error => console.log(error)
      );

      let cliente = new Cliente;
      cliente = this.clienteSelecionado;
      cliente.saldo -= (this.acaoSelecionada.cotacao * this.quantidade);

      this.clienteService.alterarCliente(cliente)
      .subscribe(
        error => console.log(error)
      );

      this.loader = false;

      this.incluirCarteira = false;
      carteira = new Carteira;
      this.changeStatus();

    }else {
      console.log("Saldo insuficiente para este investimento!!!");
    }
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

  listaCarteiras() {
    const ref = this.dialogService.open(CarteiraListaComponent, {
        header: 'Lista de Carteiras',
        width: '80%'
    });
  }

  changeStatus(): void {
    this._cdr.detectChanges();
  }

  graficoPizza() {
    this.data = [];
    this.acoesNomes = [];
    this.acoesCotacoes = [];

    this.acoes.forEach(acao => {
      this.acoesNomes.push(acao.nome);
      this.acoesCotacoes.push(acao.cotacao);
    });

    this.data = {
      labels: this.acoesNomes,
      fontColor: "white",
      datasets: [
          {
              data: this.acoesCotacoes,
              backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726",
                "#f95959",
                "#9896f1",
                "#a7bcb9",
                "#2772db",
                "#f8da5b",
                "#bbe9db",
                "#f6378f",
                "#ffdd00",
                "#e70000",
                "#10316b",
                "#3b0944"
              ],
              hoverBackgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726",
                "#f95959",
                "#9896f1",
                "#a7bcb9",
                "#2772db",
                "#f8da5b",
                "#bbe9db",
                "#f6378f",
                "#ffdd00",
                "#e70000",
                "#10316b",
                "#3b0944"
              ]
          }
      ]
    };
    this.changeStatus();
  }
}
