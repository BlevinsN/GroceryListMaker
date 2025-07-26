//App.js

import axios from 'axios';
import './App.css';

//data will be the string we send from our server
const apiCall = () => {
  axios.get('http://localhost:3000/users').then((response) => {
    //this console.log will be in our frontend console
    return response.text();
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={apiCall}>Show Users</button>
      </header>
    </div>
  );
}

export default App;
