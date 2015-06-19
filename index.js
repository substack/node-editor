var spawn = require('child_process').spawn;
var _ = require('underscore');
var async = require('async');
var Error = require ("errno-codes");

module.exports = function (file, opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }
    if (!opts) opts = {};

    var asyncTasks = [];
    var edInvoked = false;
    var wellKnownEditors = opts.editors || [];

    var editor = opts.editor || process.env.VISUAL || process.env.EDITOR;

    if( editor ){
      wellKnownEditors.push(editor)
    }

    if(/^win/.test(process.platform)){
      wellKnownEditors = wellKnownEditors.concat(['start notepad++', 'notepad'])
    } else {
      wellKnownEditors = wellKnownEditors.concat(['vim', 'vi', 'pico', 'nano'])
    }

    _.uniq(wellKnownEditors).forEach(function(ed){
      asyncTasks.push(function invokeEditor(then){
        if(edInvoked) return then();

        var args = ed.split(/\s+/);
        var bin = args.shift();

        var ps = spawn(bin, args.concat([ file ]), { stdio: 'inherit' });

        ps.on('error', function () {
          ps.removeAllListeners('exit');
          then();
        });

        ps.on('exit', function (code, sig) {
          edInvoked = true;
          if (typeof cb === 'function') cb(code, sig)
          then();
        });

      });
    });
    async.series(asyncTasks, function allTested(){
      if(!edInvoked){
        if (typeof cb === 'function') cb(Error.get (Error.ENOENT))
      }
    });
};
