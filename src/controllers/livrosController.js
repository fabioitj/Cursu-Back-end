import livros from "../models/Livro.js";

class LivroController {

    static listarLivros = (req, res) => {
        livros
            .find()
            .populate('autor')
            .populate('editora')
            .exec((err, livros) => {
                if(err) {
                    res.status(500).send({message: `Erro ao consultar livros: ${err.message}`})
                }
                else {
                    res.status(200).json(livros);
                }
            }); 
    }

    static obterLivro = (req, res) => {
        const {id} = req.params;
        
        livros
            .findById(id)
            .populate('autor', ['nome', 'nacionalidade'])
            .populate('editora', 'nome')
            .exec((err, livros) => {
                if(err) {
                    res.status(400).send({message: `Id: ${id} informado não encontrou nenhum registro no banco.`});
                }
                else {
                    res.status(200).json(livros);
                }
            });
    }

    static inserirLivro = (req, res) => {
        const {body} = req;

        let livro = new livros(body);
        livro.save((err) => {
            if(err) {
                res.status(500).send({message: `Falha ao cadastrar um livro: ${err.message}`})
            } 
            else {
                res.status(201).send(livro.toJSON());
            }
        });
    }

    static alterarLivro = (req, res) => {
        const {id} = req.params;
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send("Livro atualizado com sucesso.");
            } 
            else {
                res.status(500).send({message: `Falta ao alterar um livro: ${err.message}`});
            }
        })
    }

    static excluirLivro = (req, res) => {
        const {id} = req.params;

        livros.findByIdAndDelete(id, (err) => {
            if(!err) {
                res.status(200).send({message: `Livro removido com sucesso.`});
            }
            else {
                res.status(500).send({message: `Erro ao remover o livro: ${err.message}`});
            }
        })
    }

    static listarLivroPorEditora = (req, res) => {
        const nomeEditora = req.query.editora;

        const editora = this.obterEditoraByNome(nomeEditora);

        if(editora) {
            
            livros.find({'editora': editora._id})
            .populate('autor')
            .populate('editora')
            .exec((err, livros) => {
                res.status(200).json(livros);
            });
        }
        else {
            res.status(500).send({message: `Livros não encontrados pelo filtro.`});
        }
        
    }

    static obterEditoraByNome(nome) {
        return editora.findOne({'nome': nome});
    }
}

export default LivroController;
