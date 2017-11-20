var gulp = require('gulp'),
watch = require('gulp-watch');
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
        cssvars = require('postcss-simple-vars'),
        nested = require('postcss-nested'),
        cssImport = require('postcss-import'),
        broswerSync = require('browser-sync').create();

//task - 1st param is the name and 2nd is what we want it to do

gulp.task('default',function(){
    console.log('Gulp created');
});

gulp.task('html', function(){
    console.log('imagine something useful being done in html here');
});

gulp.task('styles', function(){
   return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
       .pipe(gulp.dest('./app/temp/styles'));
    
});

gulp.task('watch', function(){
    
    broswerSync.init({
        
        notify:false,
       server:{
           baseDir: "app"
       } 
    });
    
    watch('./app/index.html',function(){
        broswerSync.reload();
    });
    watch('./app/assets/styles/**/**.css',function(){
        gulp.start('cssInject');
    });
});


//styles task needs to complete before cssInject does
gulp.task('cssInject', ['styles'] , function(){
    return gulp.src('./app/temp/styles/styles.css')
    .pipe(broswerSync.stream());
});