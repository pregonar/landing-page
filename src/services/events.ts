import {
    collection,
    getDocs,
    addDoc,
    query,
    orderBy,
    Timestamp,
    doc,
    getDoc,
    DocumentData,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Reuse the Event type from EventsPage description but adapted for Firestore
// (Dates in Firestore are Timestamps)
export interface Event {
    id: string;
    title: string;
    location: string;
    province: string;
    date: Date; // Transformed to/from Timestamp
    category: string;
    tags: string[];
    price: number;
    image: string;
    difficulty?: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
    durationCategory?: 'short' | 'medium' | 'long';
    duration?: string;
    description?: string;
    organizer?: string;
    capacity?: number;
    registered?: number;
    createdAt?: Date;
}

// Firestore data converter
const eventConverter = {
    toFirestore(event: Event): DocumentData {
        return {
            ...event,
            date: Timestamp.fromDate(event.date),
            createdAt: event.createdAt ? Timestamp.fromDate(event.createdAt) : Timestamp.now()
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Event {
        const data = snapshot.data(options)!;
        return {
            id: snapshot.id,
            title: data.title,
            location: data.location,
            province: data.province,
            date: data.date.toDate(),
            category: data.category,
            tags: data.tags || [],
            price: data.price,
            image: data.image,
            difficulty: data.difficulty,
            durationCategory: data.durationCategory,
            duration: data.duration,
            description: data.description,
            organizer: data.organizer,
            capacity: data.capacity,
            registered: data.registered,
            createdAt: data.createdAt?.toDate()
        };
    }
};

const EVENTS_COLLECTION = 'events';

export const getEvents = async (): Promise<Event[]> => {
    const q = query(collection(db, EVENTS_COLLECTION).withConverter(eventConverter), orderBy('date', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, EVENTS_COLLECTION).withConverter(eventConverter), event);
    return docRef.id;
};

// Helper to seed initial data if empty
export const seedInitialEvents = async (events: Omit<Event, 'id'>[]) => {
    const currentEvents = await getEvents();
    if (currentEvents.length === 0) {
        console.log("Seeding events...");
        for (const event of events) {
            await createEvent(event);
        }
        console.log("Seeding complete.");
    }
};
