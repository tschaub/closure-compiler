var assert = require("assert");
var closure = require("ringo/closure");

var input = getResource("./closure/input.js").content;

function compileTest(msg, config, path) {
    return function() {
        var out = closure.compile(config);
        var expected = getResource(path).content;    
        assert.strictEqual(out, expected, msg);        
    }
}

exports["test: compile"] = compileTest(
    "default configuration", input, "./closure/output_simple.js"
);

exports["test: compile(whitespace)"] = compileTest(
    "whitespace only", {code: input, level: "whitespace"}, "./closure/output_whitespace.js"
);

exports["test: compile(advanced)"] = compileTest(
    "advanced level", {code: input, level: "advanced"}, "./closure/output_advanced.js"
);

if (require.main == module.id) {
    require("test").run(exports);
}
