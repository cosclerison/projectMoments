export interface Response<T> {
/* Adicionado um argumento "<>" Generic, com isso podemos variar o tipo de 
  resposta que o argumento vai ter */
  message?: string,
  data: T,
}
