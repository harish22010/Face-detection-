//@Author of this project = "Harish"

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
  faceapi.nets.faceExpressionNet.loadFromUri('models')
  
]).then(uploadImage)


function uploadImage(){
  const con = document.querySelector('.container');
  const imgFile = document.querySelector("#myFile");
  const input = document.querySelector('#myImg');
  var can;
  var img;
  imgFile.addEventListener('change',async()=>{
    if (can) {can.remove();}
    if (img) {img.remove();}
  
    img = await faceapi.bufferToImage(imgFile.files[0]);
    input.src = img.src;
    const results = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors().withFaceExpressions()
    
    can = faceapi.createCanvasFromMedia(input);
    con.append(can);
    const dim = {width: input.width, height: input.height}
    
    faceapi.matchDimensions(can,dim);
    const detection = faceapi.resizeResults(results,dim);
    faceapi.draw.drawDetections(can,detection);
    faceapi.draw.drawFaceExpressions(can, detection);
  })
}
