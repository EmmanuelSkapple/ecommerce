import React, { useState } from 'react';
import './styles.css';
import { newProduct } from '../../api/productQuery';
import { ProductFormType } from '../../types/typeProduct';

interface Product {
  name: string;
  description: string;
  price: number;
}

interface Props {
    onCompleteProduct: () => void;
    onClose: () => void;
}

const CreateProductForm = ({onCompleteProduct, onClose} : Props) => {
  const [product, setProduct] = useState<ProductFormType>({
    name: '',
    description: '',
    price: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
        e.preventDefault();
        const resProduct = await newProduct(product);
        if (resProduct?.status === '200') {
            onCompleteProduct();
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div  className='overlays'>
    <div className="product-form">
      <h2>Crear Pedido</h2>
      <div onClick={()=>onClose()} className='close-btn-float'>
        x
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Crear Pedido</button>
      </form>
    </div>
    </div>

  );
};

export default CreateProductForm;
