import mongoose from "mongoose";

const cursoSchema = mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        descricao: {type: String, required: true},
        imagem: {type: String, required: true},
        banner: {type: String, required: true},
        preco_bruto: {type: String, required: true},
        desconto: {type: String},
        preco_liquido: {type: String, required: true},
        idProfessor: {type: mongoose.Schema.Types.ObjectId, ref: 'conta', required: true},
        idCategoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categoria', required: true},
        idCollection: {type: String},
    },
    {
        versionKey: false
    }
);

const cursos = mongoose.model('cursos', cursoSchema);

export default cursos;