// cart.service.ts
import { Cart } from './cart.model';
import { Product } from '../Product/product.model';

const addToCart = async (
  sessionId: string,
  productId: string,
  quantity: number,
) => {
  let cart = await Cart.findOne({ sessionId });

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    throw new Error('Not enough stock available');
  }

  if (!cart) {
    cart = new Cart({ sessionId, items: [{ productId, quantity }] });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[itemIndex].quantity += quantity;
      if (cart.items[itemIndex].quantity > product.stock) {
        throw new Error('Not enough stock available');
      }
    }
  }

  await cart.save();
  return cart;
};

const getCart = async (sessionId: string) => {
  const cart = await Cart.findOne({ sessionId }).populate('items.productId');
  return cart;
};

const editCartItem = async (
  sessionId: string,
  productId: string,
  quantity: number,
) => {
  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    throw new Error('Cart not found');
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    throw new Error('Item not found in cart');
  }

  cart.items[itemIndex].quantity = quantity;

  if (cart.items[itemIndex].quantity > product.stock) {
    throw new Error('Not enough stock available');
  }

  await cart.save();
  return cart;
};

const removeFromCart = async (sessionId: string, productId: string) => {
  const cart = await Cart.findOne({ sessionId });

  if (!cart) {
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId,
  );
  await cart.save();
  return cart;
};

export const CartService = {
  addToCart,
  getCart,
  editCartItem,
  removeFromCart,
};
