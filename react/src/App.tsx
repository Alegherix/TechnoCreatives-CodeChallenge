import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import ProductPage from './components/Product/ProductPage';
import Storefront from './components/Store/Storefront';
import UrqlProvider from './provider/UrqlProvider';

const App = () => {
  return (
    <BrowserRouter>
      <UrqlProvider apiEndpoint={process.env.REACT_APP_GRAPHQL_ENDPOINT}>
        <Layout>
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/products/:productId" element={<ProductPage />} />
          </Routes>
        </Layout>
      </UrqlProvider>
    </BrowserRouter>
  );
};

export default App;
