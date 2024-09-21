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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const db = getFirestore(); // Initialize Firestore

        // Loop through each vendor ID and fetch products
        const allProducts: Product[] = [];
        for (const vendorId of vendorIds) {
          const q = query(
            collection(db, 'products'), // Assuming 'products' is the collection
            where('brandDocID', '==', vendorId) // Assuming 'brandDocID' is the field linking to the vendor
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            allProducts.push({ id: doc.id, ...doc.data() } as Product); // Push each product to allProducts array
          });
        }

        setProducts(allProducts);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch products if we have vendor IDs
    if (vendorIds.length > 0) {
      fetchProducts();
    }
  }, [vendorIds]);

  return [products, loading, error] as const; // Return as array
};

export default useProducts;