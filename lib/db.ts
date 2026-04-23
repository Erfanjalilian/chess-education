import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data');

type DataType = 'users.json' | 'courses.json' | 'purchases.json' | 'reviews.json';

export function readData<T = any>(filename: DataType): T[] {
  try {
    const filePath = path.join(dataPath, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T[];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

export function writeData<T = any>(filename: DataType, data: T[]): boolean {
  try {
    const filePath = path.join(dataPath, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

export function findById<T extends { id: string }>(filename: DataType, id: string): T | undefined {
  const data = readData<T>(filename);
  return data.find(item => item.id === id);
}

export function addItem<T extends Record<string, any>>(filename: DataType, item: Omit<T, 'id'>): T & { id: string } {
  const data = readData<any>(filename);
  const newItem = { id: Date.now().toString(), ...item };
  data.push(newItem);
  writeData(filename, data);
  return newItem;
}

export function updateItem<T extends { id: string }>(filename: DataType, id: string, updates: Partial<T>): T | null {
  const data = readData<T>(filename);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  data[index] = { ...data[index], ...updates };
  writeData(filename, data);
  return data[index];
}

export function deleteItem(filename: DataType, id: string): boolean {
  const data = readData(filename);
  const filtered = data.filter(item => item.id !== id);
  writeData(filename, filtered);
  return true;
}

export function findOneByField<T extends Record<string, any>>(
  filename: DataType, 
  field: keyof T, 
  value: any
): T | undefined {
  const data = readData<T>(filename);
  return data.find(item => item[field] === value);
}