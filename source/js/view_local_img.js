function viewLocalImg(fileId, imgId){
    return function(){
        document.getElementById(fileId).onchange = function(evt) {
            // 如果浏览器不支持FileReader，则不处理
            if (!window.FileReader) return;
            var files = evt.target.files;
            for (var i = 0, f; f = files[i]; i++) {
                if (!f.type.match('image.*')) {
                    continue;
                }
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {
                        // img 元素
                        document.getElementById(imgId).src = e.target.result;
                    };
                })(f);
                reader.readAsDataURL(f);
            }
        }
    };
}





