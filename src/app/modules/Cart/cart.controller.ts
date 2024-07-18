// cart.controller.ts
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CartService } from './cart.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const sessionId = req.sessionID;
  const result = await CartService.addToCart(sessionId, productId, quantity);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added to cart successfully',
    data: result,
  });
});

const getCart = catchAsync(async (req: Request, res: Response) => {
  const sessionId = req.sessionID;
  const result = await CartService.getCart(sessionId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart retrieved successfully',
    data: result,
  });
});

const editCartItem = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const sessionId = req.sessionID;

  const result = await CartService.editCartItem(sessionId, productId, quantity);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart item updated successfully',
    data: result,
  });
});

const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const sessionId = req.sessionID;
  const result = await CartService.removeFromCart(sessionId, productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product removed from cart successfully',
    data: result,
  });
});

export const CartController = {
  addToCart,
  getCart,
  editCartItem,
  removeFromCart,
};
