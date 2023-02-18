import express from "express";
import CursoContaController from "../controllers/cursoContaController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/meus_cursos/validar_curso/:id", checkToken, CursoContaController.validarMetodoAdquirido)
    .get("/meus_cursos/:id", checkToken, CursoContaController.listarCursosPorConta)
    .post("/meus_cursos", checkToken, CursoContaController.comprarCurso);

export default router;