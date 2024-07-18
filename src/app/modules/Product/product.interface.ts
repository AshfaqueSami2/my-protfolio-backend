

export type TProduct = {
  id: string;
  title: string;
  price: string;
  description: string;
  rating: number;
  image: string;
  //  category: mongoose.Schema.Types.ObjectId;
  category: string;
  brand: string;
  stock: number;
  isDeleted: boolean;
};
