import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Product } from './product.model';
import { ProductServices } from './product.service';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  const result = await ProductServices.createProductIntoDB(productData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Create successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const query = req.query
  const totalProducts = await Product.countDocuments()
  const result = await ProductServices.getAllProductFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retreive successfully',
    data: result,
    totalProducts:totalProducts,
  });
});

const getSingleProductWithID = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retreive successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const productData = req.body;
  const result = await ProductServices.updateProductInformationInDB(
    productId,
    productData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully',
    data: result,
  });
  return result;
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProductWithID,
  updateProduct,
  deleteProduct,
};
