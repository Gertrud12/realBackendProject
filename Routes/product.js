import express from "express";
import {
  	
	createProduct,
	deleteProduct,
	allProducts,
	// getDiscountedProduct,
	getTopProduct,
	getNewProduct,
	singleProduct,
	// getProductReview,
	getRelatedProduct,
	// updateDiscountedProduct,
	updateProduct,
	topSales,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// createProduct (Admin alone)
router.post("/", protect, admin, createProduct);

// getAllProduct (everyone )
router.get("/", allProducts);

//new Product
router.get("/new", getNewProduct)

//new Products
router.get("/featured", getTopProduct)

//discounted products (everyone)
// router.get('/discounts', getDiscountedProduct)

// getSingleProduct (everyone)
router.get("/:id", singleProduct),

// updateAProduct (admin only)
router.put("/:id", protect, admin, updateProduct);

// deleteAProduct (admin only)
router.delete("/:id", protect, admin, deleteProduct);

// getRelatetProduct (everyone)
router.get('/:id/related', getRelatedProduct)



//updateDiscountedProducts (admin only)
// router.put('/:id/discount', protect, admin, updateDiscountedProduct)

//bestSellers (everyone)
router.get('/top', topSales)

//createProductReview (users)
// router.post('/:id/review', protect, user, createProductReview)

//getProductsReviews (everyone)
// router.get('/:id/all-reviews', getProductReview)

export default router;
