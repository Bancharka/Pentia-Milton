import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// kig i claude tidligere samtale "firebase to do list" efter hvordan det kan gøres.
