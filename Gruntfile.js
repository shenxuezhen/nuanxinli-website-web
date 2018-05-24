module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		less: {
			development: {
				options: {
					compress: true
				},
				files: {
					"dist/css/nuanxinli.min.css": ["source/less/**/*.less"]
				}
			}
		},
		concat: {
			build: {
				src: ["source/js/getCookie.js",
					"source/js/preloading_images.js",
					"source/js/view_local_img.js",
					"source/js/event.js",
					"source/js/main.js",
					"source/js/loginAndRegister.js"],
				dest: "dist/js/nuanxinli.js"
			}
		},
		uglify: {
			build:{
				src: "dist/js/nuanxinli.js",
		        dest:"dist/js/nuanxinli.min.js"
			}
		},
		copy: {
			img: {
				files: [{
					expand: true,
					cwd: "./source/img/",
					src: "**/*",
					dest: "./dist/img/"
				}]
			},
			html: {
				files:[{
					expand: true,
					cwd: "./source/page/",
					src: "**/*",
					dest: "./dist/page/"
				}]
			},
			lib: {
				files:[{
					expand: true,
					cwd: "./source/lib/",
					src: "**/*",
					dest: "./dist/lib/"
				}]
			}
		},
		clean: {
			img: {
				src: ["./dist/img"]
			},
			html: {
				src: ["./dist/page"]
			},
			lib: {
				src: ["./dist/lib"]
			}
		},
		watch: {
			css: {
				files: ["source/less/**/*.less"],
				tasks: ["less"]
			},
			js: {
				files: ["source/js/**/*.js"],
				tasks: ["concat"]
			},
			img_copy: {
				options:{
					event: "added"
				},
				files: ["source/img/**/*"],
				tasks: ["copy:img"]
			},
			img_del: {
				options:{
					event: "deleted"
				},
				files: ["source/img/**/*"],
				tasks: ["clean:img", "copy:img"]
			},
			html_copy: {
				options:{
					event: ["added", "changed"]
				},
				files: ["source/page/**/*"],
				tasks: ["copy:html"]
			},
			html_del: {
				options:{
					event: "deleted"
				},
				files: ["source/page/**/*"],
				tasks: ["clean:html", "copy:html"]
			},
			lib_copy: {
				options:{
					event: ["added", "changed"]
				},
				files: ["source/lib/**/*"],
				tasks: ["copy:lib"]
			},
			lib_del: {
				options:{
					event: "deleted"
				},
				files: ["source/lib/**/*"],
				tasks: ["clean:lib", "copy:lib"]
			},
			build_js: {
				files: ["dist/js/nuanxinli.js"],
				tasks: ["uglify"]
			}
		},
		filerev: {
			options: {
				algorithm: "md5",
				length: 8
			},
			js_css: {
				src: ["./dist/css/*.min.css", "./dist/js/*.min.js"]
			}
		},
		usemin: {
			html: "./dist/page/**/*.html",
			options: {
				//assetsDirs: ["dist"],


				patterns: {
					html: [
						[/\.\.\/js\/(\w+\.js)/gm, "replace js"],
						[/\.\.\/css\/(\w+\.css)/gm, "replace css"]
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-filerev');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ["watch"]);
	grunt.registerTask('dev', ["filerev", "usemin"]);
};