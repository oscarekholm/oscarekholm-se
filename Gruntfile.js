module.exports = function(grunt) {

	var mainBanner = '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n';

	grunt.initConfig({

		pkg : grunt.file.readJSON('package.json'),

		compass : {
			production : {
				options: {
					sassDir : 'src/css',
					cssDir : 'production/css',
					imagesDir : 'src/img',
					javascriptsDir : 'src/js',
					fontsDir : 'src/fonts',
					outputStyle : 'expanded'
				}
			}	
		},

		concat : {
			production : {
				src : [ 'src/js/oscarekholm-se-main.js'],
				dest : 'production/js/<%= pkg.name %>.js'
			}	
		},
	
		copy : {
			main : {
				files : [
					{ expand : true, cwd : 'src/img/', src : [ '**' ], dest : 'production/img/' },
					{ expand : true, cwd : 'src/js/libs', src : [ '**' ], dest : 'production/js/libs' },
					{ expand : true, cwd : 'src/', src : 'index.html', dest : 'production/' }
				]
			}
		},

		cssmin : {
			dev : {
				options : {
					banner : mainBanner
				},
				minify : {
					expand : true,
					cwd : 'production/css/',
					src : [ '*.css', '!*.min.css' ],
					dest : 'production/css/',
					ext : '.min.css'
				}
			},
			production : {
				options : {
					banner : mainBanner
				},
				files : {
					'production/css/<%= pkg.name %>.min.css': ['production/css/**/*.css']
				}
			}
		},

		htmlmin : {
			production : {
				options : {
					removeComments : true,
					collapseWhitespace : true
				},
				files : {
					'production/index.html' : 'production/index.html'
				}
			}	
		},

		jshint : {
			beforeconcat: [ 'src/js/oscarekholm-se-main.js' ]	
		},

		uglify : {
			options : {
				banner : mainBanner 
			},
			production : {
				files : {
					'production/js/<%= pkg.name %>.min.js' : [ '<%= concat.production.dest %>' ]
				}
			}
		},

		watch : {
			options: { 
				spawn : false
			},
			css : {
				files : 'src/css/**/*.scss',
				tasks : [ 'compass', 'cssmin' ]
			},
			scripts : {
				files : 'src/js/**/*.js',
				tasks : [ 'jshint', 'concat' ]
			},
			html : {
				files : 'src/index.html',
				tasks : [ 'copy' ]
			},
			livereload : {
				options : {
					livereload : 9001
				},
				files : [
					'<%= watch.css.files %>',
					'<%= watch.html.files %>',
					'<%= watch.scripts.files %>'
				]
			}
		}
	
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', [ 'compass', 'cssmin:dev', 'jshint', 'concat' ]);
	grunt.registerTask('produce', [ 'copy', 'compass', 'cssmin:production', 'jshint', 'concat', 'uglify', 'htmlmin' ]);
};
