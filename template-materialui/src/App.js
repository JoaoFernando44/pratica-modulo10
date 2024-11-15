import Header from "./components/header";
import ListarTarefa from "./pages/tarefa/ListarTarefa";
import React from 'react'; 
import TaskMenu from './components/TaskMenu';


function App() {
  return (
    <div className="App">
      <Header />
      <ListarTarefa />
      <TaskMenu />
    </div>
  );
}

export default App;
