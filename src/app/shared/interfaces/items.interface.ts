export interface Items {
  id: number;
  proposition: string;
  title: string;
  logo: string,
  class: string,
  image: string;
  code: string;
  desc: string;
  preview: string;
  brief: string;
  attributes: {
    [key: string]: any;
  }
}
