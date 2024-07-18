export type TOrderItem = {
  productId: string;
  quantity: number;
};

export type TOrder = {
  customerName: string;
  customerAddress: string;
  phone:string;
  products: TOrderItem[];
  paymentMethod: string;
  status: string;
  isDeleted:boolean;
};
