import mongoose from "mongoose";

const aulachema = mongoose.Schema(
    {
        id: {type: String},
        descricao: {type: String, required: true},
        url: {type: String},
        duration: {type: String},
        idModulo: {type: mongoose.Schema.Types.ObjectId, ref: 'modulo', required: true},
        idCurso: {type: mongoose.Schema.Types.ObjectId, red: 'cursos', required: true},
        idCollection: {type: String},
        idVideoAula: {type: String},
        ordem: {type: Number, required: true}
    },
    {
        versionKey: false
    }
);

const aulas = mongoose.model('aula', aulachema);

export default aulas;