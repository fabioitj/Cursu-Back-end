import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import livros from "./livrosRoutes.js";
import cursos from "./cursosRoutes.js";
import contas from "./contasRoutes.js";
import tiposConta from "./tiposContaRoutes.js";
import cursoConta from "./cursoContaRoutes.js";
import categorias from "./categoriasRoutes.js";
import modulos from "./modulosRoutes.js";
import aulas from "./aulasRoutes.js";


const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send("Curso de Node");
    });

    app.use(
        express.json(),
        cors({
            origin: 'http://localhost:3001',
        }),
        express.urlencoded({ extended: true }),
        bodyParser.raw({type: 'application/octet-stream', limit: '100mb'}),
        livros,
        cursos,
        contas,
        tiposConta,
        cursoConta,
        categorias,
        modulos,
        aulas,
    );

}

export default routes;