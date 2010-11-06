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
 * #### Compiler configuration options
 *
 *  The `config` object may contain the following properties:
 *  - `level`: {String} The compilation level.  One of "whitespace", 
 *     "simple", or "advanced".  Default is "simple".
 *  - `warnings`: {String} The warning level.  One of "quiet", "default", or 
 *     "verbose".  Default is "default".
 *  - `debug`: {Boolean} Run compiler in debug mode.
 *
 * @param {Object} options compiler options
 * @returns {Object} a new compiler instance
 */
function Compiler(config) {
    config = config || {};
    
    // porting from AbstractCommandLineRunner::doRun
    // TODO: deal with logging level
    
    // TODO: deal with list of externals
    var externs = ImmutableList.of(jscomp.JSSourceFile.fromCode("/dev/null", ""));
    
    // TODO: deal with error stream
    var compiler = new jscomp.Compiler();
    
    // assemble compiler options
    var options = new jscomp.CompilerOptions();
    
    // set compilation level
    var level = levels[options.level] || levels.simple;
    options.setCodingConvention(new jscomp.ClosureCodingConvention());
    level.setOptionsForCompilationLevel(options);

    if (config.debug) {
        level.setDebugOptionsForCompilationLevel(options);
    }
    
    var warningLevel = warnings[options.warnings] || levels["default"];
    warningLevel.setOptionsForWarningLevel(options);

    // TODO: handle formatting options
    // TODO: handle closure primitives
    
    var modules = null;
    var results;
    
    // TODO: deal with run options
    
    this.compile = function() {
    }
    
}
exports.Compiler = Compiler;
