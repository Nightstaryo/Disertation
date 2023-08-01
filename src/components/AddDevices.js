import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';


function AddDevices({onButtonClick},props){

    const [Devices,setDevices] = useState([]);
     const [SelectedDevices,setSelectedDevices] = useState([]);
     const[stored,setStored] = useState([]);


        

    useEffect( () => {
        fetch("http://unn-w19012185.newnumyspace.co.uk/project/api/devices")
        .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                   setDevices(json.data)
                  
                }
            )
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
            setStored([...stored,...SelectedDevices]);
        }
        ,[SelectedDevices]);
    
        const AddDevice =(Devices)=>{
            setSelectedDevices([{id:Devices.device_id,name:Devices.device_name,Power:Devices.device_econsumption}]);

            }
 
const addSelectedDevices=()=>{
   onButtonClick(stored);
   
}

    return (
    <div>
       <h1>Test DevicesPage</h1> 
        <div>
        <ul>
          {Devices.map(Devices => (
            <li  key={Devices.device_id} >{ Devices.device_name} Price:{Devices.device_econsumption}KWH<button onClick={()=> AddDevice(Devices)} > Select Devices</button></li>
          ))}
      
        </ul>
        </div>
        <p>Selected items: </p>
      <ul>
        {stored.map((input,index) => (
          <li key={index}>
            <strong>ID:</strong> {input.id} <strong>Value:</strong> {input.name}
          </li>
        ))}
      </ul>
    
       
    
       
       <button onClick={addSelectedDevices}>Add selected Devices</button>
        </div>
    
    
    );
    
    }
   
    export default AddDevices