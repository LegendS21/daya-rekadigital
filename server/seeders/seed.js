const pool = require('../config/index')
const { readFile } = require('fs/promises')

async function seedData() {
    try {
        let produk = JSON.parse(await readFile('./data/Product.json', 'utf-8')).map(el => `('${el.name}','${el.harga}')`).join(',\n');
        
        let createProduk = `INSERT INTO "Produk" ("name","harga") VALUES ${produk};`;
        await pool.query(createProduk)
        console.log(`Insert produk Success`);

    } catch (error) {
        console.log(error);
    }
}
seedData()