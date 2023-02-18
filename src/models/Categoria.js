import mongoose from "mongoose";

const categoriaSchema = mongoose.Schema(
    {
        id: {type: String},
        descricao: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const categorias = mongoose.model('categoria', categoriaSchema);

export default categorias;