const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    Image: {
        url:String,
        filename:String,
    },
    price: Number,
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category:{
        type:String,
        enum:["Trending","Rooms","Mountains","Castles","Beach","Cabin","LakeFront","Farm","Amazingview"],
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.review } });
    }
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
