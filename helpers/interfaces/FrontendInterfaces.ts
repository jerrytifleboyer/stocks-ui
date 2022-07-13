export interface TabsInterface {
  tab: number;
  setTab: any;
}

export interface LoginPagesInterface {
  resetPassPage: boolean;
  registerPage: boolean;
}

export interface NotesListInterface {
  ticker: String;
  name: String;
  date: String;
  price: Number;
  priceTarget: String;
  notes: String;
}

export interface TickerDataInterface {
  ticker: String;
  name: String;
  date: String;
  previousClosePrice: Number;
  price: [Number];
  time: [Number];
}
