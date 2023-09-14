class ReadGeoJson {
  constructor(fs) {
    this._fs = fs.promises;
  }

  async execute(filePath) {
    try {
      const data = await this._fs.readFile(filePath, "utf8");
      const geojsonData = JSON.parse(data);
      return geojsonData;
    } catch (error) {
      console.error('There was a problem reading the .geojson file:', error);
    }
  }
}

module.exports = ReadGeoJson;