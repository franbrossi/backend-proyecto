import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const dataPath = path.resolve('src/data/bookings.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw new Error('Error al leer la base de datos de reservas');
  }
};

const writeFile = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getById = async (id) => {
  const bookings = await readFile();
  return bookings.find(b => b.id === id) || null;
};

export const create = async (bookingData) => {
  const bookings = await readFile();
  const newBooking = {
    id: crypto.randomUUID(),
    ...bookingData,
    status: bookingData.status || 'pendiente',
    services: []
  };
  bookings.push(newBooking);
  await writeFile(bookings);
  return newBooking;
};

export const update = async (id, bookingData) => {
  const bookings = await readFile();
  const index = bookings.findIndex(b => b.id === id);
  if (index === -1) return null;

  bookings[index] = { ...bookings[index], ...bookingData, id };
  await writeFile(bookings);
  return bookings[index];
};