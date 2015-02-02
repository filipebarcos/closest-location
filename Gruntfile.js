'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
       main: {
        expand: true,
        cwd: 'app/',
        src: '*.html',
        dest: 'public/',
        flatten: true,
      }
    },
    connect: {
      server: {
        options: {
          base: 'public',
          port: 3000,
          hostname: '*',
        },
      },
    },
    sass: {
      dist: {
        files: {
          'public/stylesheet/main.css': 'app/assets/sass/main.sass'
        },
      },
    },
    uglify: {
      development: {
        options: { beautify: true },
        files: [{
          expand: true,
          cwd: 'app/assets/javascripts',
          src: '**/*.js',
          dest: 'public/javascripts',
        }],
      },
      production: {
        options: { beautify: false },
        files: [{
          expand: true,
          cwd: 'app/assets/javascripts',
          src: '**/*.js',
          dest: 'public/javascripts',
        }],
      },
    },
    watch: {
      css: {
        files: 'app/assets/stylesheet/**/*.sass',
        tasks: ['sass'],
      },
      scripts: {
        files: 'app/assets/javascripts/**/*.js',
        tasks: ['uglify:development'],
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'uglify:development',
    'sass',
    'copy',
    'connect:server',
    'watch'
  ]);
};
