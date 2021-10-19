const uploadName = document.getElementsByClassName("upload__name");
const videoFile = document.querySelector("input[type=file]");

const settingVideoName = () => {
    var fileName = videoFile.value;
    console.log(fileName, uploadName);
    uploadName.value = fileName;
}

videoFile.addEventListener("change", settingVideoName);