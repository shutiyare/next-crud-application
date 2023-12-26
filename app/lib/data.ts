// 'use server'
import { sql } from "@vercel/postgres";
export async function fetchCustomers(){
const users= await sql`SELECT * FROM customers;`;
// console.log(users.rows)
return users.rows;
}
export async function fetchStudents(){
  const students= await sql`SELECT * FROM students LIMIT 20;`;
  console.log('students in calll method are :',students.rowCount);

  return students.rows;
  }
  export async function fetchSingleStudent(id:number){
   return await sql`SELECT * FROM students WHERE student_id =${id} LIMIT 1;`;
    
    }
 export async function DeleteStudent (id) {
  const req= await sql`DELETE FROM students WHERE id=${id};`;
  return req.rows;
 }
    
export async function fetchUsers(){
  const req= await sql`SELECT * FROM users;`
  return req.rows
  }
export async function getUsers() {
    return fetch("https://dummyjson.com/users").then((res) => res.json());
    // .then(console.log);
  }
  
  export async function getInventory() {
    return fetch("https://dummyjson.com/products").then((res) => res.json());
    // .then(console.log);
  }
  
  export async function getOrders() {
    return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
    // .then(console.log);
  }
  export async function getAllProducts() {
    return fetch("https://dummyjson.com/products").then((res) => res.json());
  }
  export async function getProductsByCategory(category) {
    return fetch(`https://dummyjson.com/products/category/${category}`).then(
      (res) => res.json()
    );
  }
  export async function getCart() {
    return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
  }
  export async function addToCart(id) {
    return fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        products: [
          {
            id: id,
            quantity: 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  }