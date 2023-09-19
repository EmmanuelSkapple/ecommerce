import "./styles.css";
import { ProductType } from "../../types/typeProduct";
import { ToastContainer, toast } from "react-toastify";
import { deleteProduct, getProducts } from "../../api/productQuery";
import { useEffect, useState } from "react";
import CreateProductForm from "../../components/newProduct";

const Productos = () => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allProducts, setAllProducts] = useState([] as ProductType[]);

  const getProductList = async () => {
    setLoading(true);
    console.log("getProductList");

    const resProduct = await getProducts();
    setAllProducts(resProduct.products);
    setLoading(false);
  };

  useEffect(() => {
    getProductList();
  }, []);

  const onDeleted = async (product: ProductType) => {
    setDeleting(true);
    const res = await deleteProduct(product.id);
    if (res?.status === "200") {
      toast.success("Producto eliminado correctamente");
      getProductList();
    } else {
      toast.error("Error al eliminar el producto");
    }
    setDeleting(false);
  };

  return (
    <div className="products-container">
      <h2>Administrador de tienda</h2>
      <div onClick={() => setShowForm(!showForm)} className="float-plus-btn">
        +
      </div>
      {showForm && <CreateProductForm onClose={()=>setShowForm(false)} onCompleteProduct={getProductList} />}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Config</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    onClick={() => onDeleted(product)}
                    disabled={deleting}
                  >
                    {deleting ? "Eliminando" : "Eliminar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer
        limit={1}
        position="bottom-center"
        autoClose={3000}
        toastClassName="toast"
      />
    </div>
  );
};

export default Productos;
