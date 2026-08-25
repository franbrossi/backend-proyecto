import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const dataPath = path.resolve('src/data/bookings.json');

export class BookingManager {
  
  async #readFile() {
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw new Error('Error al leer la base de datos de reservas');
    }
  }

  async #writeFile(data) {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  //  Crear reserva
  async createBooking(bookingData) {
    const { clientName, clientEmail, date, time, status } = bookingData;
    const bookings = await this.#readFile();

    const newBooking = {
      id: crypto.randomUUID(),
      clientName,
      clientEmail,
      date,
      time,
      status: status || 'pendiente', 
      services: [] 
    };

    bookings.push(newBooking);
    await this.#writeFile(bookings);
    return newBooking;
  }

  
  async getBookingById(id) {
    const bookings = await this.#readFile();
    return bookings.find(b => b.id === id) || null;
  }

  
  async addServiceToBooking(bid, sid) {
    const bookings = await this.#readFile();
    const bookingIndex = bookings.findIndex(b => b.id === bid);

    if (bookingIndex === -1) return null; 

    const booking = bookings[bookingIndex];
    
    
    const serviceIndex = booking.services.findIndex(s => s.service === sid);

    if (serviceIndex !== -1) {
      booking.services[serviceIndex].quantity += 1;
    } else {
      booking.services.push({ service: sid, quantity: 1 });
    }

    await this.#writeFile(bookings);
    return booking;
  }
}