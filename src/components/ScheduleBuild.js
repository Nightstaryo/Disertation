

import React,{useState,useEffect} from 'react';

import AddDevices from "./AddDevices";
import SchedulingAlgorithm from "./SchedulingAlgorithm";

function ScheduleBuild(props){
  const [SelectedDevices,setSelectedDevices] = useState([]);

  const [addDevices,setaddDevices] = useState(false);
  const [DevicesAdded,setDevicesAdded] = useState(false);
  const [Schedule,setSchedule] = useState(false);
  const [Devices,setDevices] = useState([]);

  
  
  const addDevicesRoute = () =>{ 
    setaddDevices(true);
     
  }
  const handleDataChange = (newData) => {
    setSelectedDevices(newData);
    setaddDevices(false);
    setDevicesAdded(true);
   
  
  };
  const days = [
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
    { label: 'Sunday', value: 7 },
  ];
  
  const hours = [
    { label: '00:00am', value: 0 },
    { label: '01:00am', value: 1 },
    { label: '02:00am', value: 2 },
    { label: '03:00am', value: 3 },
    { label: '04:00am', value: 4 },
    { label: '05:00am', value: 5 },
    { label: '06:00am', value: 6 },
    { label: '07:00am', value: 7 },
    { label: '08:00am', value: 8 },
    { label: '09:00am', value: 9 },
    { label: '10:00am', value: 10 },
    { label: '11:00am', value: 11 },
    { label: '12:00pm', value: 12 },
    { label: '01:00pm', value: 13 },
    { label: '02:00pm', value: 14 },
    { label: '03:00pm', value: 15 },
    { label: '04:00pm', value: 16 },
    { label: '05:00pm', value: 17 },
    { label: '06:00pm', value: 18 },
    { label: '07:00pm', value: 19 },
    { label: '08:00pm', value: 20},
    { label: '09:00pm', value: 21},
    { label: '10:00pm', value: 22 },
    { label: '11:00pm', value: 23 },
    { label: '12:00pm', value: 24 },
  ];
  
  const [startDay, setStartDay] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [EndHours, setEndHours] = useState(null);
  const [StartHours, setStartHours] = useState(null);
  const handleStartDayChange = (e) => {
    setStartDay(parseInt(e.target.value));
    setEndDay(null);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(parseInt(e.target.value));
    setEndTime(null);
  };

  const handleEndDayChange = (e) => {
    setEndDay(parseInt(e.target.value));
  };

  const handleEndTimeChange = (e) => {
    setEndTime(parseInt(e.target.value));
   
  };

  // Create options for end day based on selected start day
  const endDayOptions = startDay ? days.filter(day => day.value >= startDay) : days;

  // Create options for end time based on selected start time and day
  let endTimeOptions = startDay && startTime
    ? hours.filter(hour => (startDay < endDay || (startDay === endDay && hour.value > startTime)))
    : hours;
    const options = [];
    options.push(<option key={0} value={0}>Choose duration</option>);
    for (let i = 1; i <= EndHours-1; i++) {
     
      options.push(<option key={i} value={i}>{i}</option>);
    
    }
 
  
    useEffect( () => {
      setEndHours((((endDay-1)*24)+endTime));
      setStartHours((((startDay-1)*24)+startTime));

    
    }
    ,[endTime]);

    const [dropdownNumbers, setDropdownNumbers] = useState([1, 2, 3, 4, 5]);
  
    const handleDropdownChange = (index, event) => {
      const newDropdownNumbers = [...dropdownNumbers];
      newDropdownNumbers[index] = parseInt(event.target.value);
      setDropdownNumbers(newDropdownNumbers);
      
    };
    
    const handleSubmit = event => {
      event.preventDefault();
      const idArray = SelectedDevices.map(obj => obj.id);
      const nameArray = SelectedDevices.map(obj => obj.name);
      const powerArray = SelectedDevices.map(obj => obj.Power);
      const DevDuration = SelectedDevices.map((SelectedDevices, index) => ({
        id:idArray[index],
        name:nameArray[index],
        power:powerArray[index],
        number: dropdownNumbers[index],
        order:powerArray[index]*dropdownNumbers[index]
        
      }));
      
      console.log(DevDuration);
      setDevices(DevDuration);
      setSchedule(true);
    }
    const [isOpen, setIsOpen] = useState(false);
    const handleback = () => {
      setaddDevices(false);
    };
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
    
    return (
      <div className="container">
     {!addDevices &&    
  <div className="panel">
  <div className="panel-header" onClick={handleToggle}>
       <h3>Plan Scehdule</h3>
       <span>{isOpen ? "▲" : "▼"}</span>
     </div>
     {isOpen && (
       <div className="panel-content">
           <div >
   
      <div>
      <div >
     <label>
       Start Day:
       <select value={startDay || ''} onChange={handleStartDayChange}>
         <option value="">Select Day</option>
         {days.map(day => <option key={day.value} value={day.value}>{day.label}</option>)}
       </select>
     </label>
     <label>
       Start Time:
       <select value={startTime || ''} onChange={handleStartTimeChange}>
         <option value="">Select Time</option>
         {hours.map(hour => <option key={hour.value} value={hour.value}>{hour.label}</option>)}
       </select>
     </label>
     <label>
       End Day:
       <select value={endDay || ''} onChange={handleEndDayChange} disabled={!startDay}>
         <option value="">Select Day</option>
         {endDayOptions.map(day => <option key={day.value} value={day.value}>{day.label}</option>)}
       </select>
     </label>
     <label>
       End Time:
       <select value={endTime || ''} onChange={handleEndTimeChange} disabled={!startDay || !endDay}>
         <option value="">Select Time</option>
         {endTimeOptions.map(hour => <option key={hour.value} value={hour.value}>{hour.label}</option>)}
       </select>
       
     </label>
     <p>{EndHours} {StartHours}</p>
   </div>
     <p>Devices;</p>
  
     <button onClick={addDevicesRoute} prev={SelectedDevices}>Select Devices</button>
         </div>
         <div>
         <form onSubmit={handleSubmit}>
         {SelectedDevices.map((input,index) => (
       <div key={index}>
         <strong>ID:</strong> {input.id} <strong>Value:</strong> {input.name}<strong> Power:</strong> {input.Power} 
         <select value={options.index} onChange={event => handleDropdownChange(index, event)}>
           {options}
         </select>
        
       </div>
     ))}
     <button type="submit">Submit</button>
   </form>

        </div>

       </div>
       </div>
     )}
   </div>

     
}
      {addDevices && 
      <div className="panel">
      <div className="panel-header" onClick={handleToggle}>
           <h3>Plan Scehdule</h3>
           <span>{isOpen ? "▲" : "▼"}</span>
         </div>
         {isOpen && (
           <div className="panel-content">
            <div>
      <button onClick={handleback}>Back</button>
    <AddDevices onButtonClick={handleDataChange} />
  </div>
    </div>
    
    )}
    </div>
    }

    <div className="main-content">
      {!Schedule&&
    <h1>Schedule will appear here</h1>
      }
    {DevicesAdded && !addDevices && EndHours!=="0"&&!Schedule&&
<div>


    </div>
    }
   
    {DevicesAdded && !addDevices && EndHours!=="0"&&Schedule&&
 
      <SchedulingAlgorithm Devicess={Devices}EndTime={EndHours} StartTime={StartHours} />
     

  }

  </div>
   
  
     </div>
    );
    
    }
    export default ScheduleBuild;