import modulos from "../models/Modulo.js";
import aulas from "../models/Aula.js";
import Error from "../models/Erro.js";
import mongoose from "mongoose";


class ModulosController {
    
    static listarModulosPorCurso = (req, res) => {
        const { id } = req.params;
        modulos
            .aggregate([
                {
                    $match: {
                        idCurso: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: "aulas", // collection name in db
                        localField: "_id",
                        foreignField: "idModulo",
                        as: "aulas"
                    }
                }
            ]).exec(function(err, modulos) {
                if(err){
                    Error.addError(err);
                    res.status(500).send({error: Error.getErrors()});
                }
                else{
                    res.status(200).send(modulos);
                }
            });

        // modulos
        //     .find({idCurso: id })
        //     .exec((err, modulos) => {
        //         console.log("id: ", id);
        //         console.log(modulos);
        //         if(err){
        //             Error.addError(err);
        //             res.status(500).send({error: Error.getErrors()});
        //         }
        //         else{

        //         }
        //     });
    }

    static inserirModuloPorCurso = (req, res) => {
        const { body } = req;

        const modulo = new modulos(body);
        modulo.save((err) => {
            if(err){
                Error.addError(err);
                res.status(500).send({error: Error.getErrors()});
            }
            else
                res.status(200).send(modulo.toJSON());
        });
    }

    static alterarModuloPorCurso = (req, res) => {
        const {id} = req.params;
        modulos.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err) {
                Error.addError(err);
                res.status(500).send({error: Error.getErrors()});
            } 
            else {
                res.status(200).send(id);
            }
        })
    }

    static removerModuloPorCurso = (req, res) => {
        const {id} = req.params;

        modulos.findByIdAndDelete(id, (err) => {
            if(err) {
                Error.addError(err);
                res.status(500).send({error: Error.getErrors()});
            }
            else {
                res.status(200).send(id);
            }
        });
    }
}


export default ModulosController;