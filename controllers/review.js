const listing = require("../models/listing");

const Review = require("../models/Review");

module.exports.CreatenewReview=async(req, res) => {
    try {
        let listings = await listing.findById(req.params.id); 
        if (!listings) {
            return res.status(404).send('Listing not found');   
        }
        let newReview = new Review(req.body.review);
        newReview.author=req.user._id;
        listings.review.push(newReview);
        await newReview.save();
        await listings.save();
        req.flash("success","new review created");
        res.redirect(`/listings/${listings._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); 
    }
}

module.exports.DestroyReview=async(req,res)=>{
    let{id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","new review deleted");
    res.redirect(`/listings/${id}`);
}