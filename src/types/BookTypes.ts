import { Book } from './BookDetailsTypes'

export interface Author {
  name: string;
}

export interface Data {
  results: Book[];
  count: number;
}