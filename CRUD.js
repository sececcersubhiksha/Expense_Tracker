const fs = require('fs');

const create = (student) => {
    let students = [] ;
    fs.readFileSync('./student.json' , 'utf8', (error,data) => {
        let ac = data ? JSON.parse(data) : [] ;
        if(ac.length > 0) {
            students = [...ac,student]
        }
        else{
            students = [student] ;
        }
    });
    fs.writeFile('./student.json','utf8',JSON.stringify(data),(err) => {
        if(err){
            console.log("Cannot open file");
            return;
        }
        console.log("Data written to file successfully");
    });
}

const data = {
    id: "cce55",
    name: "Subhiksha" ,
    rollno : "23CC055" , 
    age : 19
}

create(data);

