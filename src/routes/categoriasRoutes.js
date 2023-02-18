import express from "express";
import CategoriasController from "../controllers/categoriasController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/categorias", CategoriasController.listarCategorias);

export default router;