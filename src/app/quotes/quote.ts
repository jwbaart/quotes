export enum Child {
  Ben = 'ben',
  Tom = 'tom'
}

export interface Quote {
  id: string;
  text: string;
  children: Child;
}
