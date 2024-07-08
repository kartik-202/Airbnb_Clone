const User=require("../models/user.js");

module.exports.RenderSignup=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.Signup=async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome");
            return res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", "signup failed try again");
        return res.redirect("/signup");
    }
}

module.exports.RenderLogin=(req,res)=>{
    res.render("./users/login.ejs");
}

module.exports.Login=async(req,res)=>{
    req.flash("success","welcome u r logged in");
    const redirect=res.locals.redirectUrl;
    if(redirect){
    res.redirect(redirect);
    }else{
        res.redirect("/listings");
    }
}

module.exports.Logout=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out")
        res.redirect("/listings");
    })
}