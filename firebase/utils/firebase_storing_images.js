const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const firebaseConfig = require("../config/firebaseConfig"); // Adjust the path to your config file

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

/**
 * Upload an image to Firebase Storage and return the download URL.
 * @param {string} filePath - The local path to the image file.
 * @param {string} destination - The destination path in Firebase Storage.
 * @returns {Promise<string>} - The download URL of the uploaded image.
 */
const uploadImage = async (filePath, destination) => {
  try {
    const storageRef = ref(storage, destination);
    const imageBuffer = await fs.promises.readFile(filePath);
    const uploadResult = await uploadBytes(storageRef, imageBuffer);
    const downloadURL = await getDownloadURL(uploadResult.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw new Error("Image upload failed");
  }
};

module.exports = { uploadImage };
