const pool = require("../config/postgres");

class Notebook {
    static async getAll() {
        const result = await pool.query(
            "SELECT * FROM notebooks ORDER BY created_at DESC"
        );
        return result.rows;
    }

    static async getById(id) {
        const result = await pool.query("SELECT * FROM notebooks WHERE id = $1", [
            id,
        ]);
        return result.rows[0];
    }

    static async create(name) {
        const result = await pool.query(
            "INSERT INTO notebooks (name) VALUES ($1) RETURNING *",
            [name]
        );
        return result.rows[0];
    }

    static async update(id, name) {
        const result = await pool.query(
            "UPDATE notebooks SET name = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
            [name, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query(
            "DELETE FROM notebooks WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rows[0];
    }
}

module.exports = Notebook;
