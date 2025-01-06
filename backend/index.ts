import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import mongoDb from "./mongoDb";
import artistsRouter from "./routers/artists";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/artists', artistsRouter);

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/discography');

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));


