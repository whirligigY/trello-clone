import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";

import "./uploadAvatar.css";

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

const UploadAvatar = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    console.log(file[0].name);
  };
  return (
    <Modal className="upload_modal" show={true}>
      <Modal.Body className="upload_modal_content" >
          <FileUploader
            multiple={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      </Modal.Body>
    </Modal>
  );
}

export {UploadAvatar};