const mysql = require("mysql");

class ShopRepository {
  constructor() {
    this.productList = [
      {
        id: 123,
        name: "product 1",
        description: "description 1",
        price: 100
      },
      {
        id: 124,
        name: "product 2",
        description: "description 2",
        price: 200
      }
    ];
    // this.db = new MySQLDB();
  }
  async getProducts() {
    try {
    //   const products = await this.db.getAllProducts();
      return { status: "200", products: this.productList, error: null };
    } catch (error) {
      console.log("error in GetProducts => ", error);
      return { status: "505", products: [], error: error };
    }
  }
  async createProduct(product) {
    try {
    //   const id = await this.db.createProduct(product);
      this.productList.push(product);
      return { status: "200", error: null };
    } catch (error) {
      console.log("error in CreateProduct => ", error);
      return { status: "505", products: [], error: error };
    }
  }
  async deleteProduct(id) {
    try {
    //   const result = await this.db.deleteProductById(id);
      this.productList = this.productList.filter(
        (product) => product.id !== id
      );
      return { status: "200", error: null };
    } catch (error) {
      console.log("error in DeleteProduct => ", error);
      return { status: "505", products: [], error: error };
    }
  }
  async editProduct(product) {
    try {
    //   const result = await this.db.updateProduct(product.id, product);
      this.productList = this.productList.map((localProduct) => {
        if (localProduct.id === product.id) {
          return product;
        }
        return localProduct;
      });
      return { status: "200", error: null };
    } catch (error) {
      console.log("error in EditProduct => ", error);
      return { status: "505", products: [], error: error };
    }
  }
}

module.exports = ShopRepository;
