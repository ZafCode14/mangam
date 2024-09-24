import { firestore } from "@/lib/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

const putWishlist = async (userId: string, productId: string) => {
  try {
    // Reference to the user's document in the 'users' collection
    const userRef = doc(firestore, 'users', userId);

    // Now we can safely get the updated user document
    const updatedUserSnap = await getDoc(userRef);
    const updatedUserData = updatedUserSnap.data();
    const currentWishlist = updatedUserData?.wishlist || [];

    // Check if the product is already in the wishlist
    if (currentWishlist.includes(productId)) {
      console.log("Product is already in the wishlist");
      return "Product is already in the wishlist";
    }

    // Add the product to the wishlist
    await updateDoc(userRef, {
      wishlist: arrayUnion(productId)
    });

    console.log("Product added to the wishlist");
    return "Product added to wishlist";

  } catch (err) {
    console.error("Error adding product to wishlist: ", err);
    throw new Error("Failed to add to wishlist");
  }
};

const getWishlist = async (userId: string) => {
  try {
    // Reference to the user's document in the 'users' collection
    const userRef = doc(firestore, 'users', userId);

    // Fetch the document snapshot
    const userSnap = await getDoc(userRef);

    // Check if the document exists
    if (!userSnap.exists()) {
      console.log("No wishlist found for this user.");
      return []; // Return an empty array if the user does not exist
    }

    // Get the user's wishlist
    console.log("wishlist found");
    const userData = userSnap.data();
    const wishlist = userData.wishlist || []; // Default to an empty array if wishlist is not defined

    return wishlist;

  } catch (err) {
    console.error("Error retrieving wishlist: ", err);
    throw new Error("Failed to retrieve wishlist");
  }
};


export {putWishlist, getWishlist};