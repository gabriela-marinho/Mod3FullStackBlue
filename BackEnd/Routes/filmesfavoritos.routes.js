const express = require('express');
const router = express.Router();

const filmes = [
    {  // USANDO O Math.floor(Math.random() * 10) GERO NUMEROS ALEATORIOS ATE 10 SEM A PARTE FLUTUANTE

        id: Date.now(),
        Nome : "",
        Imagem :"",
        Genero : "",
        Nota : "",
    }
    
]
// LISTA COMPLETA DE FILMES
router.get('/', (req, res) => {
    res.send(filmes);
})

// LISTA POR ID, nao colocar o :, caso contrario nao irá aparecer
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme  = filmes.find(filme => filme.id == idParam);
    if(!filme) {
        res.status(404).send({error: 'Filme não cadastrado'});
        return;
    }

    res.send(filme);
})

// [POST] /vagas/add - Cadastro de uma nova vaga
router.post('/add', (req, res) => {
    const filme = req.body;
    if(!filme || !filme.Nome || !filme.Imagem || !filme.Genero || !filme.Nota) {
        res.status(400).send({
            message: 'vaga inválida, esta faltando os campos titulo e salario'
        })
        return;
    }
    filme.id = Date.now(); // aqui estou criando um id direto
    filmes.push(filme);
    res.status(201).send({
        message: 'Filme cadastrado com Sucesso!',
        data: filme
    });
})


router.put('/edit/:id', (req, res) => {
    // o objeto que veio do front para atualizar a vaga com o id recebido
    const filmeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice da vaga pre cadastrada na lista de acordo com o id recebido para atualizala ao inves da vaga toda
    let index = filmes.findIndex(filme => filme.id == idParam);
    if(index < 0) {
        res.status(404).send({
            error: 'O Filme informado nao foi encontrado!'
        })
        return;
    }
    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }

    res.send({
        message: `Filme ${filmes[index].Nome} atualizada com sucesso`,
        data: filmes[index] // retorna qual objeto ele atualizou
    })
})

router.delete('/delete/:id', (req, res) => {
    // acessamos o id recebido via parametro
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
    filmes.splice(index, 1);
    res.send({
        message: `Filme ${nome.Nome} excluído com Sucesso !`,
    })
})


module.exports = router;