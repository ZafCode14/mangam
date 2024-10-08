"use client";
import Elevator from "@/components/mall/elevator";
import Perspective1 from "@/components/mall/perspective1";
import { firestore } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Suspense, useEffect, useState } from "react";
import { Vendors } from "@/types/products";
import Loading from "@/components/loading";
import useWindowDimensions from "@/hooks/dimentions";
import FlipPhone from "@/components/mall/flipPhone";
import RendorChoseVendor from "@/components/mall/rendorChoseVendor";
import { useSearchParams } from "next/navigation";

interface GroupedVendors {
  gold: Vendors[];
  silver: Vendors[];
  raw: Vendors[];
}
function Page() {
  const [zoomInButton, setZoomInButton] = useState<boolean>(false);
  const [elev, setElev] = useState<boolean>(false);
  const [floor, setFloor] = useState<string>("gold");
  const [styledVendors, setStyledVendors] = useState<Vendors[]>([]);
  const [fromTo, setFromTo] = useState<{from: number, to: number}>({from: 0, to: 4})
  const searchParams = useSearchParams();
  const vendorId = searchParams.get('brand');

  const [groupedVendors, setGroupedVendors] = useState<GroupedVendors>({
    gold: [],
    silver: [],
    raw: []
  });
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    const getVendors = async () => {
      const vendorsCollection = collection(firestore, 'vendors');

      // Query vendors with status 'approved'
      const q = query(vendorsCollection, where('status', '==', 'approved'));

      try {
        const querySnapshot = await getDocs(q);

        // Map the documents and include the id
        const vendors: Vendors[] = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }) as Vendors)
          // Filter out vendors with null chosenShopStyle
          .filter(vendor => vendor.chosenShopStyle !== null);

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

        // Sort each group by joinDate (assuming it's a timestamp)
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

  const p1VendorCategories: Array<keyof GroupedVendors> = ['gold', 'silver', 'raw'];
  const p2VendorCategories: Array<keyof GroupedVendors> = ['gold', 'silver', 'raw'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendorImages: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vendorImages2: any = {};


  p1VendorCategories.forEach((category) => {
    // Adjust the corridor path for each category
    const corridorPathMap: Record<string, string> = {
      gold: `/images/mall/perspective1/gold/corridor.jpeg`,
      silver: `/images/mall/perspective1/silver/corridor.jpeg`,
      raw: `/images/mall/perspective1/raw/C-I.jpeg`,
    };

    if (groupedVendors[category]) {
      vendorImages[category] = {
        corridor: corridorPathMap[category], // Dynamically assign the corridor path
        vendor1: { mallView: `/images/mall/perspective1/${floor}/classic1.png` },
        vendor2: { mallView: `/images/mall/perspective1/${floor}/classic2.png` },
        vendor3: { mallView: `/images/mall/perspective1/${floor}/classic3.png` },
        vendor4: { mallView: `/images/mall/perspective1/${floor}/classic4.png` },
      };

      groupedVendors[category].forEach((vendor: Vendors, index: number) => {
        const shopStyle = vendor.chosenShopStyle.split('/')[3];
        const shopFloor = vendor.chosenShopStyle.split('/')[2];
        // Reset index + 1 to cycle between 1 and 4
        const viewIndex = (index % 4) + 1;

        vendorImages[category][`vendor${index + 1}`] = {
          vendor: vendor,
          mallView: `/images/mall/perspective1/${shopFloor}/${shopStyle}${viewIndex}.png`,
          frontView: `/images/mall/interior/${shopFloor}/${shopStyle}/front.jpeg`,
          rightView: `/images/mall/interior/${shopFloor}/${shopStyle}/right.jpeg`,
          leftView: `/images/mall/interior/${shopFloor}/${shopStyle}/left.jpeg`,
          middleView: `/images/mall/interior/${shopFloor}/${shopStyle}/middle.jpeg`,
          endView: `/images/mall/interior/${shopFloor}/${shopStyle}/end.jpeg`,
          banner: vendor.spots[`${vendor.chosenShopStyle}2.jpg`]?.[0].image,
        };
      });
    }
  });

  p2VendorCategories.forEach((category) => {
    // Adjust the corridor path for each category
    const corridorPathMap: Record<string, string> = {
      gold: `/images/mall/perspective2/gold/corridor.jpeg`,
      silver: `/images/mall/perspective2/silver/corridor.jpeg`,
      raw: `/images/mall/perspective2/raw/i.jpeg`,
    };

    if (groupedVendors[category]) {
      vendorImages2[category] = {
        corridor: corridorPathMap[category], // Dynamically assign the corridor path
        vendor3: { mallView: `/images/mall/perspective2/${floor}/classic1.png` },
        vendor4: { mallView: `/images/mall/perspective2/${floor}/classic2.png` },
      };

      groupedVendors[category].forEach((vendor: Vendors, index: number) => {
        const shopStyle = vendor.chosenShopStyle.split('/')[3];
        const shopFloor = vendor.chosenShopStyle.split('/')[2];
        // Reset index + 1 to cycle between 1 and 4
        const viewIndex = (index % 2) + 1;

        vendorImages2[category][`vendor${index + 1}`] = {
          vendor: vendor,
          mallView: `/images/mall/perspective2/${shopFloor}/${shopStyle}${viewIndex}.png`,
          frontView: `/images/mall/interior/${shopFloor}/${shopStyle}/front.jpeg`,
          rightView: `/images/mall/interior/${shopFloor}/${shopStyle}/right.jpeg`,
          leftView: `/images/mall/interior/${shopFloor}/${shopStyle}/left.jpeg`,
          middleView: `/images/mall/interior/${shopFloor}/${shopStyle}/middle.jpeg`,
          endView: `/images/mall/interior/${shopFloor}/${shopStyle}/end.jpeg`,
          banner: vendor.spots[`${vendor.chosenShopStyle}2.jpg`]?.[0].image,
        };
      });
    }
  });

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
          <div className="h-full w-screen flex items-center justify-center">
            {vendorId ?
              <div className="absolute h-[50vw] w-full flex justify-center items-center overflow-hidden">
                <RendorChoseVendor
                  allVendors={vendorImages}
                />
              </div> :
              <div className="w-full h-full flex items-center">
                <Perspective1
                  fromTo={fromTo}
                  setFromTo={setFromTo}
                  zoomInButton={zoomInButton}
                  setZoomInButton={setZoomInButton}
                  setElev={setElev}
                  p1={vendorImages}
                  p2={vendorImages2}
                  floor={floor}
                />
                <Elevator
                  elev={elev}
                  setFromTo={setFromTo}
                  setElev={setElev}
                  setFloor={setFloor}
                  floor={floor}
                  zoomInButton={zoomInButton}
                  setZoomInButton={setZoomInButton}
                />
              </div>
            }
          </div>
          }
        </div>
      </main>
    );
  }
  return <Loading/> 
}

export default function WrappedPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
}