import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

// import { Base64ToBlob } from './components/Base64ToBlob';
// import axios from 'axios';
// import List from './components/List';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Axios from './services/axios';

import Home from './views/Home';
import Sign from './views/Sign';
import Signature from './views/Signature';
import Popup from './components/Popup';

function App() {
  const [ orders, setOrders ] = useState([])
  const [ isOpen, setIsOpen ] = useState(false)
  const [ msg, setMsg ] = useState("")
  const [ order, setOrder ] = useState({})

  useEffect(() => {
    fetchOrders()
  }, [])

  // Fetching all tasks
  const fetchOrders = async () => {
    try {
      const data = await Axios.getOrders()
      const dataWithId = data.map((d, i) => {
          return { ...d, id: i }
      })
      setOrders(dataWithId)
      setIsOpen(true)
      setMsg("Successfully fetched orders")
    //     axios('http://195.148.22.38:8777/api/').then(
    //     (res) => {
    //         const data = res.data.data
    //         data.forEach(function (dataItem) {
    //         dataItem.rowHeight = 100;
    //         });
    //         setAllSignatures(data);
    //         console.log(res.data.data);
    //     },
    //     (error) => {
    //         console.log('Error fetching data: ', error);
    //         setMsg('Could not fetch the data: ', error);       
    //         setOpen(true);
    //     }
    //     );
    } catch (error) {
        console.log(error);
        setIsOpen(true)
        setMsg(`Can't fetch orders, ${error}`)
        // setOpen(true);
        // setMsg('Something went wrong!');
    }
  };
  // const [allSignatures, setAllSignatures] = useState([])
  // const [open, setOpen] = useState(false);
  // const [msg, setMsg] = useState('');
  // const [showAllSig, setShowAllSig] = useState(false);
  // const [showOneSig, setShowOneSig] = useState(false);

  

  // let onClickPreviousBtn = _ => {
  //   setShowOneSig(false);
  //   setOpen(false)
  // }

  //Rendering
  // let defaultContent;

  // if (!showOneSig) {
  //   defaultContent = <><SignBoard
  //     showAllSig={showAllSig}
  //     setShowAllSig={setShowAllSig}
  //      />
  //     <List
  //       showAllSig={showAllSig}
  //       setShowOneSig={setShowOneSig}
  //       allSignatures={allSignatures}
  //       setAllSignatures={setAllSignatures}
  //       open={open}
  //       setOpen={setOpen}
  //       msg={msg}
  //       setMsg={setMsg} /></>
  // }
  // else {
  //   console.log(showOneSig);
  //   defaultContent = <><img
  //     src={`data:image/png;base64,${showOneSig.image}`}
  //     alt="Signature"
  //     width={"80%"}
  //     style={{ border: "1px solid black",backgroundColor:"white" }}
  //   />
  //   <h3>{showOneSig.id}</h3>
  //   <p>{new Date(showOneSig.signed_at).toLocaleString()}</p>
  //   <button onClick={_ => onClickPreviousBtn()}>back to previous screen</button>
  //   </>
  // }


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home orders={orders} setOrder={setOrder} />} />
          <Route path="/signatures" element={<Signature orders={orders} />} />
          <Route path="/sign/:orderId" element={<Sign orders={orders} setOrders={setOrders} order={order} />} />
        </Routes>
      </Router>

      <Popup isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />
    </div>
  );
}

export default App;
