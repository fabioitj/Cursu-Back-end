import express from "express";
import LivroController from "../controllers/LivrosController.js";

const router = express.Router();

router
    .get("/livros", LivroController.listarLivros)
    .get("/livros/busca", LivroController.listarLivroPorEditora)
    .get("/livros/:id", LivroController.obterLivro)
    .post("/livros", LivroController.inserirLivro)
    .put("/livros/:id", LivroController.alterarLivro)
    .delete("/livros/:id", LivroController.excluirLivro);

export default router;