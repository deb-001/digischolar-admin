import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

// Function to add timestamps to existing entries
export const migrateTimestamps = async () => {
    try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        
        const updates = [];
        snapshot.forEach((document) => {
            const data = document.data();
            if (!data.timestamp) {
                updates.push(updateDoc(doc(db, 'users', document.id), {
                    timestamp: serverTimestamp()
                }));
            }
        });
        
        await Promise.all(updates);
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}; 