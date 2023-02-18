import cursoConta from "../models/CursoConta.js";

class CursoContaController {
    static comprarCurso = (req, res) => {
        const newCursoConta = new cursoConta(req.body);
        newCursoConta.save((err) => {
            if (err) res.status(500).send({ message: err.message });
            else res.status(200).send(newCursoConta.toJSON());
        });
    };

    static listarCursosPorConta = (req, res) => {
        const { id } = req.params;
        cursoConta
            .find({ conta: id }, ["_id", "curso"])
            .populate({
                path: "curso",
                populate: {
                    path: "idProfessor",
                    populate: {
                        path: "tipo",
                    },
                },
            })
            .exec((err, cursoConta) => {
                if (err) res.status(500).send({ message: err.message });
                else {
                    res.status(200).send(cursoConta);
                }
            });
    };

    static validarMetodoAdquirido = (req, res) => {
        const curso = req.query.c;
        const conta = req.params.id;

        cursoConta
            .findOne({
                curso: curso,
                conta: conta,
            })
            .exec((err, cursoConta) => {
                if (err) res.status(500).send({ message: err.message });
                else {
                    if (cursoConta) res.status(200).send({ obj: true });
                    else res.status(200).send({ obj: false });
                }
            });
    };
}

export default CursoContaController;
