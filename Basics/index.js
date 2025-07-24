// const http =


const { log } = require("console");
const http = require("http");

const port = 5050;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello world!!');
})

server.listen(port, () => {
    console.log(`server running on port ${port}`);
})