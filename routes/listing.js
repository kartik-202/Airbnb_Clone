const express=require("express");
const router=express.Router();
const wrapAsync=require("../util/wrapAsync");
const {isloggedin, isowner,validatelisting}=require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer=require("multer");
const {cloudinary,storage}=require("../cloudconfig.js");
const upload=multer({storage});

router.get("/listings",wrapAsync(listingController.index)); 

router.get("/listing/new",isloggedin,listingController.renderNewForm);

router.get("/listings/:id",wrapAsync(listingController.showListing));

router.post("/listings",isloggedin,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.CreateListing)
);

router.get("/listing/:id/edit",isloggedin,wrapAsync(listingController.Editlisting));

router.put("/listing/:id",isowner,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.UpdateListing));

router.delete("/listing/:id",isloggedin,isowner,wrapAsync(listingController.Destroylisting))

module.exports=router;