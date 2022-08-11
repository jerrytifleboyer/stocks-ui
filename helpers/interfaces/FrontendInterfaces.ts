export interface TabsInterface {
  tab: number;
  setTab: any;
}

export interface LoginPagesInterface {
  resetPassPage: boolean;
  registerPage: boolean;
}

export interface NotesListInterface {
  ticker: string;
  name: string;
  date: string;
  price: number;
  priceTarget: string;
  notes: string;
}

export interface TickerDataInterface {
  _id: string;
  ticker: string;
  name: string;
  date: string;
  previousClosePrice: number;
  currentPrice: number;
  price: [number];
  time: [number];
}
