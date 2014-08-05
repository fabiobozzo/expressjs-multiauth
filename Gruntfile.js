module.exports = function(grunt) {
    grunt.initConfig({

        less: {
            production: {
                options: {
                    paths: ["public/less"],
                    cleancss: true
                },
                files: {"public/stylesheets/build.css": "public/less/all.less"}
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.registerTask('default', ['less']);
};
