const db = require('../dbClient');

class User {

    // Class constructor
    constructor (data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    // Find one method
    static async findOne(id) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE id = $1;', [id]);

        return new User(rows[0]);
    }

    // Find all method
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM "user";');

        return rows.map(row => new User(row));
    }

    // Find by pseudo method
    static async findByMail (mail) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE mail = $1;' , [mail]);

        return rows.map(row => new User(row));
    }

    // Create row method
    async save() {
        if (this.id) {
            // si l'instance a un id, opère une mise à jour
            await db.query(`
                    UPDATE "user" SET
                    pseudo = $1, firstname = $2,
                    lastname = $3, phone = $4,
                    mail = $5, password = $6, avatar = $7;
                `, [
                    this.pseudo, this.firstname,
                    this.lastname, this.phone,
                    this.mail, this.password,this.avatar,
                    this.id
                ]
            );
        } else {
            const { rows } = await db.query(`
                INSERT INTO "user" (pseudo, firstname, lastname, phone, mail, password, avatar)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
            `, [
                this.pseudo, this.firstname,
                this.lastname, this.phone,
                this.mail, this.password,
                this.avatar
            ]);
            this.id = rows[0].id;
        }
    }

    // Delete row method
    async delete() {
        await db.query('DELETE FROM "user" WHERE id = $1', [this.id]);
    }
}

module.exports = User;