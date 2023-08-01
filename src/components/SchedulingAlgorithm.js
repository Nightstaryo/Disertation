import React,{useState,useEffect} from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';

function SchedulingAlgorithm({ Devicess, EndTime, StartTime }){
  const [TempTime,setTempTime] = useState([]);
   let costTotal=0;
  const Scheduled=[];
const chartData=[];
  const days = [
"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ];
  console.log(StartTime);
  console.log(EndTime);
  console.log(Devicess);
      // Sample data for time slots and their prices per hour
      useEffect( () => {
        fetch("http://unn-w19012185.newnumyspace.co.uk/project/api/tarrif")
        .then(
                (response) => response.json()
            )
            .then(
                (json) => {
                   setTempTime(json.data)
                   console.log(json.data)
                }
            )
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
          
        },[]);
        const idArray = TempTime.map(obj => obj.tarrif_id);
      
        const priceArray = TempTime.map(obj => obj.tarrif_price);
        const timeSlotss = TempTime.map((TempTime, index) => ({
          id:parseInt(index),
          time:parseInt(idArray[index]),
          price:parseFloat(priceArray[index])
        
          
        }));

        console.log(timeSlotss)
      

      const timeSlots= timeSlotss.slice(StartTime, EndTime+1);
      console.log(timeSlots)
     // console.log(Devicess);
      // Sort the devices by their power consumption, from highest to lowest
      Devicess.sort((a, b) => b.order - a.order);
      
      // Array to store the scheduled time slots

      const modifier=10;
      // Iterate over the devices in the sorted order
      for (const device of Devicess) {
        if (TempTime.length > 0) {
        // Find the cheapest available time slot where the device can be scheduled
        let cheapestTime = 0;
        let cheapestIndex= 0;
        let cheapestCost = Infinity;
        for (const timeSlot of timeSlots) {
          console.log(timeSlots.length)
          console.log(timeSlot.time )
          console.log(device.number )
          if (timeSlots.length - (StartTime-timeSlot.time) < device.number) continue;
       
          const cost = device.power * timeSlot.price;
          console.log(cost)
          if (cost < cheapestCost) {
            cheapestTime = timeSlot.time;
            cheapestIndex=timeSlot.id -StartTime;
            cheapestCost = cost;
         console.log(timeSlot.price+" "+timeSlot.time)
         console.log(cheapestTime)
         console.log("Test")
         
          }
        }

       
          const startId = cheapestTime;
        const endId = cheapestTime + device.number-1;

        const startIndex = timeSlots.findIndex(item => item.time === startId);
        const endIndex = timeSlots.findIndex(item => item.time === endId);
        const slicedData = timeSlots.slice(startIndex, endIndex + 1);
        const multipliedArray = slicedData.map((item) => {
          return { time: item.time, price: item.price * device.power };
        });
        
        const total = multipliedArray.reduce((acc, item) => acc + item.price, 0);
       const Schedule= ({id:device.id,name:device.name,start:cheapestTime,duration:device.number,cost:total});
      const data=({name:device.name,time:cheapestTime,end:device.number,price:total});
      //  console.log(Schedule)

      costTotal = costTotal+total;
        chartData.push(data);
      Scheduled.push(Schedule);
      console.log(Scheduled)
      for(let i=0; i<device.number; i++){

        timeSlots[cheapestIndex+i].price =timeSlots[cheapestIndex+i].price + modifier;

      }
      console.log(timeSlots)
     
      }
   //  console.log(index)
      }
      const formatXAxisTick = (value) => {
        const hours = value % 24;
        const Days =days[Math.floor(value / 24)];
        return `${Days}: ${hours}:00`;
      };
      chartData.sort((a, b) => a.time - b.time);
      console.log(chartData)
      const CustomTooltip = ({ active, payload}) => {
        if (active) {
          const deviceName = payload[0].payload.name;
          const devicePrice = payload[0].payload.price;
          const duration = payload[0].payload.end;
          const time=payload[0].payload.time;
          return (
            <div className="custom-tooltip">
              <p className="label">{`${deviceName} (Duration: ${duration} hours)`}</p>
              <p className="price">{`Price: ${devicePrice}`}</p>
              <p className="start">{`Time: ${time}`}</p>
            </div>
          );
        }
      
        return null;
      };
      
    return (
    <div>
      <ul>
   {Scheduled.map(Scheduled => <li key={Scheduled.id}>{Scheduled.name}: {days[Math.floor((Scheduled.start/ 24))]}: {(Scheduled.start%24)-1}:00 to {days[Math.floor((Scheduled.start+Scheduled.duration-1)/24)]}:{((Scheduled.start+Scheduled.duration-1)%24)-1}:59 for a total of ${Scheduled.cost} </li>)}
   <ComposedChart width={600} height={300} data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="time" tickFormatter={formatXAxisTick}  label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }}/>
  <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
  <Tooltip content={<CustomTooltip />} />
  <Legend />
  <Bar dataKey="price" barSize={20} fill="#8884d8">
    {chartData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={('#' + Math.floor(Math.random() * 16777215).toString(16))} />
    ))}
  </Bar>
  <Line type="monotone" dataKey="price"  stroke="#82ca9d" />
</ComposedChart>
   </ul>
   <div className='total'>Total: ${costTotal.toFixed(2)}</div>
  

    </div>
    
    
    );
    
    }
    export default SchedulingAlgorithm