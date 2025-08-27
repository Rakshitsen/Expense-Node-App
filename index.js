import dotenv from 'dotenv';
dotenv.config();

import { MongoClient, ObjectId } from 'mongodb';
import express from 'express';





const app = express()


const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const collection_name = process.env.COLLECTION_NAME;



app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const client = new MongoClient(mongoUrl)

client.connect().then((connection) => {
    const db = connection.db(dbName);

    app.get('/', async (req, res) => {
        const collection = db.collection(collection_name);
        const total_expense = await collection.find({}).toArray();
        const totalAmount = total_expense.reduce((sum, item) => sum + Number(item.amount), 0);
        console.log("Total amount: ", totalAmount);
        res.render('expense', { total_expense, totalAmount });
    });

    app.get('/add', async (req, res) => {
        res.render('add-expense')
    })

    app.post("/add-expense", async (req, res) => {
        const { title, amount, category } = req.body;
        const collection = db.collection(collection_name);
        await collection.insertOne({ title, amount: parseInt(amount), category });
        res.redirect('/');
    });

    app.get('/filter', async (req, res) => {
        const category = req.query.category;  // e.g. Food, Travel
        const collection = db.collection(collection_name);

        let filter = {};
        if (category && category !== "All") {
            filter = { category: category };
        }

        const filteredExpense = await collection.find(filter).toArray();
        const filtered_totalAmount = filteredExpense.reduce((sum, item) => sum + Number(item.amount), 0);
        res.render('expense', { total_expense: filteredExpense, totalAmount:filtered_totalAmount});
    });

    // ############################################# 
    app.get('/api', async (req, res) => {
        const collection = db.collection(collection_name);
        const total_expense = await collection.find({}).toArray();
        res.send(total_expense);
    });

    app.post('/add-api', async (req, res) => {
        console.log(req.body);
        const collection = db.collection(collection_name);
        const result = await collection.insertOne(req.body);
        res.send({ message: "expense add", id: result.insertedId });
    });

    app.delete('/delete-api/:id', async (req, res) => {
        try {
            console.log(req.params.id);
            const collection = db.collection(collection_name);

            // Convert string id to ObjectId
            const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

            if (result.deletedCount === 1) {
                res.send({ message: "Expense deleted successfully" });
            } else {
                res.status(404).send({ message: "Expense not found" });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Error deleting expense" });
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

