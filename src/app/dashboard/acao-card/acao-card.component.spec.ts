import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoCardComponent } from './acao-card.component';

describe('AcaoCardComponent', () => {
  let component: AcaoCardComponent;
  let fixture: ComponentFixture<AcaoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
