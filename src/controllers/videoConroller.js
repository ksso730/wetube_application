import { render } from "pug"
import Video from "../models/Video";
import { videoUpload } from "../middleware";
import multer from "multer";

export const home = (req, res) => {
    return res.render("home", {pageTitle: "Home"});
}

export const watch = (req, res) => {
    return res.render("watch", {pageTitle: "Watch"});
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
}

export const postUpload = async(req, res) => {
    const upload = videoUpload.single("video");
    let next = false;
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError){
            return res.status(500).render("upload", {
                pageTitle: "Upload Video",
                errorMsg: `😓 Upload Failed: ${err.message}`,
            });
        }else if (err){
            return res.status(500).render("upload", {
                pageTitle: "Upload Video",
                errorMsg: `😓 Upload Failed: ${err}`,
            });
        }
        next = true;
    });
    if (next){
        const {path: fileUrl} = req.file;
        const { title, description, hashtags} = req.body;
        try{
            const newVideo = await Video.create({
                title,
                description,
                fileUrl,
                hashtags: Video.formatHash(hashtags)
            });
            newVideo.save();
            alert("Upload Success!");
        }catch (error){
            console.log(error);
            return res.status(400).render("upload", {
                pageTitle: "Upload Video",
                errorMsg: `😓 Upload Failed: ${error.message}`,
            });
        }
        return res.redirect("/");
    }

}