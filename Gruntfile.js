/* ----------------------------------------------------------------------
 * Grunt
 *
 * 開発開始手順
 * $ npm install
 * $ grunt
 *
 * 開発watch,connectコマンド
 * $ grunt w
 *
 ---------------------------------------------------------------------- */

module.exports = function (grunt) {

  // manage
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
  });


  // process
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // clean: ['<%= path.build %>'],

    watch: {
      html: {
        files: ['sprite_sheet.html', 'sprite_sheet_builder.html']
      },
      css: {
        files: ['css/style.css']
      },
      js: {
        files: ['js/sprite_sheet.js', 'js/sprite_sheet_builder.js']
      },
      options: {
        livereload: true
      }
    },

    connect: {
      server: {
        options: {
          port: 1108
        }
      }
    }

  });

  grunt.registerTask('w', ['connect', 'watch']);

};
