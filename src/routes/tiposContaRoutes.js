import express from "express";
import TiposContaController from "../controllers/tiposContaController.js";

const router = express.Router();

router
    .get("/tipo_conta", TiposContaController.listarTipoContas);

export default router;