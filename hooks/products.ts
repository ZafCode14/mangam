import { useEffect, useMemo, useState } from 'react';
import useVendors from './vendors';
import { getFirestore, collection, getDocs, query, where, limit } from 'firebase/firestore';

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

const useProducts = (limitCount: number = 10) => { // Default to 10 products
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
            where('brandDocID', '==', vendorId),
            limit(limitCount) // Use the limit passed to the hook
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            allProducts.push({ id: doc.id, ...doc.data() } as Product);
          });
        }

        const sortedProducts = allProducts.sort((a, b) => a.name.localeCompare(b.name));
        
        // Only set products if the component is still mounted
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
      isMounted = false; // Cleanup function sets isMounted to false
    };
  }, [vendorIds, limitCount]); // Add limitCount to dependencies

  return { products, loading, error }; // Return as object for clarity
};

export default useProducts;