exports["test: ringo/closure"] = require('./ringo/closure_test');

if (require.main == module.id) {
    require("test").run(exports);
}
