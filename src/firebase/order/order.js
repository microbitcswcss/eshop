import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, fireDB, provider } from "../firebaseconfig";

class order {
  user;
  order;
  constructor() {
    this.user = collection(fireDB, "users");
    this.order = collection(fireDB, "orders");
  }

  async orderlists(data) {
    try {
      const orderQuery = query(this.order, where("uid", "==", data));
      const orderitem = [];
      const orderSnapshot = await getDocs(orderQuery);

      orderSnapshot.docs.map((doc) =>
        orderitem.push({ ...doc.data(), id: doc.id })
      );

      return orderitem;
    } catch (error) {
      console.error("Error getting product by ID: ", error);
      throw error;
    }
  }

  async getOrders() {
    try {
      const oders = await getDocs(this.order);
      const orders = oders.docs.map((doc) => {
        let data = doc.data();

        data.id = doc.id;
        return data;
      });

      return orders;
    } catch (error) {
      console.error("Error getting products: ", error);
      throw error;
    }
  }

  async invoicelist(data) {
    try {
    
      const orderRef = doc(this.order, data);
      

      const orderDoc = await getDoc(orderRef);

      if (orderDoc.exists()) {
    
        const orderData = { id: orderDoc.id, ...orderDoc.data() };
    console.log(orderData);
        return orderData;
      } else {
    
        return null;
      }
    } catch (error) {
      console.error("Error getting order by ID: ", error);
      throw error;
    }
  }
}

const orderlist = new order();

export default orderlist;
