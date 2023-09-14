const fs = require('fs');
const pool = require('./config/pool');

const ReadGeoJson = require('./service/ReadGeoJson');
const SaveGeoJson = require('./service/SaveGeoJson');


const main = async () => {
  const readGeoJson =  new ReadGeoJson(fs);
  const saveGeoJson = new SaveGeoJson(pool);

  const geojsonData = await readGeoJson.execute('./src/data/indonesia_villages_border.geojson');
  await saveGeoJson.saveToDatabase(...geojsonData);
  console.log("Selesai");
};

main();
