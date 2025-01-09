import express from 'express';
import User from '../models/User';
import { Error } from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        await user.save();
        res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
        }
        next(error);
    }
});

export default usersRouter;