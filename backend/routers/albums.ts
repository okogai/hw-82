import express from "express";
import Album from "../models/Album";
import Artist from "../models/Artist";
import mongoose from "mongoose";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
    const { artist } = req.query;
    try {
        if (artist) {
            const albums = await Album.find({artist});
            res.send(albums);
            return;
        }
        const results = await Album.find();
        res.send(results);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id).populate('artist');
        if (!album) {
            res.status(404).send({ error: 'Album not found' });
            return;
        }
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post('/', async (req, res, next) => {
    const { title, artist, year, cover } = req.body;

    if (mongoose.Types.ObjectId.isValid(artist)) {
       const artist = await Artist.findById(req.body.artist);
       if (!artist) res.status(404).send('Artist not found');
    } else {
        res.status(400).send({ error: 'Invalid artist ID' });
        return;
    }

    try {
        const album = new Album({ title, artist, year, cover });
        await album.save();
        res.send(album);
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;