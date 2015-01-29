module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        buildFolder: '<%= grunt.option("buildFolder") %>',
        clean: {
            all: 'build/',
            'styles-app': '<%= buildFolder %>/styles/css/',
            fonts: '<%= buildFolder %>/styles/fonts/',
            'scripts-app': '<%= buildFolder %>/scripts/app/'
        },
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            dist: {
                NODE_ENV: 'distribution'
            }
        },
        cssmin: {
            'styles': {
                files: {
                    '<%= buildFolder %>/styles/css/styles.min.css': ['styles/css/*.css']
                }
            }
        },
        uglify: {
            app: {
                files: {
                    '<%= buildFolder %>/scripts/app.min.js': ['scripts/*.js']
                }
            }
        },
        concat: {
            'scripts-app-min': {
                files: {
                    '<%= buildFolder %>/scripts/app.min.js': ['scripts/*.min.js']
                }
            }
        },
        copy: {
            'styles-app': {
                files: [
                    {
                        expand: true,
                        cwd: 'styles/css/',
                        src: '**/*',
                        dest: '<%= buildFolder %>/styles/css/'
                    }
                ]
            },
            'scripts-app': {
                files: [
                    {
                        expand: true,
                        cwd: 'scripts/',
                        src: '**/*',
                        dest: '<%= buildFolder %>/scripts/'
                    }
                ]
            },
            'fonts-app': {
                files: [
                    {
                        expand: true,
                        cwd: 'styles/fonts/',
                        src: '**/*',
                        dest: '<%= buildFolder %>/styles/fonts/'
                    }
                ]
            },
            'styles-img-app': {
                files: [
                    {
                        expand: true,
                        cwd: 'styles/img/',
                        src: '**/*',
                        dest: '<%= buildFolder %>/styles/img/'
                    }
                ]
            },
            'img-app': {
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: '**/*',
                        dest: '<%= buildFolder %>/img/'
                    }
                ]
            }
        },
        preprocess: {
            index: {
                src: 'index.html',
                dest: '<%= buildFolder %>/index.html'
            }
        },
        watch: {
            options: {
                spawn: false
            },
            'styles-app': {
                files: 'styles/css/*.css',
                tasks: ['clean:styles-app', 'copy:styles-app']
            },
            'scripts-app': {
                files: 'scripts/app/**/*',
                tasks: ['copy:scripts-app']
            },
            index: {
                files: 'index.html',
                tasks: 'preprocess'
            }
        }

    });

    // Load the plugins that provide tasks
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Registering tasks
    grunt.registerTask('development', ['clean:all', 'env:dev', 'preprocess', 'copy']);
    grunt.registerTask('distribution', ['clean:all', 'env:dist', 'uglify', 'preprocess', 'cssmin']);

    var setBuildFolder = function (folderName) {
        grunt.option('buildFolder', 'build/' + folderName);
    };

    grunt.registerTask('dev', 'Main task for development', function () {   /* Run this task - 'grunt dev' */
        setBuildFolder('app-full');
        grunt.task.run('development');
        grunt.task.run('watch');
    });

    grunt.registerTask('dist', 'Main task for production, to create minified app', function () {   /* Run this task - 'grunt dist' */
        setBuildFolder('app');
        grunt.task.run('distribution');
        grunt.task.run('watch');
    });

};