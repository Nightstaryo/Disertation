import React,{useState,useEffect} from 'react';

function DevicesPage(){
    const [Devices,setDevices] = useState([]);



    useEffect( () => {
        fetch("http://unn-w19012185.newnumyspace.co.uk/project/api/devices")
        .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                   setDevices(json.data)
                   console.log(json.data)
                }
            )
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
        },[]);
      
    
        
    return (
    <div className='info-box-container'>
       <h1>Devices Page</h1> 
       <p>This page shows all the available devices that can be scheduled and their power consumptions in MWH</p>
        <div className="grid-container">
        <ul>
          {Devices.map(Devices => (
            <li  key={Devices.device_id} className="grid-item" >{Devices.device_name} Price:${Devices.device_econsumption}MWH <div><img src={Devices.device_image_link} style={{ width: '150px', height: '150px' }}/> </div>
           <div>Reference:{Devices.device_reference}</div></li>
            
          ))}
          
        </ul>
   
        </div>
        </div>
    
    
    );
    
    }
   
    export default DevicesPage