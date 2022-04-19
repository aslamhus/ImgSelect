import React, { useState, useEffect } from 'react';
import { FileSelect } from '@aslamhus/fileselect';
import { FileArrowUp } from 'react-bootstrap-icons';
import './img-select.css';

const ImgSelect = ({ empty, children, onFileReady, img, style }) => {
  // selected image can be an image object, a file url or a data url, or a react component
  const [selectedImage, setSelectedImage] = useState(img || null);

  useEffect(() => {
    // if an initial image is provided make it the selected image
    if (img != selectedImage) {
      setSelectedImage(img);
    }
  }, [img]);

  const selectImage = (event) => {
    const fs = new FileSelect('image/*');
    fs.select().then((files) => {
      fs.readFiles(files).then((readFiles) => {
        const [file] = readFiles;
        setSelectedImage(file.data);
        // fileData access point
        if (onFileReady instanceof Function) {
          onFileReady(file);
        }
      });
    });
  };

  const displaySelectedImage = () => {
    if (!selectedImage) return null;
    if (typeof selectedImage == 'string') {
      return (
        <div
          className="img-preview"
          style={{ backgroundImage: `url(${selectedImage})` || 'none', ...style }}
        ></div>
      );
    } else if (typeof selectedImage == 'object' && selectedImage.src) {
      return (
        <div
          className="img-preview"
          style={{ backgroundImage: `url(${selectedImage.src})` || 'none', ...style }}
        ></div>
      );
    } else if (React.isValidElement(selectedImage)) {
      return (
        <div className="img-preview" style={{ ...style }}>
          {selectedImage}
        </div>
      );
    }
    return null;
  };

  if (empty) return <div className="img-select-container-empty">{children}</div>;
  return (
    <div onClick={selectImage} className="img-select-container">
      {displaySelectedImage()}
      <FileArrowUp></FileArrowUp>
    </div>
  );
};

export default ImgSelect;
