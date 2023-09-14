class SaveGeoJson {
  constructor(pool) {
    this._pool = pool;
  }

  async saveToDatabase(...geojsonData) {
    for (const data of geojsonData) {
      const { province, district, sub_district: subDistrict, village, border } = data

      const borderString = JSON.stringify(border)

      const query = {
        sql: `INSERT INTO region(province, district, sub_district, village, border) 
          VALUES (?, ?, ?, ?, ?)`,
        values:[province, district, subDistrict, village, borderString]
      }

      await this._pool.query(query);
      console.log(`Berhasil menambahkan Prov.${province} Kab.${district} Kec.${subDistrict} Kel.${village}`)
    }
  }
}

module.exports = SaveGeoJson;