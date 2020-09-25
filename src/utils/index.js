export const compressImg = (files,pType, ratio) => {//压缩
  return new Promise( (resolve, reject) => {
    var [can, reader] = [document.createElement( 'canvas' ), new FileReader()];
    var canTxt = can.getContext( '2d' ),pressType=pType==='quality';
    var typeList=['image/png','image/jpeg','image/webp'];
      reader.readAsDataURL( files );
      reader.onloadend = (e) => {
        var oImg = new Image();
        oImg.crossOrigin = '';
        oImg.onload = () => {
          can.width =pressType ? oImg.width : oImg.width *ratio;
          can.height = pressType ? oImg.height : oImg.height*ratio;
          canTxt.drawImage( oImg, 0, 0, can.width, can.height )
          can.toBlob( (blob) => {
            resolve( blob)
          } ,files.type,pressType ? ratio : 0.92)
        };
        oImg.src = reader.result;
      }
      reader.onerror = (err) => {
        reject( err )
      }
  } )
}
export const resetToblob=()=>{
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        var canvas = this;
        setTimeout(function() {
          var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] );
          var len = binStr.length;
          var arr = new Uint8Array(len);

          for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }

          callback(new Blob([arr], { type: type || 'image/png' }));
        });
      }
    });
  }
}
