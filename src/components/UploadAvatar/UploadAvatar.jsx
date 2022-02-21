import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import { useAuth } from '../../contexts/Auth';

import "./uploadAvatar.css";

const UploadAvatar = ({ visible, closeHandle }) => {
  const [file, setFile] = useState(null);
  const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];
  const { user, client } = useAuth();

  const saveAvatar = () => {
    if (file) {
      client
      .storage
        .from('avatars')
        .upload(`public/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        })
      const { publicURL, error } = client
        .storage
        .from('avatars')
        .getPublicUrl(`public/${file.name}`)
        saveAva(publicURL)
    }
  }

  const saveAva = async (url) => {
    await client.from('profiles').update({ avatar_url: url }).eq('id', user.id);
    closeHandle();
  };
  const handleChange = (f) => {
    setFile(f);
  };
  return (
    <Modal className="upload_avatar" show={visible}>
      <Modal.Header className="upload_header" closeButton onClick={closeHandle}>
      </Modal.Header>
      <Modal.Body className="upload_modal_content">
          <FileUploader
            multiple={false}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
          <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
          <Button variant='outline-primary' onClick={saveAvatar}>Ok</Button>
      </Modal.Body>
    </Modal>
  );
}

export {UploadAvatar};