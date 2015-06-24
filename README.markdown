editors
======

attempts to launch a text editor in your program, lookup for $VISUAL || $EDITOR, but knows a little more :)

example
=======

``` js
var editor = require('editors');
editor('beep.json', function (code, sig) {
    console.log('finished editing with code ' + code);
});

var opts = {
    editor: 'vim',
    editors: ['vim', 'vi', 'gedit']
};
editor('beep.json', function (code, sig) {
    console.log('finished editing with code ' + code); // code => 0
});
```
methods
=======

``` js
var editor = require('editors')
```

editor(file, opts={}, cb)
-------------------------

Launch the `opts.editor` || `$VISUAL` || `$EDITOR` for `file`.

Fallback to a list of well known editors for linux, windows platforms.

When the first editor exits without throwing a startup error, `cb(code, sig)` fires.

install
=======

With [npm](http://npmjs.org) do:

```
npm install editors
```

todo
=======

- mac, freebsd and all others deserves compatibility. Feel free to issue about your system with some suggestions.

notes
=======

Forked from substack/editor to improve it.

license
=======

MIT
