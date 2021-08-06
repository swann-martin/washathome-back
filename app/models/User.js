const db = require('../dbClient');

class User {

    // Class constructor
    constructor (data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    // Find one method
    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE id = $1;', [id]);

        //Returns the row of the user
        return rows.map(row => new User(row));
    }

    // Find all method
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM "user";');

        //Returns the row of the user
        return rows.map(row => new User(row));
    }

    // Find by mail method
    static async findByMail (mail) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE mail = $1;' , [mail]);

        //Returns the row of the user
        return rows.map(row => new User(row));
    }

    // Find by pseudo method 
    static async findByPseudo (pseudo) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE pseudo = $1;' , [pseudo]);

        //Returns the row of the user
        return rows.map(row => new User(row));
    }

    // Find by phone method
    static async findByPhone (phone) {
        const { rows } = await db.query('SELECT * FROM "user" WHERE phone = $1;' , [phone]);

        //Returns the row of the user
        return rows.map(row => new User(row));
    }

    // Find by mail and send machines method
    static async findByIdJoin (mail) {

        const {rows} = await db.query(`SELECT 
                                        json_build_object('id', "user".id, 'pseudo', "user".pseudo,'lastname',"user".lastname,'firstname', "user".firstname,'phone',"user".phone,'mail',"user".mail,'avatar',"user".avatar)"user",
                                        json_build_object(
                                            'id', machine.id,
                                            'capacity', machine.capacity,
                                            'title', machine.name,
                                            'description', machine.description,
                                            'zip_code',machine.zip_code,
                                            'city',machine.city,
                                            'address',machine.address,
                                            'latitude',machine.latitude,
                                            'longitude',machine.longitude,
                                            'picture', machine.picture,
                                            'price', machine.price
                                        ) machine
                                        FROM 
                                            "user"
                                        FULL OUTER JOIN machine ON "user".id=machine.user_id 
                                        WHERE "user".id= $1
                                        GROUP BY ("user".id,machine.id);
                                        ` , [mail]);

        //Returns the row of the user
        return rows.map(row => new User(row));
    }

    // Create row method
    async save() {
        if (this.id) {

            // si l'instance a un id, opère une mise à jour
            const { rows } = await db.query(`
                    UPDATE "user" SET
                    pseudo = $1, firstname = $2,
                    lastname = $3, phone = $4,
                    mail = $5, avatar = $6 
                    WHERE id = $7 RETURNING *;
                `, [
                    this.pseudo, this.firstname,
                    this.lastname, this.phone,
                    this.mail,this.avatar,
                    this.id
                ]);

            // return the row of the user
            return rows.map(row => new User(row));

        } else {
            console.log(this);
            const { rows } = await db.query(`
                INSERT INTO "user" (pseudo, firstname, lastname, phone, mail, password, avatar)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
            `, [
                this.pseudo, this.firstname,
                this.lastname, this.phone,
                this.mail, this.password,
                this.avatar
            ]);
            // return the row of the user
            console.log(rows);
            return rows.map(row => new User(row));
        }
    }

    // Update password method
    async updatePassword () {

        const {rows} = await db.query(`
                UPDATE "user" SET password = $1 
                WHERE id = $2 RETURNING *;
            `, [this.password,this.id]
        );
        // return the row of the user
        return rows.map(row => new User(row));
    }

    // Delete row method
    static async delete(id) {
        await db.query('DELETE FROM "user" WHERE id = $1', [id]);
    }
}

// Exports
module.exports = User;