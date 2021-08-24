const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let clients = [
    {id:1, nome: 'Lucas Garcia', telefone: '53984292062'},
    {id:2, nome: 'Bruno Garcia', telefone: '53984292061'},
    {id:3, nome: 'Renan Garcia', telefone: '53984292060'},
    {id:4, nome: 'Cristian Garcia', telefone: '53984292063'},
]

//retorna todos os clientes
app.get('/clients', (request, response) => response.json(clients))

//buscar um único cliente
app.get('/clients/:id', (request, response) => {
    const client = clients.filter(value => value.id == request.params.id)
    response.json(client)
})

//inserir dados no servidor
app.post('/clients', (request, response) => {
    const client = request.body
    clients.push(client)
    response.json(client)
})

//Atualizar registro
app.put('/clients/:id', (request, response) => {
    const id = request.params.id
    const nome = request.body.nome
    
    let client = clients.filter(value => value.id == id)
    
    client[0].nome = nome
    response.json(client[0])
})

app.delete('/clients/:id', (request, response) => {

    const id = request.params.id

    clients = clients.filter(value => value.id !== id)
    response.json(clients)
})


app.listen(3000)