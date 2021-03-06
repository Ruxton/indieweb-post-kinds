module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    wp_deploy: {
        deploy: { 
            options: {
                plugin_slug: 'indieweb-post-kinds',
                svn_user: 'dshanske',  
                build_dir: 'build/trunk' //relative path to your build directory
                
            },
        }
    },
 copy: {
           main: {
               options: {
                   mode: true
               },
               src: [
                   '**',
                   '!node_modules/**',
                   '!build/**',
                   '!.git/**',
                   '!Gruntfile.js',
                   '!package.json',
                   '!.gitignore',
		   '!kind.css.map',
		   '!kind.min.css.map'
               ],
               dest: 'build/trunk/'
           }
       },

    wp_readme_to_markdown: {
      target: {
        files: {
          'readme.md': 'readme.txt'
        }
      },
      options: {
        screenshot_url: 'https://ps.w.org/indieweb-post-kinds/trunk/{screenshot}.png'
      }
     },
    sass: {                              // Task
       dev: {                            // Target
         options: {                       // Target options
             style: 'expanded'
             },
          files: {                         // Dictionary of files
        'css/kind.css': 'sass/main.scss',       // 'destination': 'source'
         }
	},
       dist: {                            // Target
         options: {                       // Target options
             style: 'compressed'
             },
          files: {                         // Dictionary of files
        'css/kind.min.css': 'sass/main.scss',       // 'destination': 'source'
        'css/kind.admin.min.css': 'sass/admin.scss',       // 'destination': 'source'
        'css/kind.themecompat.min.css': 'sass/themecompat.scss',       // 'destination': 'source'

         }
	}
  },

	svgstore: {
		options: {
			prefix : '', // Unused by us, but svgstore demands this variable
			cleanup : ['style', 'fill', 'id'],
			svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
				viewBox : '0 0 24 24',
				xmlns: 'http://www.w3.org/2000/svg'
			},
		},
		dist: {
				files: {
					'includes/kind-sprite.svg': ['svgs/*.svg']
				}
		}
	},

   makepot: {
        target: {
            options: {
		mainFile: 'indieweb-post-kinds.php', // Main project file.
                domainPath: '/languages',                   // Where to save the POT file.
                potFilename: 'post_kinds.pot',
                type: 'wp-plugin',                // Type of project (wp-plugin or wp-theme).
            exclude: [
                'build/.*'
            ], 
               updateTimestamp: true             // Whether the POT-Creation-Date should be updated without other changes.
            	}
            }
      },
  });

  grunt.loadNpmTasks('grunt-wp-readme-to-markdown');
  grunt.loadNpmTasks( 'grunt-wp-i18n' );
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-wp-deploy');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks( 'grunt-git' );
  // Default task(s).
  grunt.registerTask('default', ['wp_readme_to_markdown', 'makepot', 'sass', 'svgstore']);

};
