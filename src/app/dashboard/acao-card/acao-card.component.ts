import { Component, Input, OnInit } from '@angular/core';
import Acao from 'src/app/models/acao.model';

@Component({
  selector: 'app-acao-card',
  templateUrl: './acao-card.component.html',
  styleUrls: ['./acao-card.component.scss']
})
export class AcaoCardComponent implements OnInit {

  @Input()
  acao = new Acao();

  constructor() { }

  ngOnInit(): void {
  }

  get variation() {
    const localizedVariationString = this.acao.variacao.toLocaleString();
    const prefix = this.acao.variacao > 0 ? '+' : this.acao.variacao < 0 ? '-' : '';
    return `${prefix} ${localizedVariationString.replace('-', '')}%`;
  }

}
