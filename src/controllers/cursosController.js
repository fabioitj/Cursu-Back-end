import cursos from "../models/Curso.js";
import { isNull } from "../util/Validacoes.js";

class CursosController {
    static listarCursos = (req, res) => {
        cursos
            .find()
            .populate({
                path: "idProfessor",
                populate: {
                    path: "tipo",
                },
            })
            .populate("idCategoria")
            .exec((err, cursos) => {
                if(err) 
                    res.status(500).send({message: err.message});
                else
                    res.status(200).json(cursos)
            })
    }

    static listarCursosPorProfessor = (req, res) => {
        const { id } = req.params;

        cursos
            .find({ idProfessor: id })
            .populate({
                path: "idProfessor",
                populate: {
                    path: "tipo",
                },
            })
            .populate("idCategoria")
            .exec((err, cursos) => {
                if(err)
                    res.status(500).send({message: err.message});
                else
                    res.status(200).send(cursos);
            });
    }

    static obterCurso = (req, res) => {
        const {id} = req.params;
        cursos
            .findById(id)
            .populate({
                path: "idProfessor",
                populate: {
                    path: "tipo"
                }
            })
            .populate("idCategoria")
            .exec((err, curso) => {
                if(err) 
                    res.status(500).send({message: err.message});
                else
                    res.status(200).json(curso)
            })
    }

    static inserirCurso = (req, res) => {
        const {body} = req;

        const curso = new cursos(body);
        curso.save((err) => {
            if(err)
                res.status(500).send({message: err.message});
            else
                res.status(200).send(curso.toJSON());
        })
    }

    static alterarCurso = (req, res) => {
        const {id} = req.params;
        cursos.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err) {
                res.status(500).send({message: `Falta ao alterar o curso: ${err.message}`});
            } 
            else {
                res.status(200).send("Curso atualizado com sucesso.");
            }
        })
    }
}

export default CursosController;