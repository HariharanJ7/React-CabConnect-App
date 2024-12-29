import React ,{ useState , useEffect , Fragment } from "react";
import { styled } from '@mui/material/styles';
import { IdcardFilled } from "@ant-design/icons";
import "../Assets/css/bootstrap.css";
import "../Assets/fonts/css/fontawesome-all.min.css";
import $ from 'jquery';
// import "../Assets/js/custom.js";
// import "../Assets/js/bootstrap.min.js";
// import Assignimg from "../Assets/images/user.png";
import Startimg from "../Assets/images/stloc.png";
import Endimg from "../Assets/images/endloc.png";
import RedStartimg from "../Assets/images/redstloc.png";
import RedEndimg from "../Assets/images/redendloc.png";
import GreenStartimg from "../Assets/images/greenstloc.png";
import GreenEndimg from "../Assets/images/greenendloc.png";
import Planimg from "../Assets/images/plan.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture , faPlaneArrival , faRoute , faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Card, Radio , Collapse, Badge , Row , Col , Button , Input , DatePicker , Modal , Form , TimePicker, message } from "antd";

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import TodayIcon from '@mui/icons-material/Today';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import moment from 'moment';
import "./Driverlist.css";
import SteeringWheel from "./steerwheel";

const QontoConnectorBlue = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#1677ff',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#1677ff',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const QontoConnectorGreen = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#8cc152',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#8cc152',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const QontoConnectorRed = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#da4453',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#da4453',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const StartIcon = () => (
  <img src={Startimg} alt="Start" style={{ width: 24, height: 24 }} />
);

const EndIcon = () => (
  <img src={Endimg} alt="End" style={{ width: 24, height: 24 }} />
);

const RedStartIcon = () => (
  <img src={RedStartimg} alt="RedStart" style={{ width: 24, height: 24 }} />
);

const RedEndIcon = () => (
  <img src={RedEndimg} alt="RedEnd" style={{ width: 24, height: 24 }} />
);
const GreenStartIcon = () => (
  <img src={GreenStartimg} alt="GreenStart" style={{ width: 24, height: 24 }} />
);

const GreenEndIcon = () => (
  <img src={GreenEndimg} alt="GreenEnd" style={{ width: 24, height: 24 }} />
);

