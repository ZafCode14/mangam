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
  category: string; // Added category property
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
      const matchesCategory = categories.length === 0 || categories.includes(product.category);
      const matchesPrice = product.price >= price[0] && product.price <= price[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
      <div className={`
        flex flex-wrap justify-around
        overflow-y-scroll 
      `} style={{
        maxHeight: `calc(100vh - ${height}px)`
      }}>
        {
          filteredProducts.map((product, index) => {
            if (brandId === "all") {
              return (
                <div key={index} className="max-w-[48%] w-[200px] xl:w-[18%] h-[150px] mb-[60px] mx-[1%] mt-5">
                  <Product product={product} res={300}/>
                </div>
              )
            } else {
              if (brandId === product.brandDocID) {
                return (
                  <div key={index} className="max-w-[48%] w-[250px] xl:w-[18%] h-[150px] mb-[60px] mx-[1%] mt-5">
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