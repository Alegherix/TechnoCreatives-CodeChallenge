import './App.css';
import ProductPage from './components/ProductPage/ProductPage';
import UrqlProvider from './provider/UrqlProvider';

const App = () => {
  return (
    <UrqlProvider apiEndpoint={process.env.REACT_APP_GRAPHQL_ENDPOINT}>
      <ProductPage />
    </UrqlProvider>
  );
};

export default App;
