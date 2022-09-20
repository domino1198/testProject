const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()




server.use(middlewares)

server.use(jsonServer.bodyParser)

server.use((req, res) => {

    if (req.body.login === router.db.__wrapped__.auth[0].login && req.body.password === router.db.__wrapped__.auth[0].password) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({token: 'current_token'}))
    } else {
        res.sendStatus(401)
    }
})

server.use('/auth',router)
server.listen(3001, () => {
    console.log('JSON Server is running')
})
