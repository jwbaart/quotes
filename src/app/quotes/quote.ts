export enum Child {
  Ben = 'ben',
  Tom = 'tom'
}

export interface Quote {
  id: string;
  story: string;
  children: Child;
}
