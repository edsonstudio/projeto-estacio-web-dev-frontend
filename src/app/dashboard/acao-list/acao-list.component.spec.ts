import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoListComponent } from './acao-list.component';

describe('AcaoListComponent', () => {
  let component: AcaoListComponent;
  let fixture: ComponentFixture<AcaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
