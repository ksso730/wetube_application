import { render } from "pug"
import Video from "../models/Video";
import { videoUpload } from "../middleware";
import multer from "multer";

export const home = async(req, res) => {
    const videos = await Video.find({}).sort({createdAt : "desc"});
    return res.render("home", {pageTitle: "Home", videos});
}

export const watch = async(req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", { pageTitle: "Video not found." });
    }
    return res.render("watch", {pageTitle: "Watch", video});
}

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle: "Upload Video"});
}

export const postUpload = async(req, res) => {
    const upload = videoUpload.single("video");
    upload(req, res, async function(err) {
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
        }catch (error){
            console.log(error);
            return res.status(400).render("upload", {
                pageTitle: "Upload Video",
                errorMsg: `😓 Upload Failed: ${error.message}`,
            });
        }
        return res.redirect("/");
    });

}


export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    // const {
    //     user: {_id}
    // } = req.session;
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    // if(String(video.owner) !== String(_id)){
    //     return res.status(403).redirect("/");
    // }
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = async(req, res) => {
    // const {
    //     user: {_id}
    // } = req.session;
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }

    // if(String(video.owner) !== String(_id)){
    //     req.flash("error", "Not authorized");
    //     return res.status(403).redirect("/");
    // }

    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHash(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async(req, res) => {
    // const {
    //     user: {_id}
    // } = req.session;

    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }

    // if(String(video.owner) !== String(_id)){
    //     return res.status(403).redirect("/");
    // }

    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};