const db = require('../dbClient');

class Machine {

    // Class constructor
    constructor (data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    // Find all method
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM machine;');

        // Returns the row of the machine
        return rows.map(row => new Machine(row));
    }

    // Find one method
    static async findById(id) {
        const { rows } = await db.query(`SELECT * FROM machine WHERE id = $1`, [id]);
        
        // Returns the row of the machine
        return rows.map(row => new Machine(row));
    }

    // Find by user id method
    static async findByUserId(id) {
        const { rows } = await db.query('SELECT * FROM machine WHERE user_id = $1;', [id]);

        // Returns the row of the machine
        return rows.map(row => new Machine(row));
    }

    // Find by zip code method
    static async findByZipCode (zipCode) {

        const { rows } = await db.query(`SELECT * FROM machine WHERE zip_code =$1` , [zipCode]);

        // Returns the row of the machine
        return rows.map(row => new Machine(row));
    }

    // Create row method
    async save() {
        if (this.id) {
            // Update if class instance has an id
            await db.query(`
            UPDATE machine SET
            capacity = $1, name = $2,
            description = $3, zip_code = $4,
            address = $5, city = $6, latitude = $7, longitude = $8,
            price = $9, picture = $10, user_id = $11 
            WHERE id = $12 RETURNING *;
            `, [
                this.capacity, this.name,
                this.description, this.zipCode,
                this.address, this.city, this.price,
                this.latitude, this.longitude,
                this.picture, this.userId,
                this.id
            ]);
            
            // return the row of the machine
            return rows.map(row => new Machine(row));
            
        } else {
            const { rows } = await db.query(`
            INSERT INTO machine (capacity, name, description, zip_code, address, city, latitude, longitude, price, picture, user_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;
            `, [
                this.capacity, this.name,
                this.description, this.zipCode,
                this.address, this.city,
                this.latitude, this.longitude,
                this.price, this.picture, this.userId
            ]);
            
            // return the row of the machine
            return rows.map(row => new Machine(row));
        }
    }

    // Delete row method
    static async delete(id) {
        await db.query('DELETE FROM machine WHERE id = $1;', [id]);
    }
}

// Exports
module.exports = Machine;