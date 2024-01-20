import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './page/home';
import HomeMarketingPage from './page/marketing';

function App() {
  return (
    <Routes>
      <Route path='/*' element={<HomeMarketingPage />} />
      <Route path='/chat' element={<Home />} />
    </Routes>
  )
}

export default App;
