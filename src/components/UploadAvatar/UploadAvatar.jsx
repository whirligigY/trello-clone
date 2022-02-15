import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useAuth } from '../../contexts/Auth';

import "./uploadAvatar.css";

const UploadAvatar = () => {
  const [file, setFile] = useState(null);
  const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];
  const { user, client } = useAuth();
  useEffect(() => {
    if (file) {
        client
        .storage
          .from('avatars')
          .upload('/avatar1.jpg', file, {
            cacheControl: '3600',
            upsert: false
          })
    }
  }, [file]);

  const handleChange = (f) => {
    setFile(f[0]);
    console.log(f[0]);
  };
  return (
    <Modal className="upload_modal" show={false}>
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