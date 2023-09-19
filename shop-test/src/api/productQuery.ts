import { ProductFormType, ProductType } from '../types/typeProduct'
import api from './api'

export const newProduct = async (productData: ProductFormType) => {
    try {
        if (productData.name) {
        let respuestaBack = await api("post", `/shop/create-product`, {
            productData: productData,
        });
        return respuestaBack.data;
        }else{
        return { status: 505 };
        }
    } catch (err) {
        console.log("error createNewHistory", err);
    }
}

export const deleteProduct = async (id: number) => {
    try {
        let respuestaBack = await api("post", `/shop/delete-product`,{
            id: id,
        });
        return respuestaBack.data;
    } catch (err) {
        console.log("error deleteProduct", err);
    }
}

export const updateProduct = async (productData: ProductType) => {
    try {
        if (productData.name) {
        let respuestaBack = await api("post", `/shop/update-product`, {
            productData: productData,
        });
        return respuestaBack.data;
        }else{
        return { status: 505 };
        }
    } catch (err) {
        console.log("error updateProduct", err);
    }
}

export const getProducts = async () => {
    try {
        let respuestaBack = await api("get", `/shop/get-products`);
        return respuestaBack.data;
    } catch (err) {
        console.log("error getProduct", err);
    }
}

