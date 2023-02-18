import mongoose from "mongoose";

const cursoContaSchema = mongoose.Schema(
    {
        id: {type: String},
        curso: {type: mongoose.Schema.Types.ObjectId, ref: 'cursos', required: true},
        conta: {type: mongoose.Schema.Types.ObjectId, ref: 'conta', required: true},
        dhCadastro: {type: Date, default: +new Date()}
    },
    {
        versionKey: false
    }
);

const cursoConta = mongoose.model('curso_conta', cursoContaSchema);

export default cursoConta;