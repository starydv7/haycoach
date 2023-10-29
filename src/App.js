import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <Home/>
      <Routes>
    <Route path="/list"element={<List/>}/>
    </Routes>
    </div>
  );
}

export default App;
