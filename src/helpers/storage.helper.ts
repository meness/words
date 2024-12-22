import { ParsedWordsCsv } from '~common/types';
import { databaseConfig } from '~configs';

const initDB = async () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(databaseConfig.indexedDbName, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(databaseConfig.learnedWordsStoreName)) {
        db.createObjectStore(databaseConfig.learnedWordsStoreName, { autoIncrement: false, keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const waitForTransaction = (transaction: IDBTransaction) =>
  new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });

export const storeWord = async (word: ParsedWordsCsv['rows'][number]) => {
  const db = await initDB();

  const transaction = db.transaction(databaseConfig.learnedWordsStoreName, 'readwrite');
  const store = transaction.objectStore(databaseConfig.learnedWordsStoreName);

  store.put(word);

  return waitForTransaction(transaction);
};

export const deleteWord = async (wordIndex: ParsedWordsCsv['rows'][number]['id']) => {
  const db = await initDB();

  const transaction = db.transaction(databaseConfig.learnedWordsStoreName, 'readwrite');
  const store = transaction.objectStore(databaseConfig.learnedWordsStoreName);

  store.delete(wordIndex);

  return waitForTransaction(transaction);
};

export const isWordExists = async (wordIndex: ParsedWordsCsv['rows'][number]['id']) => {
  const db = await initDB();

  const transaction = db.transaction(databaseConfig.learnedWordsStoreName, 'readonly');
  const store = transaction.objectStore(databaseConfig.learnedWordsStoreName);

  return new Promise<boolean>((resolve, reject) => {
    const request = store.count(wordIndex);

    request.onsuccess = () => resolve(request.result > 0);
    request.onerror = () => reject(request.error);
  });
};
