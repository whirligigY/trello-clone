import React from 'react';
import { Alert } from 'react-bootstrap';
import './notFound.css';

const NotFound = () => {
  return (
    <Alert variant="success" className="not-found">
      <div className="no-found__alert-msg">
        <Alert.Heading>404</Alert.Heading>
        <p>Sorry, page is not found</p>
      </div>
    </Alert>
  );
};

export { NotFound };
