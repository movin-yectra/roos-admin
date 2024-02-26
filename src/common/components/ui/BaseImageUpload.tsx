import React, { ChangeEvent, useRef, useState } from "react";
import { RoosBaseServices } from "../../services";

interface IProps {
  bgClass?: string;
  getImageData?: (data: any) => void; // Define the type of getImageData function.
  title?: string;
  formik?: any;
  imageValue?: any;
}

const BaseImageUpload: React.FC<IProps> = ({
  bgClass,
  getImageData,
  title,
  formik,
  imageValue,
}) => {
  const [, setSelectedImage] = useState<any>(
    imageValue ? imageValue : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const _services = new RoosBaseServices();

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file: any = event.target.files?.[0];
    let reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      let image: any = reader.result;

      if (reader.result) {
        const base64 = image.replace(/^data:image\/[a-z]+;base64,/, "");
        _services
          .getBaseToImage(base64)
          .then((response) => {
            if (getImageData) {
              getImageData(response.imageResponse);
            }
          })
          .catch(() => {
            if (getImageData) {
              getImageData("");
            }
          });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDivClick = (): void => {
    fileInputRef.current?.click();
  };
  // console.log(selectedImage);

  return (
    <div className={`card border-0 ${bgClass}`}>
      <div
        className={`card-body ${
          formik ? "uploadInputBox-error" : "uploadInputBox"
        }`}
        onClick={handleDivClick}
      >
        <input
          className="border-0 d-none"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
        />
        <div>
          {imageValue === "" || imageValue === undefined ? (
            <p
              style={{ marginTop: "30px" }}
              className={`ms-2 ${formik ? "text-danger" : "text-black-50"}`}
            >
              {title}
            </p>
          ) : (
            <img
              className="imageText"
              src={imageValue}
              alt="Uploaded"
              width={120}
              height={120}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseImageUpload;
