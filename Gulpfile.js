var gulp = require('gulp'); // deklarujemy użycie paczki 'gulp' z node_modules, zainstalowanej z package.json, bądź manualnie
var sass = require('gulp-sass'); // deklarujemy użycie paczki 'gulp-sass' z node_modules, zainstalowanej z package.json, bądź manualnie
var browserSync = require('browser-sync').create(); // deklarujemy użycie paczki 'browser-sync' z node_modules, zainstalowanej z package.json, bądź manualnie
var sourcemaps = require('gulp-sourcemaps'); // deklarujemy użycie paczki 'gulp-sourcemaps' z node_modules, zainstalowanej z package.json, bądź manualnie

gulp.task('sass', function() { // tworzymy task o nazwie 'sass'
	return gulp.src('scss/**/*.scss') // zwracamy następującą sekwencję zadań: wskazujemy folder z plikami źródłowymi, gdzie Gulp ma zajrzeć
	.pipe(sourcemaps.init()) // inicjalizujemy sourcemapy
	.pipe(sass({ // uruchamiamy zadanie kompilujące SASS do CSS
		outputStyle: 'expanded' // w nawiasach klamrowych zawieramy opcjonalne dodatkowe ustawienia, w tym przypadku typ outputu - pełna lista tutaj: https://github.com/sass/node-sass#options
	}).on('error', sass.logError)) // w przypadku wystąpienia błędu, włączamy jego logowanie
	.pipe(sourcemaps.write()) // po pomyślnej kompilacji, na podstawie obu plików, źródłowego i skompilowanego, tworzymy source map
	.pipe(gulp.dest('css')) // zapisujemy skompilowany plik do podanego folderu
});

gulp.task('serve', ['sass'], function() { // tworzymy task o nazwie 'serve'

    browserSync.init({ // inicjalizujemy zadanie BrowserSync - sposób inicjalizacji rozmaitych narzędzi może się bardzo różnić, zawsze patrzymy do dokumentacji :)
        server: { // przekazujemy obiekt konfiguracyjny 'server' - wymagane
            baseDir: "./" // wskazujemy, z którego miejsca w naszym projekcie ma startować serwer - nie zawsze będzie to root, omówimy ciekawszą opcję na warszatach!
        }
    });

    gulp.watch('scss/**/*.scss', ['sass']).on('change', browserSync.reload); // ustawiamy watchera patrzącego na zmiany w plikach .scss w folderze 'scss' i jego subfolderach, w przypadku zmiany uruchamiamy automatycznie task o nazwie 'sass' i przeładowujemy przeglądarkę BrowserSynciem
    gulp.watch("**/*.html").on('change', browserSync.reload); // analogicznie, ustawiamy watchera patrzącego na zmiany w plikach .html gdziekolwiek w projekcie i uruchamiającego BrowserSynca w razie potrzeby - gdybyśmy używali jakiegokolwiek preprocessora do HTML (np. Jade lub HAML) - byłby tu również zadeklarowany, podobnie jak task 'sass' w watcherze wyżej 
});