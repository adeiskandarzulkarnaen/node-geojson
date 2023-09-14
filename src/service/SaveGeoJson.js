class SaveGeoJson {
  constructor(pool) {
    this._pool = pool;
  }

  async saveToDatabase(...geojsonData) {
    for (const data of geojsonData) {
      const { province, district, sub_district: subDistrict, village, border } = data

      const borderString = JSON.stringify(border).replace(/\s/g, '');
      let borderReversed;

      if (borderString.includes('[[[')) {
        borderReversed = this._reverseCoordinates3D(border);
      } else if (borderString.includes('[[')){
        borderReversed = this._reverseCoordinates2D(border);
      }

      const formatedBorder = JSON.stringify(borderReversed).replace(/\s/g, '')
      const query = {
        sql: `INSERT INTO region(province, district, sub_district, village, border) 
          VALUES (?, ?, ?, ?, ?)`,
        values:[province, district, subDistrict, village, formatedBorder]
      }

      await this._pool.query(query);
      console.log(`Berhasil menambahkan Prov.${province} Kab.${district} Kec.${subDistrict} Kel.${village}`)
    }
  }

  _reverseCoordinates2D(coordinates) {
    return coordinates.map(coord => [coord[1], coord[0]]);
  }
  
  _reverseCoordinates3D(coordinates) {
    return coordinates.map(subArray =>
      subArray.map(coord => [coord[1], coord[0]])
    );
  }
}

module.exports = SaveGeoJson;