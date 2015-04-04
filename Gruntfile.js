var path = require("path");

module.exports = function (grunt) {
  require("load-grunt-tasks")(grunt);

  var INPUT_PATH = "./app/main.js";
  var OUTPUT_PATH = "./dist/js/app.js";

  grunt.registerTask("app", "concurrent:app");
  grunt.registerTask("release", ["browserify:release", "exorcise", "uglify:release"]);

  grunt.initConfig({
    connect: {
      app: {
        options: {
          port: 3000,
          keepalive: true,
          base: path.join(__dirname, "public")
        }
      }
    },
    concurrent: {
      app: {
        tasks: ["browserify:watch_app", "connect:app"],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    browserify: {
      release: browserifyOptions({
        debug: true
      }),
      watch: browserifyOptions({
        watch: true,
        debug: true
      }),
      watch_app: browserifyOptions({
        watch: true,
        debug: true,
        src: "./app/main.js",
        dest: "./public/js/app.js"
      }),
    },
    exorcise: {
      bundle: {
        files: {
          "./public/js/app.map": [OUTPUT_PATH]
        }
      }
    },
    uglify: {
      release: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true,
          sourceMapIn: "public/js/app.map"
        },
        files: {
          "public/js/app.min.js": ["public/js/app.js"]
        }
      }
    }
  });

  function browserifyOptions(options) {
    options || (options = {});

    return {
      src: [options.src || INPUT_PATH],
      dest: options.dest || OUTPUT_PATH,
      options: {
        watch: !!options.watch,
        keepAlive: !!options.watch,
        browserifyOptions: {
          debug: !!options.debug
        }
      }
    };
  }
};
