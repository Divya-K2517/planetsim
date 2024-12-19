// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
// import P5 from "./p5/og_sketch"
// import P5embed from './p5embed';
// import Header from './Header';
// import Directions from './Directions';
// import ScriptTag from 'react-script-tag';

// function App() {

//   let i = "hello world";
//   console.log(i);
//   return (
//     <div className="App" id='root'>
//       <BrowserRouter>


//         <Routes>
//         {/* loads in p5 */}
//           <Route path = "/" element={<P5embed/>}/> 




//         </Routes>

//       </BrowserRouter>
 
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//              <Header />
//             <Directions />
//       <ScriptTag type="text/javascript" src="sketch.js" />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import './App.css';
import Header from './Header';
import Directions from './Directions';
import PlanetSimulation from './sketch';

function App() {
  return (
    <div className="App">
      <Header />
      <Directions />
      <PlanetSimulation />
    </div>
  );
}

export default App;