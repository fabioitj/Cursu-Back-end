import express from "express";
import CursosController from "../controllers/cursosController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/cursos", CursosController.listarCursos)
    .get("/cursos/listarPorProfessor/:id", CursosController.listarCursosPorProfessor)
    .get("/cursos/:id", CursosController.obterCurso)
    .post("/cursos", CursosController.inserirCurso)
    .put("/cursos/:id", CursosController.alterarCurso);

export default router;