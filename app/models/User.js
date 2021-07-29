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

    // Find by mail method
    static async findByMail (mail) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE mail = $1;' , [mail]);

        return rows.map(row => new User(row));
    }

    // Find by pseudo method 
    static async findByPseudo (pseudo) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE pseudo = $1;' , [pseudo]);

        return rows.map(row => new User(row));
    }

    // Find by phone method
    static async findByPhone (phone) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE phone = $1;' , [phone]);

        return rows.map(row => new User(row));
    }

    // Find by mail and send machines method
    static async findByMailJoin (mail) {
        const {rows} = await db.query('SELECT * FROM "user" FULL OUTER JOIN machine ON "user".id = machine.user_id WHERE "user".mail = $1 ;' , [mail]);
        console.log(rows);
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
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
            `, [
                this.pseudo, this.firstname,
                this.lastname, this.phone,
                this.mail, this.password,
                this.avatar
            ]);
            this.id = rows[0].id;

            // return the id of the user
            return rows.map(row => new User(row));
        }
    }

    // Delete row method
    static async delete(id) {
        await db.query('DELETE FROM "user" WHERE id = $1', [id]);
    }
}

module.exports = User;