import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {Error} from 'mongoose';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).send({error: 'Token is missing'});
        return;
    }
    const user = await User.findOne({token});
    if (!user) {
        res.status(401).send({error: 'Unauthorized'});
        return;
    }
    const { track } = req.body;
    if (!track) {
        res.status(400).send({ error: 'Track ID is required.' });
        return;
    }
    try {
        const trackHistory = new TrackHistory({
            user: user._id,
            track,
        });

        await trackHistory.save();
        res.send(trackHistory);
    } catch (error) {
        if (error instanceof Error.ValidationError){
            res.status(400).send(error);
        }
        next(error);
    }
});

export default trackHistoryRouter;