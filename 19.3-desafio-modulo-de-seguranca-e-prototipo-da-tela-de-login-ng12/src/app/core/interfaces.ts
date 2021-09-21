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

export interface LancamentoFiltro {
    descricao?: string,
    dataVencimentoInicio?: Date,
    dataVencimentoFim?: Date,
    pagina: number,
    itensPorPagina: number
}

export interface PessoaFiltro {
    nome?: string;
    pagina: number;
    itensPorPagina: number;
  }
