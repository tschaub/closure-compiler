var assert = require("assert")

var google = Packages.com.google;
var jscomp = google.javascript.jscomp;
var ImmutableList = google.common.collect.ImmutableList;

var levels = {
    whitespace: jscomp.CompilationLevel.WHITESPACE_ONLY,
    simple: jscomp.CompilationLevel.SIMPLE_OPTIMIZATIONS,
    advanced: jscomp.CompilationLevel.ADVANCED_OPTIMIZATIONS
};

var warnings = {
    quiet: jscomp.WarningLevel.QUIET,
    "default": jscomp.WarningLevel.DEFAULT,
    verbose: jscomp.WarningLevel.VERBOSE
};

exports["test: basic compilation"] = function() {
    
    var compiler = new jscomp.Compiler();
    
    // assemble compiler options
    var options = new jscomp.CompilerOptions();
    options.setCodingConvention(new jscomp.ClosureCodingConvention());

    // set compilation level
    levels.simple.setOptionsForCompilationLevel(options);
    
    // assemble externs
    var externs = ImmutableList.of(
        jscomp.JSSourceFile.fromCode("extern.js", "")
    );
    
    // assemble inputs
    var inputs = ImmutableList.of(
        jscomp.JSSourceFile.fromCode("input.js", "alert('hello')")
    );
    
    // compile
    var result = compiler.compile(externs, inputs, options);
    var out = compiler.toSource();
    
    assert.strictEqual(out, "alert('hello')", "basic compilation works");
    
}

if (require.main == module.id) {
    require("test").run(exports);
}
