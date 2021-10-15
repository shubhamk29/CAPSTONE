import { db } from "config/Firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const signUpUser = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (e) {
    return { errorMessage: e };
  }
};

export const loginUser = async (username, password, role) => {
  try {
    var ref;
    if (role === "admin") {
      ref = "admin";
    }
    if (role === "police") {
      ref = "police";
    }
    if (role === "user") {
      ref = "users";
    }
    const usersRef = collection(db, ref);
    const q = query(
      usersRef,
      where("username", "==", username),
      where("password", "==", password)
    );
    const docSnap = await getDocs(q);
    return { role, docSnap };
  } catch (e) {
    return { errorMessage: e.message };
  }
};
/*=============================CRUD API============================= */
export const getAllData = async (collectionName) => {
  try {
    const docRef = collection(db, collectionName);
    const q = query(docRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      return obj;
    });
  } catch (e) {
    return { errorMessage: e.message };
  }
};

export const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  } catch (e) {
    return { errorMessage: e.message };
  }
};

export const getSingleData = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      data.id = docSnap.id;
      return data;
    } else {
      return {
        errorMessage: "Sorry no document is found that you are looking for",
      };
    }
  } catch (err) {
    return { errorMessage: err.message };
  }
};

export const updateData = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, data);
      let message = "data is successfully updated";
      return { success: message };
    } else {
      return {
        errorMessage: "Sorry no document is found that you are updating for",
      };
    }
  } catch (err) {
    return { errorMessage: err.message };
  }
};
export const deleteData = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    let message = "data is successfully deleted";
    return { success: message };
  } catch (e) {
    return { errorMessage: e.message };
  }
};

//Get all data  by column name

export const getAllDataByColName = async (
  collectionName,
  colName,
  colData,
  notFoundMsg
) => {
  try {
    const docRef = collection(db, collectionName);
    const q = query(docRef, where(colName, "==", colData));
    const docSnap = await getDocs(q);
    if (docSnap.docs.length > 0) {
      return docSnap.docs.map((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        return obj;
      });
    } else {
      return {
        errorMessage: notFoundMsg,
      };
    }
  } catch (e) {
    return { errorMessage: e.message };
  }
};

export const checkDuplicateComplaintsRegistration = async (
  userId,
  description,
  isDuplicate
) => {
  try {
    const docRefC = collection(db, "complaints");
    const qC = query(docRefC);
    const querySnapshot = await getDocs(qC);
    if (!querySnapshot.empty) {
      const docRef = collection(db, "complaints");
      const q = query(
        docRef,
        where("userId", "==", userId),
        where("resolved", "==", "No"),
        where("description", "==", description)
      );
      const docSnap = await getDocs(q);
      if (docSnap.docs.length > 0) {
        return {
          errorMessage: isDuplicate,
        };
      } else {
        return {
          success: "no duplicate",
        };
      }
    } else {
      return {
        success: "collection is created now",
      };
    }
  } catch (e) {
    return { errorMessage: e.message };
  }
};
