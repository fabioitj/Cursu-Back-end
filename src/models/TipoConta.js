import mongoose from "mongoose";

const tipoContaSchema = mongoose.Schema(
    {
        id: {type: String},
        descricao: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const tiposConta = mongoose.model('tipos_conta', tipoContaSchema);

export default tiposConta;