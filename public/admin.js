




let btn = document.getElementById('showImage');

function setImage(){
    let imageFile = document.getElementById('fle').value;
    console.log(imageFile)
    let imageSrc = document.getElementById('img');
    imageSrc.src = imageFile;
}
btn.onclick = setImage();