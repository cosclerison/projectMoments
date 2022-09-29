export interface Moments {
  // Usando "?" no "id" mostra que e um valor opcional para está variável.
  id?: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  comments?: [{ text: string, username: string}];
}
