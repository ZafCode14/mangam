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
}
function Products({ brandId, search, categories, price }: Prop) {
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
      <div className="flex flex-wrap justify-center overflow-scroll mt-10" style={{
        height: "calc(100vh - 240px)"
      }}>
        {
          filteredProducts.map((product, index) => {
            if (brandId === "all") {
              return (
                <div key={index} className="w-[175px] h-[100px] m-5 mb-14">
                  <Product product={product} res={300}/>
                </div>
              )
            } else  {
              if (brandId === product.brandDocID) {
                return (
                <div key={index} className="w-[180px] h-[100px] m-5 mb-14">
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