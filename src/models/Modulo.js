import mongoose from "mongoose";
import aulas from "./Aula.js";

const moduloSchema = mongoose.Schema(
    {
        id: {type: String},
        descricao: {type: String, required: true},
        idCurso: {type: mongoose.Schema.Types.ObjectId, ref: 'curso', required: true}
    },
    {
        versionKey: false
    }
);

moduloSchema.pre('remove', function(next) {
    aulas.remove({idModulo: this._id}).exec();
    next();
})

const modulos = mongoose.model('modulo', moduloSchema);

export default modulos;