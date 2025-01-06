import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: {
        type: String,
        required: true
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;