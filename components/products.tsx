import { useEffect, useState, useRef, useCallback } from "react";
import Loading from "./loading";
import Product from "./product";
import { collection, getDocs, query, where, orderBy, startAfter, limit } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

export interface ProductAttr {
  id: string;
  name: string;
  description: string;
  images: string[];
  brandDocID: string;
  docID: string;
  price: number;
  category: string;
}

interface Prop {
  brandId: string;
  search: string;
  categories: string[];
  price: number[];
  height: number;
}

interface Vendor {
  id: string;
  name: string;
  logo: string;
  docID: string;
  // Add other vendor fields if necessary
}

const Products = ({ brandId, search, categories, price, height }: Prop) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<ProductAttr[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [lastVisible, setLastVisible] = useState<any>(null); // Store the last document snapshot for pagination

  const observerRef = useRef<HTMLDivElement | null>(null);

  const PRODUCTS_BATCH_SIZE = 10; // Fetch products in batches of 10

  // Fetch approved vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const vendorsCollection = collection(firestore, "vendors");
        const approvedVendorsQuery = query(vendorsCollection, where("status", "==", "approved"));
        const vendorsSnapshot = await getDocs(approvedVendorsQuery);
        const vendorsList: Vendor[] = vendorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          docID: doc.id, // Using doc.id as the docID
          ...doc.data(),
        })) as Vendor[];
        setVendors(vendorsList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVendors();
  }, []);

  // Fetch products based on approved vendors with pagination
  const fetchProducts = useCallback(
    async (isInitialFetch = false) => {
      try {
        const productsCollection = collection(firestore, "products");
        let productQuery = query(
          productsCollection,
          orderBy("name"),
          limit(PRODUCTS_BATCH_SIZE)
        );

        if (!isInitialFetch && lastVisible) {
          // Continue from the last product fetched
          productQuery = query(
            productsCollection,
            orderBy("name"),
            startAfter(lastVisible),
            limit(PRODUCTS_BATCH_SIZE)
          );
        }

        const productsSnapshot = await getDocs(productQuery);
        const productsList: ProductAttr[] = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductAttr[];

        // Filter products whose brandDocID matches the approved vendor's docID
        const filteredProducts = productsList.filter((product) =>
          vendors.some((vendor) => vendor.docID === product.brandDocID)
        );

        setProducts((prevProducts) => [...prevProducts, ...filteredProducts]);

        if (productsSnapshot.docs.length < PRODUCTS_BATCH_SIZE) {
          setHasMore(false); // No more products to load
        }

        setLastVisible(productsSnapshot.docs[productsSnapshot.docs.length - 1]);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error(error);
      }
    },
    [vendors, lastVisible]
  );

  useEffect(() => {
    if (vendors.length > 0) {
      fetchProducts(true); // Fetch initial batch of products
    }
  }, [vendors, fetchProducts]);

  // IntersectionObserver callback to load more products when reaching the bottom
  const loadMoreProducts = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        fetchProducts();
      }
    },
    [fetchProducts, hasMore, loading]
  );

  // Set up IntersectionObserver to trigger when scrolling to the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(loadMoreProducts, {
      root: null,
      rootMargin: "200px", // Start loading more when 200px from the bottom
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loadMoreProducts]);

  if (loading && products.length === 0) {
    return <Loading />;
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categories.length === 0 || categories.includes(product.category);
    const matchesPrice = product.price >= price[0] && product.price <= price[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div
      className="flex flex-wrap justify-around overflow-y-scroll pb-24"
      style={{
        maxHeight: `calc(100vh - ${height}px)`,
      }}
    >
      {filteredProducts.map((product, index) => {
        if (brandId === "all" || brandId === product.brandDocID) {
          return (
            <div
              key={index}
              className="max-w-[48%] w-[200px] xl:w-[18%] h-[150px] mb-[60px] mx-[1%] mt-5"
            >
              <Product product={product} res={300} />
            </div>
          );
        }
        return null;
      })}
      {/* Loading indicator for loading more products */}
      <div ref={observerRef} className="w-full h-[50px] flex justify-center items-center">
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default Products;