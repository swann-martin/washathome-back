// Imports
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

        // Returns the row of the reservation
        return rows.map(row => new Booking(row));
    }

    // Find one method
    static async findById(id) {
        const { rows } = await db.query('SELECT * FROM booking WHERE id = $1;', [id]);
        
        // Returns the row of the reservation        
        return rows.map(row => new Booking(row));
    }

    // Find by bringer method
    static async findByBringerId(id) {
        const { rows } = await db.query(`SELECT
                                        json_build_object('id', u .id, 'pseudo', u. pseudo, 'phone', u. phone, 'mail', u .mail) washer,
                                        json_build_object('id', b.id, 'pseudo', b.pseudo) bringer,
                                        json_build_object(
                                            'idResa', booking.id,
                                            'dispo', booking.dispo,
                                            'tempResa', booking.temperature,
                                            'washer_id', u .id ,
                                            'bringer_id', b.id,
                                            'status_id', booking.status_id,
                                            'status_name', status.label,
                                            'options', json_agg(json_build_object('id', "option".id, 'name', "option".name, 'price', "option".price))
                                        ) resa ,
                                        json_build_object(
                                            'id', machine.id,
                                            'name', machine.name,
                                            'address',machine.address,
                                            'zip_code',machine.zip_code,
                                            'city',machine.city,
                                            'latitude',machine.latitude,
                                            'longitude',machine.longitude,
                                            'price', machine.price
                                        ) machine
                                        FROM
                                            "user" b
                                        JOIN booking ON booking.bringer_id = b.id
                                        JOIN "user" u ON u .id = booking.washer_id
                                        JOIN machine ON  machine.id = booking.machine_id
                                        JOIN status ON booking.status_id = status.id
                                        FULL OUTER JOIN "include" ON booking.id = "include".booking_id
                                        FULL OUTER JOIN "option" ON "option".id = "include".option_id
                                        WHERE b.id = $1
                                        GROUP BY (u.id, b.id, booking.id,machine.id,status.id);
                                        `, [id]);
        
        // Returns the row of the res
        return rows.map(row => new Booking(row));
    }

    // Find by washer method
    static async findByWasherId(id) {

        const { rows } = await db.query(`SELECT 
                                        json_build_object('id', u.id, 'pseudo', u.pseudo, 'phone', u.phone, 'mail', u.mail) washer,
                                        json_build_object('id', b .id, 'pseudo', b .pseudo) bringer,
                                        json_build_object(
                                          'idResa', booking.id, 
                                          'dispo', booking.dispo,
                                          'tempResa', booking.temperature, 
                                          'washer_id', u.id , 
                                          'bringer_id', b .id, 
                                          'status_id', booking.status_id, 
                                          'status_name', status.label,
                                          'options', json_agg(json_build_object('id', "option".id, 'name', "option".name, 'price', "option".price))
                                        ) resa ,
                                        json_build_object(
                                          'id', machine.id,
                                          'name', machine.name,
                                          'address',machine.address,
                                          'zip_code',machine.zip_code,
                                          'city',machine.city,
                                          'latitude',machine.latitude,
                                          'longitude',machine.longitude,
                                          'price', machine.price
                                        ) machine
                                        FROM 
                                        "user" u
                                        JOIN booking ON booking.washer_id = u.id
                                        JOIN "user" b ON b .id = booking.bringer_id
                                        JOIN machine ON  machine.id = booking.machine_id
                                        JOIN status ON booking.status_id = status.id
                                        FULL OUTER JOIN "include" ON booking.id = "include".booking_id
                                        FULL OUTER JOIN "option" ON "option".id = "include".option_id
                                        WHERE u.id = $1
                                        GROUP BY (u.id, b.id, booking.id,machine.id,status.id);`
                                        , [id]);

        // return the row of the reservation
        return rows.map(row => new Booking(row));
    }

    // Create row method
    async save() {
        if (this.id) {
            // si l'instance a un id, opère une mise à jour
            await db.query(`
                    UPDATE booking SET
                    temperature = $1, dispo = $2,
                    bringer_id = $3, washer_id = $4,
                    machine_id = $5, status_id = $6,
                    WHERE id = $7;
                `, [
                    this.temperature, this.dispo,
                    this.bringerId, this.washerId,
                    this.machineId, this.statusId,
                    this.id
                ]);

            // return the row of the reservation
            return rows.map(row => new Booking(row));

        } else {

            const { rows } = await db.query(`
                INSERT INTO booking (temperature, dispo, bringer_id, washer_id, machine_id, status_id)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
            `, [
                this.temperature, this.dispo,
                this.bringerId, this.washerId,
                this.machineId, this.statusId
            ]);
            // return the row of the reservation
            return rows.map(row => new Booking(row));
        }
    }

    // Add option method
    static async options(bookingId,optionId) {
        const {rows} = await db.query('INSERT INTO include (booking_id,option_id) VALUES ($1, $2) RETURNING *', [bookingId,optionId]);

        return rows.map(row => new Booking(row));
    }

    // Change state method
    async changeState() {
        const { rows } = await db.query(`UPDATE booking SET status_id = $1 WHERE id = $2;`
                                        , [this.status_id, this.id]
        );
        // return the row of the reservation
        const res = {status_id: this.status_id, booking_id: this.id};
        return res;
    }

    // Get the total of the reservation method
    static async total(id) {
        const {rows} = await db.query('SELECT * FROM bill WHERE id = $1', [id]);

        // return the row of the total
        return rows.map(row => new Booking(row))
    }

    // Delete row method
    static async delete(id) {
        await db.query('DELETE FROM booking WHERE id = $1;', [id]);
    }
}

// Exports
module.exports = Booking;