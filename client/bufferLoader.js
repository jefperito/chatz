function BufferLoader(context) {
    this.context = context;
 }

BufferLoader.prototype.loadBuffer = function(url, index, callback) {
    var self = this;
    var buffers = [];
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
        self.context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    callback('error decoding file data: ' + url);
                    return;
                }
                buffers[index] = buffer;
                if (buffers.length == self.urls.length) {
                    callback(null, buffers);
                }
            },
            function(error) {
                callback(error);
            }
        );
    };

    request.onerror = function() {
        callback('error loading the url ' + url);
    };

    request.send();
};

BufferLoader.prototype.load = function(urls, callback) {
    this.urls = urls;
    for (var i = 0; i < urls.length; ++i) {
        this.loadBuffer(urls[i], i, callback);
    }
};
