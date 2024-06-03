export type MapboxType = {
    id:string;
    properties:{
      address:string;
    };
    text: string;
    imgUrl: string;
  }


export type CoffeeStoreType = {
    id: number;
    name: string;
    imgUrl: string;
    address: string;
    voting:number;
  }

export  type CardType = {
    name: string;
    href: string;
    imgUrl: string;
  };

  export type AirTableType ={
    id:string,
    recordId:string,
    fields: CoffeeStoreType,
  }