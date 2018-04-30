# install

$ yarn

# launch server

$ yarn start

# run seeds

seed

git push heroku master

mongoexport -d animation-catalog -c director --out director.json
mongoimport -h ds115579.mlab.com:15579 -d animation-catalog -c director -u storonaot -p Durkheim13579 --file director.json

mongoexport -d animation-catalog -c country --out country.json
mongoimport -h ds115579.mlab.com:15579 -d animation-catalog -c country -u storonaot -p Durkheim13579 --file country.json

mongoexport -d animation-catalog -c language --out language.json
mongoimport -h ds115579.mlab.com:15579 -d animation-catalog -c language -u storonaot -p Durkheim13579 --file language.json

mongoexport -d animation-catalog -c serial --out serial.json
mongoimport -h ds115579.mlab.com:15579 -d animation-catalog -c serial -u storonaot -p Durkheim13579 --file serial.json

mongoexport -d animation-catalog -c studio --out studio.json
mongoimport -h ds115579.mlab.com:15579 -d animation-catalog -c studio -u storonaot -p Durkheim13579 --file studio.json

mongoexport -d animation-catalog -c videoformat --out videoformat.json
mongoimport -h ds115579.mlab.com:15579 -d animation-catalog -c videoformat -u storonaot -p Durkheim13579 --file videoformat.json
