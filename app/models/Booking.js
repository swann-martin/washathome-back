const db = require('../dbClient');

class Booking {

    // Class constructor
    constructor (data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    // Find all method
    static async findAll() {
        const { rows } = await db.query('SELECT * FROM booking;');

        return rows.map(row => new Booking(row));
    }

    // Find one method
    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM booking WHERE id = $1;', [id]);
        
        return rows.map(row => new Booking(row));
    }

    // Find by washer method
    static async findByWasherId(id) {
        const { rows } = await db.query('SELECT * FROM booking WHERE washer_id = $1;', [id]);
        
        return rows.map(row => new Booking(row));
    }

    // Find by bringer method
    static async findByBringerId(id) {
        const { rows } = await db.query('SELECT * FROM booking WHERE bringer_id = $1;', [id]);
        
        return rows.map(row => new Booking(row));
    }

    // Create row method
    async save() {
        if (this.id) {
            // si l'instance a un id, opère une mise à jour
            await db.query(`
                    UPDATE booking SET
                    temperature = $1, time_resa = $2,
                    bringer_id = $3, washer_id = $4,
                    machine_id = $5, status_id = $6,
                    WHERE id = $7;
                `, [
                    this.temperature, this.timeResa,
                    this.bringerId, this.washerId,
                    this.machineId, this.statusId,
                    this.id
                ]
            );
        } else {
            const { rows } = await db.query(`
                INSERT INTO booking (temperature, time_resa, bringer_id, washer_id, machine_id, status_id)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
            `, [
                this.temperature, this.timeResa,
                this.bringerId, this.washerId,
                this.machineId, this.statusId
            ]);
            this.id = rows[0].id;

            // return the id of the machine
            return rows.map(row => new Booking(row));
        }
    }

    // Delete row method
    static async delete(id) {
        await db.query('DELETE FROM booking WHERE id = $1;', [id]);
    }
}

module.exports = Booking;