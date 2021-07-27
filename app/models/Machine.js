const db = require('../dbClient');

class Machine {

/*     // Getter and setter of capacity
    get capacity() {
        return this.capacity;
    }
    set capacity(value) {
        this.capacity = value;
    }
    // Getter and setter of name
    get name() {
        return this.name;
    }
    set name(value) {
        this.name = value;
    }
    // Getter and setter of description
    get description() {
        return this.description;
    }
    set description(value) {
        this.description = value;
    }
    // Getter and setter of zipCode
    get zipCode() {
        return this.zip_code;
    }
    set zipCode(value) {
        this.zip_code = value;
    }
    // Getter and setter of address
    get address() {
        return this.address;
    }
    set address(value) {
        this.address = value;
    }
    // Getter and setter of city
    get city() {
        return this.city;
    }
    set city(value) {
        this.city = value;
    }
    // Getter and setter of price
    get price() {
        return this.price;
    }
    set price(value) {
        this.price = value;
    }
    // Getter and setter of picture
    get picture() {
        return this.picture;
    }
    set picture(value) {
        this.picture = value;
    }
    // Getter and setter of userId
    get userId() {
        return this.user_id;
    }
    set userId(value) {
        this.user_id = value;
    } */

    // Class constructor
    constructor (data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    // Find all method
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM machine;');

        return rows.map(row => new Machine(row));
    }

    // Find one method
    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM machine WHERE id = $1;', [id]);
        
        return rows.map(row => new Machine(row));
    }

    // Find by zip code method
    static async findByZipCode (zipCode) {
        const { rows } = await db.query('SELECT * FROM machine WHERE zip_code = $1;' , [zipCode]);

        return rows.map(row => new Machine(row));
    }

    // Create row method
    async save() {
        if (this.id) {
            // si l'instance a un id, opère une mise à jour
            await db.query(`
                    UPDATE user SET
                    capacity = $1, name = $2,
                    description = $3, zip_code = $4,
                    address = $5, city = $6, price = $7,
                    picture = $8, user_id = $9
                    WHERE id = $10;
                `, [
                    this.capacity, this.name,
                    this.description, this.zipCode,
                    this.address, this.city, this.price,
                    this.picture, this.userId,
                    this.id
                ]
            );
        } else {
            const { rows } = await db.query(`
                INSERT INTO machine (capacity, name, description, zip_code, address, city, price, picture, user_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;
            `, [
                this.capacity, this.name,
                this.description, this.zipCode,
                this.address, this.city, this.price,
                this.picture, this.userId
            ]);
            this.id = rows[0].id;

            // return the id of the machine
            return rows.map(row => new Machine(row));
        }
    }

    // Delete row method
    static async delete(id) {
        await db.query('DELETE FROM machine WHERE id = $1;', [id]);
    }
}

module.exports = Machine;