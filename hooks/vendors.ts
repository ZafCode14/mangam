import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../lib/firebase'; // Make sure to import your Firestore instance

// Define the Vendor type
interface Vendor {
  id: string;
  name: string;
  logo: string;
  docID: string;
  // Add other vendor fields if necessary
}

// Create the custom hook
const useVendors = (): [Vendor[], boolean, Error | null] => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorsCollection = collection(firestore, 'vendors');
        const approvedVendorsQuery = query(vendorsCollection, where('status', '==', 'approved')); // Add the 'status' filter
        const vendorsSnapshot = await getDocs(approvedVendorsQuery);
        const vendorsList: Vendor[] = vendorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vendor[];
        setVendors(vendorsList); // Set the state with the fetched data
      } catch (error) {
        setError(error as Error); // Set the error state if there's an issue
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchVendors();
  }, []);

  return [vendors, loading, error];
};

export default useVendors;