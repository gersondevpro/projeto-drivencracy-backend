import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI);
mongoClient.connect()
let db = mongoClient.db("driven-cracy");

export {
    db
};