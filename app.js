var express = require("express");

const app = express();

const { v4: uuidv4 } = require("uuid");

const cors = require("cors");

app.use(express.json()); //Middleware

app.use(cors());

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://rsubhiksha:rsubhi123@cluster0.xpty3.mongodb.net/").then(() => {
    console.log("connected to database");
});
// password : rsubhi123
const expenseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
});

const Expenses = mongoose.model("Expenses", expenseSchema);

app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expenses.find();
        res.status(200).json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch expenses" });
    }
});

app.get("/api/expenses/:id", async(req,res) => {
    try{
    const {id} = req.params ;
    const expense = await Expenses.findOne({id});
    if(!expense){
        return res.status(404).json({message: "Expense not found"});
    }
    res.status(200).json(expense);
    }
    catch(error){
        res.status(500).json({message: "Error in fetching expenses"}) ;
    }
});

app.delete("/api/expenses/:id",async(req,res) => {
        const {id} = req.params ;
        try{
            const deleteExpense = await Expenses.findOneAndDelete(
                {id}
            )
            if(!deleteExpense){
                return res.status(404).json({message: "Expense not found"})
            }
            res.status(200).json(deleteExpense);
        }catch{
            res.status(500).json({message: "Error in deleting expense"});
        }
    }
)

app.put("/api/expenses/:id" , async(req,res) => {
    const {id} = req.params ;
    const {title, amount} = req.body ;
    try{
        const updateExpense = await Expenses.findOneAndUpdate(
            {id},
            {title,amount}
        )
        if(!updateExpense){
            return res.status(404).json({message: "Expense not found"})
        }
        res.status(200).json("Updated successfully");
    }catch(err){
        res.status(500).json({message: "Error in updating expense"})
    }
})

app.post("/api/expenses", async (req, res) => {
    const { title, amount } = req.body;
    try {
        const newExpense = new Expenses({
            id: uuidv4(),
            title: title,
            amount: amount
        });
        const savedExpense = await newExpense.save();
        res.status(200).json(savedExpense);
    }
    catch (err) {
        res.status(500).json({ message: "Error in creating expense" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})


/*
const students = [
    {
    name: "Vijay",
    age: 20,
    rollno: 1
    },
    {
        name: "Hema",
        age: 18,
        rollno: 2
    },
    {
        name: "Siva",
        age: 22,
        rollno: 3
    }
]

app.get("/api/sayhello", (req,res) => {
    res.send("Hello CCE");
    res.end();
});

app.get("/api/students", (req,res) => {
    res.status(200).json(students);
});

app.get("/api/students/:age", (req,res) => {
    const {age} = req.params ;
    const student = students.find((student) => student.age == age) ;
    if(!student) {
        res.status(404).json({message: "student not found"});
    }else{
        res.status(200).json(student);
    }
});

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})

const updateStudent = (id, updateData) => {
    fs.readFile('./Student.json', 'utf8', (error, data) => {
        if (error) {
            console.log('Error reading file:', error);
            return;
        }

        let students = data ? JSON.parse(data) : [];

        const studentIndex = students.findIndex(student => student.id === id);
        
        if (studentIndex !== -1) {
            students[studentIndex] = { ...students[studentIndex], ...updateData };

            fs.writeFile('./Student.json', JSON.stringify(students, null, 2), 'utf8', (writeError) => {
                if (writeError) {
                    console.log('Error writing data:', writeError);
                } else {
                    console.log('Student data updated successfully');
                }
            });
        } else {
            console.log('Student not found!');
        }
    });
};

updateStudent(1, { name: 'Saumya M', age: 20 });

const deleteStudent = (id) => {
    fs.readFile('./Student.json', 'utf8', (error, data) => {
        if (error) {
            console.log('Error reading file:', error);
            return;
        }

        let students = data ? JSON.parse(data) : [];

        const studentIndex = students.findIndex(student => student.id === id);
        
        if (studentIndex !== -1) {
            students.splice(studentIndex, 1);  // Remove the student at the found index

            fs.writeFile('./Student.json', JSON.stringify(students, null, 2), 'utf8', (writeError) => {
                if (writeError) {
                    console.log('Error writing data:', writeError);
                } else {
                    console.log('Student data deleted successfully');
                }
            });
        } else {
            console.log('Student not found!');
        }
    });
};

deleteStudent(1);
*/