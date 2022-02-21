import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Alert variant="success">
      <Alert.Heading>404</Alert.Heading>
      <p>Sorry, page is not found</p>
    </Alert>
  );
};

export { NotFound };
