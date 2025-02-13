const pool = require('../config/index');

class Customer {
    constructor(id, name, level, ProdukId, total_transaction, favorite_menu, aktif) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.ProdukId = ProdukId;
        this.total_transaction = total_transaction;
        this.favorite_menu = favorite_menu;
        this.aktif = aktif;
    }
}

class Produk {
    constructor(id, name, harga) {
        this.id = id;
        this.name = name;
        this.harga = harga;
    }
}
class Transaction {
    constructor(id, ProdukId, CustomerId, jumlah, name, level, produkName, total_harga) {
        this.id = id;
        this.ProdukId = ProdukId;
        this.CustomerId = CustomerId;
        this.jumlah = jumlah;
        this.name = name;
        this.level = level;
        this.produkName = produkName;
        this.total_harga = total_harga;
    }
}
class Transaction_id {
    constructor(id, produk_name, CustomerId, customer_name, level, jumlah, total_harga) {
        this.id = id;
        this.produk_name = produk_name;
        this.CustomerId = CustomerId;
        this.customer_name = customer_name;
        this.level = level;
        this.jumlah = jumlah;
        this.total_harga = total_harga;
    }
}
class Factory {
    static createCustomer(id, name, level, ProdukId) {
        return new Customer(id, name, level, ProdukId);
    }
    static createProduk(id, name, harga) {
        return new Produk(id, name, harga);
    }
    static createTransaction(id, ProdukId, CustomerId, jumlah) {
        return new Transaction(id, ProdukId, CustomerId, jumlah);
    }
    static readCustomer(id, name, level, ProdukId, total_transaction, favorite_menu) {
        return new Customer(id, name, level, ProdukId, total_transaction, favorite_menu);
    }
    static readTransactionById(t_id, produk_name, CustomerId, customer_name, level, jumlah, total_harga) {
        return new Transaction_id(t_id, produk_name, CustomerId, customer_name, level, jumlah, total_harga);
    }

}

class Model {
    static async readCustomer(search) {
        let query = `
        SELECT 
            c.id, 
            c."name", 
            c."level", 
            COALESCE(SUM(t.jumlah * p.harga), 0) AS total_transaction, 
            p."name" AS favorite_menu
        FROM 
            "Customer" c
        LEFT JOIN 
            "Produk" p ON c."ProdukId" = p.id
        LEFT JOIN 
            "Transaction" t ON c.id = t."CustomerId"
        WHERE 
            c.aktif = TRUE
        `;

        if (search) {
            query += ` AND c."name" ILIKE $1`;
        }

        query += `
        GROUP BY 
            c.id, c."name", c."level", p."name";
        `;

        let values = search ? [`%${search}%`] : [];

        let result = await pool.query(query, values);

        return result.rows.map((el) =>
            Factory.readCustomer(
                el.id,
                el.name,
                el.level,
                el.ProdukId,
                el.total_transaction,
                el.favorite_menu
            )
        );
    }
    static async readCustomerById(id) {
        let query = `
        SELECT
            c.id,
            c."name",
            c."level",
            c."aktif",
            COALESCE(SUM(t.jumlah * p.harga), 0) AS total_transaction,
            COALESCE(p."name", 'No Favorite') AS favorite_menu
        FROM
            "Customer" c
        LEFT JOIN
            "Produk" p ON c."ProdukId" = p.id
        LEFT JOIN
            "Transaction" t ON c.id = t."CustomerId"
        WHERE
            c.id = $1
        GROUP BY
            c.id, c."name", c."level", c."aktif", p."name";
        `;

        let result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows.map(el =>
            new Customer(
                el.id,
                el.name,
                el.level,
                el.ProdukId,
                el.total_transaction,
                el.favorite_menu,
                el.aktif
            )
        )[0]
    }

    static async createCustomer(data) {
        let query = `INSERT INTO "Customer" ("name", "level", "ProdukId") VALUES ($1, $2, $3) RETURNING *`;
        let result = await pool.query(query, [data.name, data.level, data.ProdukId]);
        return result.rows.map(el => Factory.createCustomer(el.id, el.name, el.level, el.ProdukId));
    }

    static async updateCustomer(data, id) {
        let query = `UPDATE "Customer" SET "name" = $1, "level" = $2, "ProdukId" = $3 WHERE "id" = $4 RETURNING *`;
        let result = await pool.query(query, [data.name, data.level, data.ProdukId, id]);
        return result.rows.map(el => Factory.createCustomer(el.id, el.name, el.level, el.ProdukId));
    }

    static async deleteCustomer(id) {
        let query = `UPDATE "Customer" SET aktif = FALSE WHERE id = $1 RETURNING *`;
        await pool.query(query, [id]);
        return { message: `Customer dengan ID ${id} berhasil dihapus.` };
    }

    static async getProduk() {
        let query = `SELECT * FROM "Produk"`;
        let result = await pool.query(query);
        return result.rows.map(el => Factory.createProduk(el.id, el.name, el.harga));
    }

    static async createTransaction(data) {
        let query = `INSERT INTO "Transaction" ("ProdukId", "CustomerId", "jumlah") VALUES ($1, $2, $3) RETURNING *`;
        let result = await pool.query(query, [data.ProdukId, data.CustomerId, data.jumlah]);
        return result.rows.map(el => Factory.createTransaction(el.id, el.ProdukId, el.CustomerId, el.jumlah));
    }
    static async readTransactionById(id) {
        let query = `
       SELECT
            t.id AS t_id,
            p."name" AS Produk_name,
            t."CustomerId",
            c."name" AS Customer_name,
            c."level",
            t.jumlah,
            (t.jumlah * p.harga) AS total_harga
        FROM
            "Transaction" t
        JOIN
            "Customer" c ON c.id = t."CustomerId"
        JOIN
            "Produk" p ON t."ProdukId" = p.id
        WHERE
            c.id = $1
        GROUP BY t_id, Produk_name, t."CustomerId", c."name", c."level", t.jumlah, total_harga
        `;

        let result = await pool.query(query, [id]);

        return result.rows.map(el =>
            Factory.readTransactionById(
                el.t_id, el.produk_name, el.CustomerId, el.customer_name, el.level, el.jumlah, el.total_harga
            )
        );

    }
    static async readFavorite() {
        let query = `
        SELECT 
            *
        FROM
        "Produk" p
        `;
        let result = await pool.query(query);
        return result.rows.map(el => Factory.createProduk(el.id, el.name, el.harga));
    }
    static async updateTransaction(jumlah, id) {
        let query = `UPDATE "Transaction" SET "jumlah" = $1 WHERE "id" = $2 RETURNING *`;
        let result = await pool.query(query, [jumlah, id]);
        return result.rows.map(el => Factory.createTransaction(el.id, el.ProdukId, el.CustomerId, el.jumlah));
    }
}

module.exports = { Factory, Model };
