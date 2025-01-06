import express from "express";
import Artist from "../models/Artist";

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
    try {
        const results = await Artist.find();
        res.send(results);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', async (req, res, next) => {

});

export default artistsRouter;
