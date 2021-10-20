const form = document.forms.uploadForm;
const inputName = form.elements.inputName;
const videoFile = form.elements.video;

const settingVideoName = () => {
    let fileName = videoFile.value;
    inputName.value = fileName;
}

videoFile.addEventListener("change", settingVideoName);