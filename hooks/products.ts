import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../lib/firebase'; // Make sure to import your Firestore instance

// Define the Product type
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  brandDocID: string;
  docID: string;
  category: string;
}

// Create the custom hook
const useProducts = (): [Product[], boolean, Error | null] => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, "products"); // Reference to the 'products' collection
        const productsSnapshot = await getDocs(productsCollection);
        const productsList: Product[] = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsList); // Set the state with the fetched data
      } catch (error) {
        setError(error as Error); // Set the error state if there's an issue
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchProducts();
  }, []);

  return [products, loading, error];
};

export default useProducts;