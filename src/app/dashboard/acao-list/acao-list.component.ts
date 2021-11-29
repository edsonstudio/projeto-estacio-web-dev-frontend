import { AcaoService } from './../../services/acao.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import Acao from 'src/app/models/acao.model';

@Component({
  selector: 'app-acao-list',
  templateUrl: './acao-list.component.html',
  styleUrls: ['./acao-list.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class AcaoListComponent implements OnInit {

  acoes: Acao[] = [];
  acao: Acao = new Acao;

  editDialog: boolean = false;

    constructor(
      private acaoService: AcaoService,
      private _cdr: ChangeDetectorRef,
      private confirmationService: ConfirmationService,
      public ref: DynamicDialogRef,
      public config: DynamicDialogConfig
      ) { }

    ngOnInit() {
      this.listarAcoes();
    }

    selectAcao(acao: Acao) {
        this.ref.close(acao);
    }

    listarAcoes() {
      this.acoes = [];

      this.acaoService.listarAcoes()
      .subscribe(
        acoes => this.acoes = acoes,
        error => console.log(error),
      );

      this.changeStatus();
    }

    editarAcao(acao: Acao) {
      this.acao = acao;
      this.editDialog = true;
    }

    salvarAcao(acao: Acao) {
      this.acaoService.alterarAcao(acao)
      .subscribe(
        error => console.log(error)
      );

      this.changeStatus();
      this.editDialog = false;
    }

    hideDialog() {
      this.editDialog = false;
    }

    excluirAcao(acao: Acao) {
      this.confirmationService.confirm({
        message: 'Você tem certeza que deseja excluir a Ação ' + acao.nome + '?',
        header: 'Confirmar exclusão',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.acaoService.excluirAcao(acao.id)
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
