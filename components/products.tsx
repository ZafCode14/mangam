import Loading from "./loading";
import Product from "./product";
import useProducts from "@/hooks/products";

export interface ProductAttr {
  id: string;
  name: string;
  description: string;
  images: string[];
  brandDocID: string;
  docID: string;
  price: number;
  // Add other fields based on your Firestore document structure
}
interface Prop {
  brandId: string;
  search: string;
  categories: string[];
  price: number[];
  height: number;
}
function Products({ brandId, search, categories, price, height }: Prop) {
  const [products, loading] = useProducts();

  if (!loading) {

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());

        // Check if there are no categories selected or if the product's category matches the selected categories
        const matchesCategory = categories.length === 0 || categories.includes(product.category);

        // Check if the product price is within the selected price range
        const matchesPrice = product.price >= price[0] && product.price <= price[1];

        // Product must match search, category, and price
        return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
      <div className="flex flex-wrap justify-around overflow-y-scroll mt-[20px]" style={{
        height: `calc(100vh - ${height}px)`
      }}>
        {
          filteredProducts.map((product, index) => {
            if (brandId === "all") {
              return (
                <div key={index} className="w-[19%] h-[100px] mb-20">
                  <Product product={product} res={300}/>
                </div>
              )
            } else  {
              if (brandId === product.brandDocID) {
                return (
                <div key={index} className="w-[19%] h-[100px] mb-20">
                  <Product product={product} res={300}/>
                </div>
                )
              }
            }
          })
        }
      </div>
    );
  } else {
    return (
      <Loading/>
    )
  }
}

export default Products;