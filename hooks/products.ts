import { useEffect, useMemo, useState } from 'react';
import useVendors from './vendors';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

// Define Product type
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

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [vendors] = useVendors();

  // Memoize vendorIds to avoid re-render loops
  const vendorIds = useMemo(() => vendors.map((vendor) => vendor.docID), [vendors]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const db = getFirestore();

        const allProducts: Product[] = [];
        for (const vendorId of vendorIds) {
          const q = query(
            collection(db, 'products'),
            where('brandDocID', '==', vendorId)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            allProducts.push({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) });
          });
        }

        const sortedProducts = allProducts.sort((a, b) => a.name.localeCompare(b.name));

        if (isMounted) {
          setProducts(sortedProducts);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (vendorIds.length > 0) {
      fetchProducts();
    }

    return () => {
      isMounted = false;
    };
  }, [vendorIds]);

  return { products, loading, error }; // Return as object for clarity
};

export default useProducts;