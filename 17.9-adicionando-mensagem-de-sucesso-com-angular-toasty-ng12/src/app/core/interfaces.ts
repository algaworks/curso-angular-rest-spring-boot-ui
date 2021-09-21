export interface IApiResponse<T> {
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

export interface ILancamento {
    codigo: number,
    descricao: string,
    dataVencimento: Date,
    dataPagamento?: Date,
    valor: number,
    observacao: string,
    tipo: 'RECEITA' | 'DESPESA',
    categoria: ICategoria,
    pessoa: IPessoa
}

export interface ICategoria {
    codigo: number,
    nome: string
}

export interface IPessoa {
    codigo: number,
    nome: string,
    endereco: IEndereco,
    ativo: boolean
}

export interface ILancamentoFiltro {
    descricao?: string,
    dataVencimentoInicio?: Date,
    dataVencimentoFim?: Date,
    pagina: number,
    itensPorPagina: number
}

export interface IPessoaFiltro {
    nome?: string;
    pagina: number;
    itensPorPagina: number;
  }

interface IEndereco {
    logradouro: string,
    numero: number,
    complemento?: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string
}
