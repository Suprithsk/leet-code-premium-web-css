const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);


const dbName = 'leetcode';
const collectionName = 'questions';

const jsonFilePath = path.join(__dirname, 'questions.json');

async function pushDataToMongoDB() {

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const data = fs.readFileSync(jsonFilePath, 'utf-8');
    const jsonData = JSON.parse(data);

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documents inserted successfully`);
  } catch (err) {
    console.error('Error inserting data: ', err);
  } finally {
    await client.close();
  }
}

pushDataToMongoDB();
