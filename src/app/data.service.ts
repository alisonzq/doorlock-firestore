import { Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { listOfLock } from './lock';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private injector: Injector) { }

  addUnlock(lock: listOfLock) {
    const afs = this.injector.get(AngularFirestore)
    lock.id = afs.createId();
    return afs.collection('/lockData').add(lock);
  }

  async deleteOldData() : Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const afs = this.injector.get(AngularFirestore);
    const queryRef = afs.collection('listOfPW', ref => ref.where('dateAndTime', '<', today));
    try {
      const querySnapshot = await lastValueFrom(queryRef.get());
      const deletedDocs : any =[];
      if (querySnapshot && !querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          deletedDocs.push(doc.id);
          doc.ref.delete();
        });
        console.log(`Deleted ${deletedDocs.length} documents: ${deletedDocs.join(', ')}`);
      } else {
        console.log('No documents to delete.');
      }
    } catch (error) {
      console.error('Error deleting old data: ', error);
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

}
