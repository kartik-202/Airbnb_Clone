const express=require("express");
const router=express.Router();
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const listingController=require("../controllers/user.js");

router.get("/signup",listingController.RenderSignup);

router.post("/signup", wrapAsync(listingController.Signup));


router.get("/login",listingController.RenderLogin);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),
wrapAsync(listingController.Login));

router.get("/logout",listingController.Logout);

module.exports=router;