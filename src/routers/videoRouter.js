import express from "express";
import { getEdit, getUpload, postEdit, postUpload, watch, deleteVideo } from "../controllers/videoConroller";


const videoRouter = express.Router();

videoRouter.route("/upload")
.get(getUpload)
.post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);
    // .get(deleteVideo);
// .all(protectorMiddleware)

export default videoRouter;