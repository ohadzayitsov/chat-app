import { openDB } from 'idb';

// Initialize the IndexedDB database
export const initDB = async () => {
  return openDB('MyDatabase', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('dataStore')) {
        db.createObjectStore('dataStore', { keyPath: 'id' });
      }
    },
  });
};

// Save data to IndexedDB for a specific file
export const saveToDB = async (key, value) => {
  const db = await initDB();
  await db.put('dataStore', { id: key, value });
};

// Load data from IndexedDB for a specific file
export const loadFromDB = async (key) => {
  const db = await initDB();
  const record = await db.get('dataStore', key);
  return record ? record.value : null;
};

// Clear data for a specific file
export const clearDBFile = async (key) => {
  const db = await initDB();
  await db.delete('dataStore', key);
};

// Clear all data in the database
export const clearDB = async () => {
  const db = await initDB();
  await db.clear('dataStore');
};

export const findInDB = async (key, condition) => {
    const db = await initDB();
    const record = await db.get('dataStore', key);
    if (!record || !record.value) return null;
    const result = record.value.filter(condition);
    return result;
  };

  export const appendToDB = async (key, newRow) => {
    const db = await initDB();
    const record = await db.get('dataStore', key);
    if (!record || !record.value) {
      throw new Error(`No data found for key: ${key}`);
    }
    const updatedData = [...record.value, newRow];
    await db.put('dataStore', { id: key, value: updatedData });
  };
  
  export const setToDB = async (key, value) => {
    const db = await initDB();
    await db.put('dataStore', { id: key, value });
  };
  