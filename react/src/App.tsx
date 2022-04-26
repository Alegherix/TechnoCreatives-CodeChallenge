import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, NotFound, ProductPage, Store } from './components';
import { StoreProvider, UrqlProvider } from './provider';

const App = () => {
  return (
    <BrowserRouter>
      <UrqlProvider apiEndpoint={process.env.REACT_APP_GRAPHQL_ENDPOINT}>
        <StoreProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Store />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </StoreProvider>
      </UrqlProvider>
    </BrowserRouter>
  );
};

export default App;
