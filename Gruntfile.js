'use strict';

module.exports = function(grunt) {
  
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({


    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'lib*',
        'test*',
      ]
    },
  });

  grunt.registerTask('default', [
    'jshint'
  ]);
  // // A very basic default task.
  // grunt.registerTask('default', 'Log some stuff.', function() {
  //   grunt.log.write('Logging some stuff...').ok();
  // });

};