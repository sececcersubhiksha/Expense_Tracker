const fs = require('fs');
const http = require('http');

fs.readFile('./sample.json', 'utf8',(err,data) => {
    if(err) {
       res.write("Cannot open file");
       return ;
   }
    const jsonData = JSON.parse(data);
    const filteredData = jsonData.filter((user) => user.amount > 1000) ;
    fs.writeFile("./data.json", JSON.stringify(filteredData),(err) => {
        if(err){
            console.log("Error writing file");
            return;
        }
    });
});

