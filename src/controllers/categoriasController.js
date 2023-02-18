import categorias from "../models/Categoria.js";
import Error from "../models/Erro.js";


class CategoriasController {
    
    static listarCategorias = (req, res) => {
        categorias
            .find()
            .exec((err, categorias) => {
                if(err){
                    Error.addError(err);
                    res.status(500).send({error: Error.getErrors()});
                }
                else
                    res.status(200).send(categorias);
            });
    }

}


export default CategoriasController;