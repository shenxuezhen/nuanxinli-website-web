(function(doc, exports){
    exports.preloadingImages = function(images){
        var i,
            img,
            images = images || [];
        for(i = 0; i < images.length; i++){
            img = new Image();
            img.src = images[i];
        }
    };
})(document, this);