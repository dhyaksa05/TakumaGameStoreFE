import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getGameCategories = async () => {
    const response = await API.get("/categories");
    return response.data;
}

// 2. Tambahan buat Abi (Ambil Diamond per Game)
export const getProductsByCategoryId = async (categoryId: number) => {
  const response = await API.get(`/products/category/${categoryId}`);
  return response.data;
};

export interface TransactionPayload {
  userId: number;
  productId: number;
  targetId: string;
  zoneId: string;
  paymentMethod: string;
}

export const createTransaction = async (payload: TransactionPayload) => {
  const response = await API.post('/transactions', payload);
  return response.data; 
};


export const updateTransactionStatus = async (id: number, status: string) => {
  const response = await API.put(`/transactions/${id}/status?status=${status}`);
  return response.data;
};