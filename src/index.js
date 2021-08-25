const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let clients = [
    { id: 1, nome: 'Lucas Garcia', telefone: '53984292062' },
    { id: 2, nome: 'Bruno Garcia', telefone: '53984292061' },
    { id: 3, nome: 'Renan Garcia', telefone: '53984292060' },
    { id: 4, nome: 'Cristian Garcia', telefone: '53984292063' },
]

function log(req, res, next) {
    const { url, method } = req
    console.log(`${method} -  ${url} at ${new Date()}`)
    next()
}

app.use(log)

//retorna todos os clientes
app.get('/clients', (request, response) => response.status(200).json(clients))

//buscar um único cliente
app.get('/clients/:id', (request, response) => {
    const { id } = request.params
    const client = clients.find(value => value.id == id)
    if (client == undefined) {
        response.status(400).send()
    } else {
        response.status(200).json(client)
    }
})

//inserir dados no servidor
app.post('/clients', (request, response) => {
    const client = request.body
    clients.push(client)
    response.status(201).json(client)
})

//Atualizar registro
app.put('/clients/:id', (request, response) => {
    const id = request.params.id
    const nome = request.body.nome

    let client = clients.find(value => value.id == id)
    if (client == undefined) {
        response.status(400).send()
    } else {
        client.nome = nome
        response.status(200).json(client)
    }
})

app.delete('/clients/:id', (request, response) => {

    const { id } = request.params
    const index = clients.findIndex(value => value.id == id);
    if (index == -1) {
        response.status(400).send()
    } else {
        clients.splice(index, 1)
        response.status(204).send()
    }
})


app.listen(3000)