function Driverlist() {
  const [startform] = Form.useForm();
  const [endform] = Form.useForm();
  const [TripValue, setTripValue] = useState("0");
  const [TotalTripValue, setTotalTripValue] = useState("0");
  const [CompletedTripValue, setCompletedTripValue] = useState("0");
  const [TripData, setTripData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Flag to avoid duplicate fetches
  const [LoaderTripData, setLoaderTripData] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  // const [bookingId, setBookingId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverNo, setDriverNo] = useState('');
  const [tripStartKM, setTripStartKM] = useState('0');
  // const [tripStartTime, setTripStartTime] = useState('');
  // const [tripEndDate, setTripEndDate] = useState('');
  // const [tripEndTime, setTripEndTime] = useState('');

  const showStartModal = (bkid,tripdt) => {
    const tripdate = moment(tripdt).format('YYYY-MM-DD');
    const triptime = moment(tripdt).format('HH:mm');

    startform.setFieldsValue({
      bookingid: bkid,
      triptype: 'starttrip',
      tripstartdate: moment(tripdate, 'YYYY-MM-DD'), // Moment object for DatePicker
      tripstarttime: moment(triptime, 'HH:mm'), // Moment object for TimePicker
    });

    setIsStartModalOpen(true);
  };

  const handleStartOk = () => {
    startform
    .validateFields() // Validate form fields
    .then((values) => {
      // Handle form submission (if validation passes)
      console.log('Form Values:', values);

      const triptype = values.triptype;
      const bookingid = values.bookingid;
      const tripstartkm = values.tripstartkm;
      const tstd = values.tripstartdate;
      const tstt = values.tripstarttime;
      const tripstarttime = tstd.format("YYYY-MM-DD") + ' ' + tstt.format("HH:mm");
      // const tripsttime = values.tripstarttime;
      
      // console.log(tripstarttime);
      // console.log(tripstartkm);

      $.ajax({
        url: "updateTrip",
        type: "POST",
        data: {
          bookingid,
          triptype,
          tripstartkm,
          tripstarttime,
        },
        success: function (res) {
          console.log(res);
          var tdata = typeof res === "string" ? JSON.parse(res) : res;
          const listdata = tdata.tripdata || [];
          // console.log(listdata);
          messageApi.open({
            type: 'success',
            content: 'Trip Started Successfully',
            duration: 5,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2500);
          setIsStartModalOpen(false); 
          startform.resetFields(); 
        },
      });

    })
    .catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleStartCancel = () => {
    setIsStartModalOpen(false);
  };

  const showEndModal = (bkid,tripdt,tpst) => {
    // const tripdate = moment(tripdt).format('YYYY-MM-DD');
    // const triptime = moment(tripdt).format('HH:mm');
    setTripStartKM(tpst);

    endform.setFieldsValue({
      bookingid: bkid,
      triptype: 'endtrip',
      tripstart: tpst,
      tripenddate: moment(), // Moment object for DatePicker
      tripendtime: moment(), // Moment object for TimePicker
    });

    setIsEndModalOpen(true);
  };

  const handleEndOk = () => {
    endform
    .validateFields() // Validate form fields
    .then((values) => {
      // Handle form submission (if validation passes)
      console.log('Form Values:', values);
      // return;
      const triptype = values.triptype;
      const bookingid = values.bookingid;
      const tripendkm = values.tripendkm;
      const tripendtime = moment().format("YYYY-MM-DD HH:mm");

      $.ajax({
        url: "updateTrip",
        type: "POST",
        data: {
          bookingid,
          triptype,
          tripendtime,
          tripendkm
        },
        datatype: "JSON",
        success: function (res) {
          console.log(res);
          var tdata = typeof res === "string" ? JSON.parse(res) : res;
          const listdata = tdata.tripdata || [];
          // console.log(listdata);
          messageApi.open({
            type: 'success',
            content: 'Trip Ended Successfully',
            duration: 5,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        },
        error: function () {},
      });

      setIsEndModalOpen(false);
      endform.resetFields();
    })
    .catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleEndCancel = () => {
    setIsEndModalOpen(false);
  };

  const getTripList = () => {
    const tripval = TripValue;
    const deviceno = document.getElementById("mobileno").value;
    // console.log(deviceno);
    setDriverNo(deviceno);
    
    $.ajax({
      url: "getTrip",
      type: "POST",
      data: {
        tripval,
        deviceno,
      },
      success: function (res) {
        var tdata = typeof res === "string" ? JSON.parse(res) : res;
        const listdata = tdata.tripdata || [];
        const triplistdata = tdata.dettripdata || [];
        // console.log(listdata);

        let totaltrip = 0;
        let completedtrip = 0;
        if(triplistdata.length >0){
          // listdata.forEach((tvalue, index) => {
          //   totaltrip = totaltrip + 1;
          //   if(Number(tvalue.bookingstatus) === 5){
          //     completedtrip = completedtrip + 1;
          //   }
          // });
          triplistdata.forEach((tvalue, index) => {
            totaltrip = totaltrip + 1;
            if(Number(tvalue.bookingstatus) === 5){
              completedtrip = completedtrip + 1;
            }
          });

          $("#tripcard").empty();
  
          setDriverName(triplistdata[0].drivername)
          setTotalTripValue(totaltrip);
          setCompletedTripValue(completedtrip);
          setTripData((prevData) => [...prevData, ...listdata]);
        }

        setLoaderTripData(true);
        setHasFetched(true); // Update flag after fetching data
      },
    });
  };

  useEffect(() => {
    // console.log(hasFetched);
    if (hasFetched === false && TripValue !== null) {
      getTripList();
    }
    $("#headcard").parent().hide();
    setTimeout(() => {
      $(".bg-blue").parent().addClass("bg-light-blue");
      $(".bg-green").parent().addClass("bg-light-green");
      $(".bg-red").parent().addClass("bg-light-red");
      $(".font-11 .ant-scroll-number ").addClass("font-10 mb-1 badgest");
    }, 500);

    if (TripValue !== null && TripValue > 0) {
      // alert(11);
      getTripList();
    }
  }, [hasFetched, TripValue]); // Ensure this only runs once per session
  
  return (
    <Fragment>
      {contextHolder}
      <div className="page-content header-clear-small">
        <Card
          id="headercard"
          className="card card-style preload-img"
          style={{
              backgroundImage: `url(${require('../Assets/images/pictures/18w.jpg')})`,
              height: '130px', 
          }}
          type="inner"
          title={<div className="card-center ms-3"><div className="d-flex"><SteeringWheel /><div className="ms-2"><h1 className="color-white mb-0">{driverName}</h1><p className="color-white mt-n1 mb-0">{CompletedTripValue}&nbsp;/&nbsp;{TotalTripValue} Tasks Completed</p></div></div><div className="d-flex mt-4 ms-2"><p className="color-white mt-n1 mb-0"><FontAwesomeIcon className="font-16 mt-1" icon={faUserPlus} />&nbsp;{driverNo}</p></div></div>}
          extra={<Fragment><div className="card-overlay bg-black opacity-80"></div></Fragment>}
        >
          <div id="headcard"></div>
        </Card>
        <Card
          id="tripdrivercard"
          className="card card-style"
          extra={<div className="tripchk content mb-0">
            <Radio.Group defaultValue="1" optionType="button" buttonStyle="solid" onChange={(e) => setTripValue(e.target.value)}>
              <Radio.Button value="1"><IdcardFilled className="me-1" />All</Radio.Button>
              <Radio.Button value="2"><FontAwesomeIcon className="me-1" icon={faRoute} />Assigned Trip</Radio.Button>
              <Radio.Button value="3"><FontAwesomeIcon className="me-1" icon={faPlaneDeparture} />Trip Started</Radio.Button>
              <Radio.Button value="4"><FontAwesomeIcon className="me-1" icon={faPlaneArrival} />Trip Ended</Radio.Button>
            </Radio.Group>
          </div>}
        >
            {LoaderTripData && 
              <div id="tripcard">
                {TripData.length === 0 ? (
                  <p className="notrip">No Trips Available...</p> // Handle case where TripData is empty
                ) : (
                TripData.map((driverdata, index) => (
                  <Fragment key={`${driverdata.bookingid}-${index}`} >
                    {Number(driverdata.bkgstsid) === 2 ? (
                      <div className="card card-style mb-3 card-light-blue ms-0 me-0">
                        <Badge.Ribbon text={<span className="text-up">{driverdata.bkgsts}</span>}>
                          <Collapse
                            items={[{ 
                              key: `${driverdata.bookingid}-${index}`, 
                              label: <Fragment>
                                <ListItem>
                                  <Row>
                                    <Col xs={5} sm={5} md={4} lg={1} xl={1} className="m-8px">
                                      <ListItemAvatar>
                                        <Avatar>
                                          <FontAwesomeIcon className="me-1 bg-blue" icon={faRoute} />
                                        </Avatar>
                                      </ListItemAvatar>
                                    </Col>
                                    <Col xs={19} sm={19} md={6} lg={7} xl={7} >
                                      <ListItemText primary={<span className="font-14 color-black"><LocalTaxiIcon className="font-13 mb-1 me-1"/>{Number(driverdata.vehicleid) ? driverdata.vehiclemodel : driverdata.modelname }</span>} secondary={<span className="font-14 color-black"><CalendarMonthIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripdatetime).format('MMMM Do, YYYY')}</span>} />
                                    </Col>
                                    <Col xs={24} sm={24} md={14} lg={16} xl={16} className="m-10px">
                                      <Stepper alternativeLabel activeStep={1} connector={<QontoConnectorBlue />}>
                                        <Step key={driverdata.pickuplocation}>
                                          <StepLabel StepIconComponent={StartIcon}><span className="font-13 color-black"><LocationOnIcon className="font-13 mb-1 me-1"/>{driverdata.pickuplocation}</span></StepLabel>
                                        </Step>
                                        <Step key={driverdata.droplocation}>
                                          <StepLabel StepIconComponent={EndIcon}><span className="font-13 color-black"><LocationOnIcon className="font-13 mb-1 me-1"/>{driverdata.droplocation}</span></StepLabel>
                                        </Step>
                                      </Stepper>
                                    </Col>
                                  </Row>
                                </ListItem>
                              </Fragment>,
                              children: <Fragment>
                                <div className="d-flex">
                                  <div className="w-40">
                                    <img src={Planimg} alt="plan" className="preload-img mx-auto" width="110" />
                                  </div>
                                  <div className="w-60 ps-3">
                                    <h3 className="bolder">Trip Plan</h3>
                                    <p className="mb-0 pb-0"><strong>Name:</strong>{driverdata.planname}</p>
                                    <p className="mb-0 pb-0"><strong>Km/s:</strong>{driverdata.minkms}</p>
                                    <p className="mb-0 pb-0"><strong>Hours:</strong>{driverdata.minhrs}</p>
                                  </div>
                                </div>
                                <div className="tripbutton">
                                  <Button id="starttrip" style={{ background: "#52c41a", color:"#fff" }} icon={<FontAwesomeIcon icon={faPlaneDeparture} />} onClick={() => showStartModal(driverdata.bookingid,driverdata.tripdatetime)}>
                                    Start Trip
                                  </Button>
                                </div>
                              </Fragment>
                            }]}
                          />
                        </Badge.Ribbon>
                      </div>
                    ) : ""}
                    {Number(driverdata.bkgstsid) === 4 ? (
                      <div className="card card-style mb-3 card-light-green ms-0 me-0">
                        <Badge.Ribbon text={<span className="text-up">{driverdata.bkgsts}</span>} color="green">
                          <Collapse
                            items={[{ 
                              key: `${driverdata.bookingid}-${index}`, 
                              label: <Fragment>
                                <ListItem>
                                <Row>
                                  <Col xs={5} sm={5} md={4} lg={1} xl={1} className="m-8px">
                                    <ListItemAvatar>
                                      <Avatar>
                                        <FontAwesomeIcon className="me-1 bg-green" icon={faPlaneDeparture} />
                                      </Avatar>
                                    </ListItemAvatar>
                                  </Col>
                                  <Col xs={19} sm={19} md={6} lg={7} xl={7} >
                                    <ListItemText primary={<span className="font-13 color-black"><LocalTaxiIcon className="font-13 mb-1 me-1" />{Number(driverdata.vehicleid) ? driverdata.vehiclemodel : driverdata.modelname }</span>} secondary={<span className="font-13 color-black"><CalendarMonthIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripdatetime).format('MMMM Do, YYYY')}</span>} />
                                  </Col>
                                  <Col xs={24} sm={24} md={14} lg={16} xl={16} className="m-10px">
                                    <Stepper alternativeLabel activeStep={1} connector={<QontoConnectorGreen />}>
                                      <Step key={driverdata.pickuplocation}>
                                        <StepLabel StepIconComponent={GreenStartIcon}><span className="font-13 color-black"><LocationOnIcon className="font-13 mb-1 me-1"/>{driverdata.pickuplocation}</span></StepLabel>
                                      </Step>
                                      <Step key={driverdata.droplocation}>
                                        <StepLabel StepIconComponent={GreenEndIcon}><span className="font-13 color-black"><LocationOnIcon className="font-13 mb-1 me-1"/>{driverdata.droplocation}</span></StepLabel>
                                      </Step>
                                    </Stepper>
                                  </Col>
                                  </Row>
                                </ListItem>
                              </Fragment>,
                              children: <Fragment>
                                <div className="d-flex">
                                  <div className="w-40">
                                    <img src={Planimg} alt="plan" className="preload-img mx-auto" width="110" />
                                  </div>
                                  <div className="w-60 ps-3">
                                    <h3 className="bolder">Trip Plan</h3>
                                    <p className="mb-0 pb-0"><strong>Name:</strong>{driverdata.planname}</p>
                                    <p className="mb-0 pb-0"><strong>Km/s:</strong>{driverdata.minkms}</p>
                                    <p className="mb-0 pb-0"><strong>Hours:</strong>{driverdata.minhrs}</p>
                                  </div>
                                </div>
                                <Badge className="statusbadge" color="green" count={driverdata.bkgsts} offset={[-165, 14]} placement="start">
                                  <div className="d-flex flex-row tripstart card card-style card-light-green mt-3 mb-0 ms-0 me-0">
                                      <Row className="w-100">
                                        <Col xs={15} sm={15} md={12} lg={12} xl={12}>
                                          <div className="font-14 color-black"><CalendarMonthIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripstarttime).format('MMM Do YYYY')}</div>
                                          <div className="font-14 color-black"><TodayIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripstarttime).format('h:mm a')}</div>
                                        </Col>
                                        <Col xs={9} sm={9} md={12} lg={12} xl={12}>
                                          <div className="mt-15rem d-ruby"><span className="d-flex"><AddLocationIcon className="font-13"/>{driverdata.tripstartkm}</span><Badge className="font-11" color="green" count="Km/s"/></div>
                                        </Col>
                                      </Row>
                                  </div>
                                </Badge>
                                <div className="tripbutton">
                                  <Button id="endtrip" type="primary" icon={<FontAwesomeIcon icon={faPlaneArrival} />} onClick={() => showEndModal(driverdata.bookingid,driverdata.tripdatetime,driverdata.tripstartkm)} danger>
                                    End Trip
                                  </Button>
                                </div>
                              </Fragment>
                            }]}
                          />
                        </Badge.Ribbon>
                      </div>
                    ) : ""}
                    {Number(driverdata.bkgstsid) === 5 ? (
                      <div className="card card-style mb-3 card-light-red ms-0 me-0" >
                        <Badge.Ribbon text={<span className="text-up">{driverdata.bkgsts}</span>} color="red">
                          <Collapse
                            items={[{ 
                              key: `${driverdata.bookingid}-${index}`, 
                              label: <Fragment>
                                <ListItem>
                                  <Row>
                                    <Col xs={5} sm={5} md={4} lg={1} xl={1} className="m-8px">
                                      <ListItemAvatar>
                                        <Avatar>
                                          <FontAwesomeIcon className="ms-1 bg-red" icon={faPlaneArrival} />
                                        </Avatar>
                                      </ListItemAvatar>
                                    </Col>
                                    <Col xs={19} sm={19} md={6} lg={7} xl={7} >
                                      <ListItemText primary={<span className="font-13 color-black"><LocalTaxiIcon className="font-13 mb-1 me-1" />{Number(driverdata.vehicleid) ? driverdata.vehiclemodel : driverdata.modelname }</span>} secondary={<span className="font-13 color-black"><CalendarMonthIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripdatetime).format('MMMM Do, YYYY')}</span>} />
                                    </Col>
                                    <Col xs={24} sm={24} md={14} lg={16} xl={16} className="m-10px">
                                      <Stepper alternativeLabel activeStep={1} connector={<QontoConnectorRed />}>
                                        <Step key={driverdata.pickuplocation}>
                                          <StepLabel StepIconComponent={RedStartIcon}><span className="font-13 color-black"><LocationOnIcon className="font-13 mb-1 me-1"/>{driverdata.pickuplocation}</span></StepLabel>
                                        </Step>
                                        <Step key={driverdata.droplocation}>
                                          <StepLabel StepIconComponent={RedEndIcon}><span className="font-13 color-black"><LocationOnIcon className="font-13 mb-1 me-1"/>{driverdata.droplocation}</span></StepLabel>
                                        </Step>
                                      </Stepper>
                                    </Col>
                                  </Row>
                                </ListItem>
                              </Fragment>,
                              children: <Fragment>
                                <div className="d-flex">
                                  <div className="w-40">
                                    <img src={Planimg} alt="plan" className="preload-img mx-auto" width="110" />
                                  </div>
                                  <div className="w-60 ps-3">
                                    <h3 className="bolder">Trip Plan</h3>
                                    <p className="mb-0 pb-0"><strong>Name:</strong>{driverdata.planname}</p>
                                    <p className="mb-0 pb-0"><strong>Km/s:</strong>{driverdata.minkms}</p>
                                    <p className="mb-0 pb-0"><strong>Hours:</strong>{driverdata.minhrs}</p>
                                  </div>
                                </div>
                                <Badge className="statusbadge" color="green" count="Trip Started" offset={[-165, 14]} placement="start">
                                  <div className="d-flex flex-row tripstart card card-style card-light-green mt-3 mb-0 ms-0 me-0">
                                    <Row className="w-100">
                                      <Col xs={15} sm={15} md={12} lg={12} xl={12}>
                                        <div className="font-14 color-black"><CalendarMonthIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripstarttime).format('MMM Do YYYY')}</div>
                                        <div className="font-14 color-black"><TodayIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripstarttime).format('h:mm a')}</div>
                                      </Col>
                                      <Col xs={9} sm={9} md={12} lg={12} xl={12}>
                                        <div className="d-ruby mt-1"><span className="d-flex"><AddLocationIcon className="font-13"/>{driverdata.tripstartkm}</span><Badge className="ms-1 font-11" color="green" count="Km/s"/></div>
                                      </Col>
                                    </Row>
                                  </div>
                                </Badge>
                                <Badge className="statusbadge" color="red" count={driverdata.bkgsts} offset={[-165, 14]} placement="start">
                                  <div className="d-flex flex-row tripend card card-style card-light-red mt-3 mb-0 ms-0 me-0">
                                    <Row className="w-100">
                                      <Col xs={15} sm={15} md={12} lg={12} xl={12}>
                                        <div className="font-14 color-black"><CalendarMonthIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripendtime).format('MMM Do YYYY')}</div>
                                        <div className="font-14 color-black"><TodayIcon className="font-13 mb-1 me-1"/>{moment(driverdata.tripendtime).format('h:mm a')}</div>
                                      </Col>
                                      <Col xs={9} sm={9} md={12} lg={12} xl={12}>
                                        <div className="d-ruby mt-1"><span className="d-flex"><WhereToVoteIcon className="font-13"/>{driverdata.tripendkm}</span><Badge className="ms-1 font-11" color="red" count="Km/s" /></div>
                                      </Col>
                                    </Row>
                                  </div>
                                </Badge>
                              </Fragment>
                            }]}
                          />
                        </Badge.Ribbon>
                      </div>
                    ) : ""}
                  </Fragment>
                )))}
              </div>
            }
        </Card>
      </div>
      <Modal id="startTripModal" title={<span className="font-14" style={{ color:"#52c41a" }}><FontAwesomeIcon className="me-1" icon={faPlaneDeparture} />Start Trip</span>} style={{ height: "250px",top: 5 }} open={isStartModalOpen} onOk={handleStartOk} onCancel={handleStartCancel}>
        <Row>
          <Form form={startform} name="tripstartform" layout="inline">
            <div className="hide">
              <Form.Item name="bookingid" >
                <Input type="hidden" name="bookingid" id="bookingid" />
              </Form.Item>
              <Form.Item name="triptype" >
                <Input type="hidden" name="triptype" id="triptype" />
              </Form.Item>
            </div>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item layout="vertical" label="Trip Start Date" name="tripstartdate">
                <DatePicker
                  format="DD-MM-YYYY"
                  suffixIcon={<CalendarMonthIcon className="custom-calicon" />}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} >
              <Form.Item layout="vertical" label="Time" name="tripstarttime" >
                <TimePicker
                  format="HH:mm"
                  suffixIcon={<TodayIcon className="custom-calicon"/>}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} >
              <Form.Item layout="vertical" label="Trip Start Km/s" name="tripstartkm" rules={[{ required: true, message: 'Enter Start Km/s' }]}>
                <Input prefix={<AddLocationIcon />} type="number" placeholder="Enter Km/s" />
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </Modal>
      <Modal id="endTripModal" title={<span className="font-14 color-red"><FontAwesomeIcon className="me-1" icon={faPlaneArrival} />End Trip</span>} style={{ height: "250px",top: 5 }} open={isEndModalOpen} onOk={handleEndOk} onCancel={handleEndCancel}>
        <Row>
          <Form form={endform} name="tripendform" layout="inline">
            <div className="hide">
              <Form.Item name="bookingid" >
                <Input type="hidden" name="bookingid" id="bookingid" />
              </Form.Item>
              <Form.Item name="triptype">
                <Input type="hidden" name="triptype" id="triptype" />
              </Form.Item>
              <Form.Item name="tripstart" >
                <Input type="hidden" name="tripstart" id="tripstart" />
              </Form.Item>
            </div>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item layout="vertical" label="Trip End Date" name="tripenddate">
                <DatePicker
                  format="DD-MM-YYYY"
                  suffixIcon={<CalendarMonthIcon className="custom-calicon" />}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} xl={6} >
              <Form.Item layout="vertical" label="Time" name="tripendtime">
                <TimePicker
                  format="HH:mm"
                  suffixIcon={<TodayIcon className="custom-calicon"/>}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item layout="vertical" label="Trip End Km/s" name="tripendkm"   rules={[
                { required: true, message: 'Enter End Km/s' },
                {
                  validator: (_, value) => {
                    // console.log(tripStartKM)
                    if (Number(value) < Number(tripStartKM)) {
                      return Promise.reject(new Error('End Km/s should be greater than or equal to Start Km/s'));
                    }
                    return Promise.resolve();
                  },},]}
              >
                <Input prefix={<WhereToVoteIcon />} type="number" placeholder="Enter Km/s" />
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Driverlist;