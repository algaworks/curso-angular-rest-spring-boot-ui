import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCadastroComponent } from './pessoa-cadastro.component';

describe('PessoaCadastroComponent', () => {
  let component: PessoaCadastroComponent;
  let fixture: ComponentFixture<PessoaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
