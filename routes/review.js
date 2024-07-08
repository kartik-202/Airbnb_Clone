const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../util/wrapAsync");


const { isloggedin,validateReview,reviewAuthor} = require("../middleware.js");
const listingController=require("../controllers/review.js");

router.post("/",isloggedin,validateReview, wrapAsync(listingController.CreatenewReview));

router.delete("/:reviewId",isloggedin,reviewAuthor,
    wrapAsync(listingController.DestroyReview)  
)

module.exports=router;