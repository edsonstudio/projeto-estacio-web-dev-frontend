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

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AccordionModule,
    DockModule,
    MenubarModule,
    ToastModule,
    DialogModule,
    GalleriaModule,
    TreeModule
  ],
  exports:[
    DashboardPageComponent
  ]
})
export class DashboardModule { }
