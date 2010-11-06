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

/**
 * Constructor for creating JavaScript compilers.
 *
 * #### Compiler configuration properties
 *
 *  The `config` object may contain the following properties:
 *  - `level`: {String} The compilation level.  One of "whitespace", 
 *     "simple", or "advanced".  Default is "simple".
 *  - `warnings`: {String} The warning level.  One of "quiet", "default", or 
 *     "verbose".  Default is "default".
 *  - `debug`: {Boolean} Run compiler in debug mode.
 *
 * @param {Object} config compiler configuration properties
 * @returns {Object} a new compiler instance
 */
function Compiler(config) {
    config = config || {};
    
    // TODO: deal with logging level
    jscomp.Compiler.setLoggingLevel(java.util.logging.Level.WARNING);

    // TODO: deal with error stream
    var compiler = new jscomp.Compiler();
    
    // assemble compiler options
    var options = new jscomp.CompilerOptions();
    options.setCodingConvention(new jscomp.ClosureCodingConvention());

    // set compilation level
    var level = levels[config.level] || levels.simple;
    level.setOptionsForCompilationLevel(options);

    if (config.debug) {
        level.setDebugOptionsForCompilationLevel(options);
    }
    
    var warningLevel = warnings[config.warnings] || warnings["default"];
    warningLevel.setOptionsForWarningLevel(options);

    // TODO: handle formatting options
    // TODO: handle closure primitives    
    // TODO: deal with run options
    // TODO: deal with output options
    // TODO: deal with modules
    
    this.compile = function(code) {

        // TODO: deal with list of externals
        var externs = ImmutableList.of(
            jscomp.JSSourceFile.fromCode("externs.js", "")
        );

        // TODO: deal wih inputs
        var inputs = ImmutableList.of(
            jscomp.JSSourceFile.fromCode("input.js", code)
        );

        var result = compiler.compile(externs, inputs, options);
        // TODO: deal with result
        
        return compiler.toSource();
    }
    
}

function compile(config) {
    if (typeof config === "string") {
        config = {code: config};
    }
    var compiler = new Compiler(config);
    return compiler.compile(config.code);
}

exports.Compiler = Compiler;
exports.compile = compile;
