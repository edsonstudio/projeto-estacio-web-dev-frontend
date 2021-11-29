import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DockModule} from 'primeng/dock';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {GalleriaModule} from 'primeng/galleria';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    DockModule,
    MenubarModule,
    ToastModule,
    DialogModule,
    GalleriaModule
  ],
  exports: [SpinnerComponent]
})
export class SharedModule { }
