var spawn = require('child_process').spawn;

module.exports = function (file, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    if (!opts) opts = {};
    
    var ed = /^win/.test(process.platform) ? 'notepad' : 'vim';
    var editor = opts.editor || process.env.VISUAL || process.env.EDITOR || ed;
    var args = editor.split(/\s+/);
    var bin = args.shift();

    setRaw(true);
    var ps = spawn(bin, args.concat([ file ]), { customFds : [ 0, 1, 2 ] });
    
    ps.on('exit', function (code, sig) {
        setRaw(false);
        process.stdin.pause();
        if (typeof cb === 'function') cb(code, sig)
    });
};

var tty = require('tty');
function setRaw (mode) {
    process.stdin.setRawMode ? process.stdin.setRawMode(mode) : tty.setRawMode(mode);
}
