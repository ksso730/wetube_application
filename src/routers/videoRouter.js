import express from "express";
import { getUpload, postUpload, watch } from "../controllers/videoConroller";


const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/upload")
    .get(getUpload)
    .post(postUpload);

export default videoRouter;