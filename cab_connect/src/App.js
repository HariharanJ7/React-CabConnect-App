import './App.css';
import "./components/Assets/css/bootstrap.css";
import "./components/Assets/fonts/css/fontawesome-all.min.css";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Driverlist from './components/Pages/Driverlist';
import moment from 'moment';
import sky from './components/Assets/images/sky.png';
 
const { Footer, Content } = Layout;

function App() {
  // const [deviceNo,setDeviceNo] = useState("");
  var navigate = useNavigate();
  const locationval = useLocation();
  // const locationval = '';
  // console.log(locationval);

  // axios.post(locationval)
  //   .then(res => {
  //     console.log(res.data);
  //     setDeviceId(res.data);
  //   })
  //   .catch(err => {
  //     // console.log(err);
  //   })

  return (
    <Layout id="page">
      <Content>
        <Driverlist />
      </Content>
      <Footer className='skfooter' style={{ textAlign: 'center' }}>
        ©{moment().format("YYYY")}  <img src={sky} alt="skyhms" className="skimg" />. All Rights Reserved.
      </Footer>
    </Layout>
  );
}

export default App;
