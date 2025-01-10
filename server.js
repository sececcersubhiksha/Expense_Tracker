const modules = require('./modules');

const http = require('http');

const server = http.createServer((req,res) => {
    res.writeHead(200, {"content-type": "text/plain"});
    res.write("******CALCULATOR******\n");
    const sum = modules.add(10,27);
    res.write(`Addition: ${sum}\n`);
    const sub = modules.subtract(30,25);
    res.write(`Subtraction: ${sub}\n`);
    const mul = modules.multiply(10,27);
    res.write(`Multiplication: ${mul}\n`);
    const div = modules.divide(36,2);
    res.write(`Division: ${div}\n`);
    const mod = modules.add(10,27);
    res.write(`Remainder: ${mod}\n`);
    res.end();
});

server.listen(3000, () => {
    console.log("server is running on port http://localhost:3000/");
});
/*
console.log(modules.add(10,27));
console.log(modules.subtract(30,25));
console.log(modules.multiply(10,27));
console.log(modules.divide(36,2));
console.log(modules.remainder(63,3));
*/