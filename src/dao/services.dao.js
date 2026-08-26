import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const dataPath = path.resolve('src/data/services.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw new Error('Error al leer la base de datos de servicios');
  }
};

const writeFile = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getAll = async () => await readFile();

export const getById = async (id) => {
  const items = await readFile();
  return items.find(item => item.id === id) || null;
};

export const create = async (serviceData) => {
  const items = await readFile();
  const newService = { id: crypto.randomUUID(), ...serviceData };
  items.push(newService);
  await writeFile(items);
  return newService;
};

export const update = async (id, serviceData) => {
  const items = await readFile();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  items[index] = { ...items[index], ...serviceData, id }; // Evitamos que pisen el ID
  await writeFile(items);
  return items[index];
};

export const deleteItem = async (id) => {
  const items = await readFile();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  const deleted = items.splice(index, 1)[0];
  await writeFile(items);
  return deleted;
};