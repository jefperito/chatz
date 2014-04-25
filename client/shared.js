//Start off by initializing a new context.
var context = new(window.AudioContext || window.webkitAudioContext)();

if (!context.createGain)
    context.createGain = context.createGainNode;
if (!context.createDelay)
    context.createDelay = context.createDelayNode;
if (!context.createScriptProcessor)
    context.createScriptProcessor = context.createJavaScriptNode;

// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
    };
})();


function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source[source.start ? 'start' : 'noteOn'](time);
}

function loadSounds(obj, soundMap, callback) {
    // Array-ify
    var names = [];
    var paths = [];
    for (var name in soundMap) {
        var path = soundMap[name];
        names.push(name);
        paths.push(path);
    }
    bufferLoader = new BufferLoader(context, paths, function(bufferList) {
        for (var i = 0; i < bufferList.length; i++) {
            var buffer = bufferList[i];
            var name = names[i];
            obj[name] = buffer;
        }
        if (callback) {
            callback();
        }
    });
    bufferLoader.load();
}

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