import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { firestore } from "./firebase";

// Fetch approved vendors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchVendors = async (vendorID: any = null) => {
  try {
    // Reference to the vendors collection
    const vendorsRef = collection(firestore, "vendors");

    // Create a base query for approved vendors
    const approvedVendorsQuery = query(vendorsRef, where("status", "==", "approved"));

    // If a vendorID is provided, add an additional filter
    const finalQuery = vendorID
      ? query(approvedVendorsQuery, where("vendorID", "==", vendorID))
      : approvedVendorsQuery;

    // Execute the query
    const querySnapshot = await getDocs(finalQuery);

    // Extract data from the query result
    const approvedVendors = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(approvedVendors);
    return approvedVendors;
  } catch (error) {
    console.error("Error fetching approved vendors:", error);
    throw error;
  }
};

// Fetch products based on approved vendors or specific vendorID, with an optional limit
const fetchProducts = async (vendorID?: string, limitNum?: number) => {
  try {
    let approvedVendorIds: string[] = [];

    // If a specific vendorID is provided, use that vendor
    if (vendorID) {
      approvedVendorIds = [vendorID];
    } else {
      // Otherwise, fetch all approved vendors
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const approvedVendors: any[] = await fetchVendors();
      approvedVendorIds = approvedVendors.map((vendor) => vendor.docID);

      if (approvedVendorIds.length === 0) {
        console.log("No approved vendors found.");
        return [];
      }
    }

    // Reference to the products collection
    const productsRef = collection(firestore, "products");

    // Create the base query to fetch products where brandDocID matches any approved vendor ID
    let productsQuery = query(productsRef, where("brandDocID", "in", approvedVendorIds));

    // Apply limit to the query if a limit is specified
    if (limitNum) {
      productsQuery = query(productsQuery, limit(limitNum));
    }

    // Execute the query
    const productsSnapshot = await getDocs(productsQuery);

    // Extract data from the query result
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export { fetchVendors, fetchProducts };