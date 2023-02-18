import tiposConta from "../models/TipoConta.js";


class TiposContaController {
    static listarTipoContas = (req, res) => {
        tiposConta
            .find()
            .exec((err, tiposConta) => {
                if(err)
                    res.status(500).send({message: err.message});
                else
                    res.status(200).send(tiposConta);
            })
    }

}

export default TiposContaController;