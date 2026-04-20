import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// kig i claude tidligere samtale "firebase to do list" efter hvordan det kan gøres.
export function useFirestore() {
  async function fetchTodos() {

    const todoSnap = await getDocs(
      query(
        collection(db, "houseTemplates", "default-house", "todos"),
        orderBy("order")
      )
    );

    const todos = todoSnap.docs.map(todoDoc => ({
      id: todoDoc.id,
      ...todoDoc.data(),
      subTodos: []

    }));


    for (const todo of todos) {
      const subTodosSnap = await getDocs(
        query(
          collection(db, "houseTemplates", "default-house", "todos", todo.id, "subTodos"),
          orderBy("order")
        )
      );


      todo.subTodos = subTodosSnap.docs.map(subDoc => ({
        id: subDoc.id,
        ...subDoc.data()

      }));
    }

    return todos;
  }

  return { fetchTodos };
}
