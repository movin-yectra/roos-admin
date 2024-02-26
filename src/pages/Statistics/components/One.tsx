import axios from "axios";
import React, { useState } from "react";

const YourComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (file) {
      try {
        // Create a new FormData object
        const formData = new FormData();
        formData.append("image", file);

        // // Send the binary image data to a server endpoint using Axios
        // const response = await axios.post("your-api-endpoint", formData);

        // Handle the response from the server as needed
        console.log(formData);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
};

export default YourComponent;
