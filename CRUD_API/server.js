const http = require('http');
require('dotenv').config()
const getReq = require('./methods/get-req');
const postReq = require('./methods/post-req');
const putReq = require('./methods/put-req');
const deleteReq = require('./methods/delete-req');
let movies = require('./data/data.json')
const PORT = process.env.PORT || 3001

const server = http.createServer((req, res) => {

    req.movies = movies
    console.log("🚀 ~ server ~ req.method:", req.method)
    switch (req.method) {
        
        case 'GET':
            getReq(req, res);
            break;
        case 'POST':
            postReq(req, res);
            break;
        case 'PUT':
            putReq(req, res);
            break;
        case 'DELETE':
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 200
            res.setHeader("Content-type", "application/json");
            res.write(
                JSON.stringify({
                    name: "wellcome"
                })
            )
            res.end()

    }

})

server.listen(PORT, () => {
    console.log("SERVER STARTED AT ", PORT)
})