const listing=require("../models/listing");

module.exports.index=async (req,res)=>{
    const alllistings=await listing.find({});
    res.render("listings.ejs",{alllistings});
    };

module.exports.renderNewForm=(req,res)=>{ 
    res.render("new.ejs");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const Listing=await listing.findById(id).populate({path:"review" , populate:{path:"author"},}).populate("owner");
    res.render("show.ejs",{Listing});
}

module.exports.CreateListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let newListing=new listing(req.body.listing);
    newListing.Image={url,filename}; 
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
  
}

module.exports.Editlisting=async(req,res)=>{
    let {id}=req.params;
    let Listing =await listing.findById(id);
    let originalImageUrl=Listing.Image.url;
    let replacedImage=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("edit.ejs",{Listing,replacedImage});
}

module.exports.UpdateListing=async(req,res)=>{
    let {id}=req.params;
    let FoundListing=await listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        FoundListing.Image={url,filename};
        await FoundListing.save();        
    }
    req.flash("success","listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.Destroylisting=async(req,res)=>{
    let{id}=req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","listing deleted");
    res.redirect("/listings");
}