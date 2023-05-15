import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <SearchBar />
    </div>
    </ChakraProvider>
  );
}

export default App;
