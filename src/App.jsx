import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListLivre from './components/ListLivre';
import { EmpruntProvider } from './context/EmpruntContext'; 

function App() {
  return (
    <EmpruntProvider>
      <div className="App">
        <ListLivre />
      </div>
    </EmpruntProvider>
  );
}

export default App;
