import contas from "../models/Conta.js";
import { generateToken } from "../routes/auth.js";
import { checkToken } from "../routes/auth.js";
import Error from "../models/Erro.js";


class ContasController {
    static register = (req, res) => {
        const {nome, email, senha, confirmaSenha, tipo} = req.body;

        const validacoes = validarRegister(nome, email, senha, confirmaSenha, tipo)
        if(validacoes.length > 0) {
            res.status(201).send({itens: validacoes, success: false});
            return;
        }

        let conta = new contas({nome, email, senha, tipo});
        conta.save((err) => {
            if(err)
                res.status(500).send({message: err.message});
            else
                res.status(200).send({id: conta._id});
        })
    }

    static alterarConta = (req, res) => {
        const {id} = req.params;
        console.log(req.body);
        contas.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            console.log(err);
            if(err)
                res.status(500).send({message: err.message});
            else{
                contas
                    .findById(id, ['_id', 'nome', 'email', 'tipo'])
                .populate("tipo")
                .exec((err, conta) => {
                    if(err) {
                        res.status(500).send({message: err.message});
                    }
                    else {
                        res.status(200).send(conta.toJSON());
                    }
                })
            }
        });
    }

    static login = (req, res) => {
        const {body} = req;

        contas
            .findOne({
                'email': body.email,
                'senha': body.senha
            }, ['_id', 'nome', 'email', 'tipo'])
            .populate("tipo")
            .exec((err, conta) => {
                if(err) {
                    res.status(500).send({message: err.message});
                }
                else {
                    if(conta){
                        try {
                            const token = generateToken(conta._id);

                            const ret = {
                                token,
                                conta
                            };

                            res.status(200).send(ret);

                        } 
                        catch (error) {
                            res.status(500).send({message: error})
                        }

                    }
                    else {
                        res.status(200).send({itens: ['Email ou senha inválidos'], success: false});
                    }
                }
            })
    }

    static obterConta = (req, res) => {
        const {id} = req.params;
        contas
            .findById(id)
            .populate('tipo')
            .exec((err, conta) => {
                if(err){
                    Error.addError(err.message);
                    res.status(500).send({error: Error.getErrors()});
                }
                else
                    res.status(200).send(conta);
            })
    }

    static validateToken = (req, res) => {
        checkToken(req, res, null);
    }
}

function validarRegister(nome, email, senha, confirmaSenha, tipo) {
    let validacoes = [];

    if(!nome)
        validacoes.push("Você precisa preencher o seu nome.");

    if(!email)
        validacoes.push("Você precisa preencher o email.");

    if(!senha)
        validacoes.push("Você precisa preencher a senha.");

    if(senha != confirmaSenha)
        validacoes.push("Você precisa preencher as senhas corretamente.");

    if(!tipo)
        validacoes.push("Você precisa preencher o tipo da sua conta.");

    return validacoes;
}

export default ContasController;