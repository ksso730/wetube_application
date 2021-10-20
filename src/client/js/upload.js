// import ffmpeg from "ffmpeg";

const form = document.forms.uploadForm;
const inputName = form.elements.inputName;
const videoFile = form.elements.video;

let fileName;

const settingVideoName = () => {
    fileName = videoFile.value;
    inputName.value = fileName;
}

const exportImg = () => {
    // const imgDir = 'uploads/images';
    // new ffmpeg( fileName, (err, video) => {
    //     if(!err){
    //         console.log(video.metadata);


    //     }
    // });

}

videoFile.addEventListener("change", settingVideoName);
// videoFile.addEventListener("change", exportImg);