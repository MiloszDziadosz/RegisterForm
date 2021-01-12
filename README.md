W głównym katalogu repozytorium (register_form) uruchom komendę npm install aby zainstalować wszystkie niezbędne zależności. Wszystkie zależności potrzebne do wykonania egzaminu są wprowadzone do pliku package.json dlatego wytarczy uruchomić komendę npm install.

Aby uruchomić projekt, należy po instalacji, wpisać w terminalu npm start. Projekt uruchomi serwer deweloperski.

Jeżeli podczas uruchomienia komendy npm start pojawi się komunikat: Error: listen EADDRINUSE: address already in use, należy zmienić wartość klucza port w pliku webpack.config.js, np. na 3002 i uruchomić serwer ponownie (npm start). 