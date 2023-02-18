import express from "express";
import ModulosController from "../controllers/modulosController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/modulos/:id", ModulosController.listarModulosPorCurso)
    .post("/modulos", ModulosController.inserirModuloPorCurso)
    .put("/modulos/:id", ModulosController.alterarModuloPorCurso)
    .delete("/modulos/:id", ModulosController.removerModuloPorCurso);
    // .get("/modulos/:id", checkToken, ModulosController.listarModulosPorCurso);

export default router;