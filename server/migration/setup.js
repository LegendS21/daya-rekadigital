const pool = require('../config/index');

async function setup() {
    try {
        let dropCustomer = `DROP TABLE IF EXISTS "Transaction", "Customer", "Produk" CASCADE;`;

        let createProduk = `CREATE TABLE IF NOT EXISTS "Produk"(
            id SERIAL PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            harga BIGINT NOT NULL
        );`;

        let createCustomer = `CREATE TABLE IF NOT EXISTS "Customer"(
            id SERIAL PRIMARY KEY,
            name VARCHAR(120) NOT NULL,
            level VARCHAR(120) NOT NULL,
            aktif BOOLEAN DEFAULT TRUE,
            "ProdukId" INTEGER NOT NULL REFERENCES "Produk"(id) ON DELETE CASCADE
        );`;

        let createTransaction = `CREATE TABLE IF NOT EXISTS "Transaction"(
            id SERIAL PRIMARY KEY,
            "ProdukId" INTEGER NOT NULL REFERENCES "Produk"(id) ON DELETE CASCADE,
            "CustomerId" INTEGER NOT NULL REFERENCES "Customer"(id) ON DELETE CASCADE,
            jumlah INTEGER NOT NULL
        );`;

        await pool.query(dropCustomer);
        console.log('DROP SUCCESS');

        await pool.query(createProduk);
        console.log('Create Produk SUCCESS');

        await pool.query(createCustomer);
        console.log('Create Customer SUCCESS');

        await pool.query(createTransaction);
        console.log('Create Transaction SUCCESS');

    } catch (error) {
        console.error('Error:', error);
    }
}

setup();
