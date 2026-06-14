import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, where, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useCollection(collectionName, queryConstraints = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = collection(db, collectionName);
    const q = queryConstraints.length > 0 ? query(ref, ...queryConstraints) : ref;
    const unsub = onSnapshot(q,
      (snap) => {
        setData(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsub;
  }, [collectionName]);

  return { data, loading, error };
}

export function useFirestoreAdd(collectionName) {
  const add = async (data) => {
    return await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
  };
  return { add };
}

export function useFirestoreUpdate() {
  const update = async (collectionName, id, data) => {
    await updateDoc(doc(db, collectionName, id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  };
  return { update };
}

export function useFirestoreDelete() {
  const remove = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
  };
  return { remove };
}
