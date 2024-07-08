const listing=require("./models/listing");
const Review=require("./models/Review");
const {listingSchema,reviewSchema}=require("./ErrorSchema");
const ExpressError=require("./util/ExpressError");

module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","user not logged in");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isowner=async(req,res,next)=>{
    let {id}=req.params;
    let Listing=await listing.findById(id);
    if(!Listing.owner.equals(res.locals.Curruser._id)){
        req.flash("error","not the owner");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.reviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.Curruser._id)){
        req.flash("error","not the author");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validatelisting=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        const imageError=error.details.map((el)=>el.path[0]==='image');
        if (imageError) {
            req.body.listing.image="defaultImage.jpg";
            next();
        }
        else{
        throw new ExpressError(400,errmsg);
    }}
    else{
        next();
    }
}
module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");   
        throw new ExpressError(400,errmsg);
    }
    else{
        next();
    }
}
