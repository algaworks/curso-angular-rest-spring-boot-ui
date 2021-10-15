import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato.component';

describe('PessoaCadastroContatoComponent', () => {
  let component: PessoaCadastroContatoComponent;
  let fixture: ComponentFixture<PessoaCadastroContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoaCadastroContatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaCadastroContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
