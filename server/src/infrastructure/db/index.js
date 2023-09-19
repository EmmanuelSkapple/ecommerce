const mysql = require("mysql");

class MySQLDB {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "tienda" // Especifica la base de datos aquí
    });
  }

  async initAndCreateDB() {
    this.connection.connect((err) => {
      if (err) {
        console.error("Error de conexión a MySQL:", err);
        return;
      }
      console.log("Conectado a MySQL");
    });

    this.connection.query("CREATE DATABASE IF NOT EXISTS tienda", (err) => {
      if (err) {
        console.error("Error al crear la base de datos:", err);
        this.connection.end();
        return;
      }
      console.log('Base de datos "tienda" creada (si no existía)');
    });

    this.connection.query(
      `
    CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50),
      description VARCHAR(50),
      price VARCHAR(50)
    )
  `,
      (err) => {
        if (err) {
          console.error('Error al crear la tabla "productos":', err);
          this.connection.end();
          return;
        }
        console.log('Tabla "productos" creada (si no existía)');
        this.connection.end(); // Cierra la conexión después de crear la tabla
      }
    );
  }


  async getAllProducts() {
    return new Promise((resolve, reject) => {
      this.connection.query("SELECT * FROM productos", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async createProduct(product) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO productos (name, description, price) VALUES (?, ?, ?)",
        [product.name, product.description, product.price],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.insertId);
          }
        }
      );
    });
  }

  async updateProduct(id, product) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "UPDATE productos SET name=?, description=?, price=? WHERE id=?",
        [product.name, product.description, product.price, id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows > 0);
          }
        }
      );
    });
  }

  async deleteProductById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "DELETE FROM productos WHERE id=?",
        [id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows > 0);
          }
        }
      );
    });
  }
}


module.exports = MySQLDB;
