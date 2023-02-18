import express from "express";
import ContasController from "../controllers/contasController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/conta/:id", checkToken, ContasController.obterConta)
    .post("/register", ContasController.register)
    .post("/login", ContasController.login)
    .put("/alterar_conta/:id", ContasController.alterarConta);

export default router;