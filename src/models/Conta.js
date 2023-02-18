import mongoose from "mongoose";

const contaSchema = mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        email: {type: String, required: true},
        senha: {type: String, required: true},
        tipo: {type: mongoose.Schema.Types.ObjectId, ref: 'tipos_conta', required: true},
        dhCadastro: {type: Date, default: +new Date()}
    },
    {
        versionKey: false
    }
);

const contas = mongoose.model('conta', contaSchema);

export default contas;