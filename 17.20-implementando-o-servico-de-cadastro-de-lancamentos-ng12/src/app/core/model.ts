import { ILancamento, IPessoa, ICategoria, IEndereco } from './interfaces';
export class Lancamento implements ILancamento {
    codigo!: number;
    descricao!: string;
    dataVencimento!: Date;
    dataPagamento!: Date;
    valor!: number;
    observacao!: string;
    tipo = 'RECEITA';
    categoria = new Categoria();
    pessoa = new Pessoa();
}

export class Categoria  {
    codigo: number | undefined;
    nome: string | undefined;
}

export class Pessoa implements IPessoa {
    codigo!: number;
    nome!: string;
    endereco!: IEndereco;
    ativo!: boolean;
}