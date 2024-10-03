"use client";
import Elevator from "@/components/mall/elevator";
import Perspective1 from "@/components/mall/perspective1";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Vendors } from "@/types/products";
import Loading from "@/components/loading";
import useWindowDimensions from "@/hooks/dimentions";
import FlipPhone from "@/components/mall/flipPhone";

interface GroupedVendors {
  gold: Vendors[];
  silver: Vendors[];
  raw: Vendors[];
}
function Page() {
  const [middleButton, setMiddleButton] = useState<boolean>(false);
  const [elev, setElev] = useState<boolean>(false);
  const [floor, setFloor] = useState<string>("gold");
  const [styledVendors, setStyledVendors] = useState<Vendors[]>([]);
  const [groupedVendors, setGroupedVendors] = useState<GroupedVendors>({
    gold: [],
    silver: [],
    raw: []
  });

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    const getVendors = async () => {
      const vendorsCollection = collection(firestore, 'vendors');
      const q = query(vendorsCollection, where('chosenShopStyle', '!=', null));

      try {
        const querySnapshot = await getDocs(q);
        
        // Map the documents and include the id
        const vendors: Vendors[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }) as Vendors);

        // Group vendors by chosenShopStyle
        const groupedVendors = vendors.reduce((acc, vendor) => {
          const style = vendor.chosenShopStyle.split('/')[2]; // Extract style part (gold/silver/raw)
          if (style === 'gold') {
            acc.gold.push(vendor);
          } else if (style === 'silver') {
            acc.silver.push(vendor);
          } else if (style === 'raw') {
            acc.raw.push(vendor);
          }
          return acc;
        }, { gold: [], silver: [], raw: [] } as GroupedVendors);

        // Sort each group by JoinDate (assuming it's a timestamp)
        const sortByJoinDate = (vendors: Vendors[]) => {
          return vendors.sort((a, b) => b.joinDate.seconds - a.joinDate.seconds);
        };

        // Apply sorting to each group
        groupedVendors.gold = sortByJoinDate(groupedVendors.gold);
        groupedVendors.silver = sortByJoinDate(groupedVendors.silver);
        groupedVendors.raw = sortByJoinDate(groupedVendors.raw);

        // Set the state for each vendor group
        setStyledVendors(vendors); // Set all vendors if needed
        setGroupedVendors(groupedVendors);

      } catch (error) {
        console.error("Error fetching vendors: ", error);
      }
    };

    getVendors();
  }, []);

  if (styledVendors.length > 0) {
    return (
      <main
        className={`
          h-[100vh] w-[100vw]
          flex items-end
        `}
      >
        <div className={`
          fixed
          ${height < 450 && "z-30"}
        `} style={{
          height: height < 450 ? "100vh" : "calc(100vh - 80px)"
        }}>
          {
          height > width ? <FlipPhone/> :
          <div className="h-full w-full flex items-center justify-center">
            <Perspective1
              middleButton={middleButton}
              setMiddleButton={setMiddleButton}
              setElev={setElev}
              groupedVendors={groupedVendors}
              floor={floor}
            />
            <Elevator
              elev={elev}
              setElev={setElev}
              setFloor={setFloor}
              floor={floor}
              setMiddleButton={setMiddleButton}
            />
          </div>
          }
        </div>
      </main>
    );
  }
  return <Loading/> 
}

export default Page;