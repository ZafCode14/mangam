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
  // Add other fields based on your Firestore document structure
}
interface Prop {
  brandId: string;
}
function Products({ brandId }: Prop) {
  const [products, loading] = useProducts();

  if (!loading) {
    return (
      <div className="flex flex-wrap justify-center overflow-scroll mt-10" style={{
        height: "calc(100vh - 240px)"
      }}>
        {
          products.map((product, index) => {
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