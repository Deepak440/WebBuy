import express from "express";
import {
  getProducts,
  getProductById,
} from "../controller/productController.js";

const router = express.Router();

//Products
router.route("/").get(getProducts);

router.route("/:id").get(getProductById);

export default router;
