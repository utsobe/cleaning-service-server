const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middletare
//! Warning: Do not use cors like this in production
app.use(cors({
    origin: '*',
}));
app.use(express.json());

// mongodb database
const uri = `mongodb+srv://${process.env.APP_USER}:${process.env.APP_PASS}@cluster0.6poo1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('cleanCo').collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const result = await serviceCollection.find(query).toArray();
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Welcome to Cleaning Service');
})

app.listen(port, () => {
    console.log('Cleaning service running by port:', port);
})