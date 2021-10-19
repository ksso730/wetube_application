import { render } from "pug"
import Video from "../models/Video";

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

    const {path: fileUrl} = req.file;
    console.log(req.file);
    
    const { title, description, hashtags} = req.body;
    console.log(title, description, hashtags);
    
    // const newVideo = await Video.create({
    //     title,
    //     description,
    //     fileUrl,
    //     hashtags: Video.formatHash(hashtags)

    // });
    return res.redirect("/");
}