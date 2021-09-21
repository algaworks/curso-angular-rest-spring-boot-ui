export interface ApiResponse<T> {
    content: T[],
    last: boolean,
    totalPages: number,
    totalElements: number,
    number: number,
    size: number,
    sort: {
        sorted?: boolean,
        unsorted?: boolean,
        empty?: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
}

export interface Lancamento {
    codigo: number,
    descricao: string,
    dataVencimento: Date,
    dataPagamento?: Date,
    valor: number,
    observacao: string,
    tipo: 'RECEITA' | 'DESPESA',
    categoria: Categoria,
    pessoa: Pessoa
}

export interface Categoria {
    codigo: number,
    nome: string
}

export interface Pessoa {
    codigo: number,
    nome: string,
    endereco: Endereco,
    ativo: boolean
}

export interface LancamentoFiltro {
    descricao?: string
    dataVencimentoInicio?: Date,
    dataVencimentoFim?: Date;
  }

interface Endereco {
    logradouro: string,
    numero: number,
    complemento?: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string
}
