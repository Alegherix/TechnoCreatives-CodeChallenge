import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Storefront, NotFound, ProductPage, Layout } from './components';
import { UrqlProvider } from './provider';

const App = () => {
  return (
    <BrowserRouter>
      <UrqlProvider apiEndpoint={process.env.REACT_APP_GRAPHQL_ENDPOINT}>
        <Layout>
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </UrqlProvider>
    </BrowserRouter>
  );
};

export default App;
