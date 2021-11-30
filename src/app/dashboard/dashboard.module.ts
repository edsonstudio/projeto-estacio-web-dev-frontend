import { SharedModule } from './../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import {AccordionModule} from 'primeng/accordion';
import {DockModule} from 'primeng/dock';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {GalleriaModule} from 'primeng/galleria';
import {TreeModule} from 'primeng/tree';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';

import { AcaoCardComponent } from './acao-card/acao-card.component';
import { AcaoListComponent } from './acao-list/acao-list.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { CarteiraListaComponent } from './carteira-lista/carteira-lista.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    AcaoCardComponent,
    AcaoListComponent,
    ClienteListaComponent,
    CarteiraListaComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AccordionModule,
    DockModule,
    MenubarModule,
    ToastModule,
    DialogModule,
    GalleriaModule,
    TreeModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    InputNumberModule,
    FormsModule,
    TableModule,
    InputTextareaModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    DropdownModule
  ],
  exports:[
    DashboardPageComponent,
    AcaoCardComponent,
    AcaoListComponent,
    ClienteListaComponent,
    CarteiraListaComponent
  ]
})
export class DashboardModule { }
