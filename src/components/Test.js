

import logo from './logo.svg';
import { useState, useEffect } from "react";
import Select from 'react-select'
import './App.css';


function App() {
const energytime=[

  { id: 1, value1: 5 ,value2:1},
  { id: 2, value1: 22,value2:3},
  { id: 3, value1: 3 ,value2:2},

];
const timeprice=[
  { id: 1, value1: 6 },
  { id: 2, value1: 8},
  { id: 3, value1: 9 },

];
const arr = [
  { value1: 'a', value2: 2, value3: 3 },
  { value1: 'b', value2: 1, value3: 4 },
  { value1: 'c', value2: 5, value3: 2 }
];

arr.sort((a, b) => {
  const productA = a.value2 * a.value3;
  const productB = b.value2 * b.value3;

  if (productA > productB) {
    return -1;
  }
  if (productA < productB) {
    return 1;
  }
  return 0;
});
const arr2 = [
  { value1: 1, value2: 2, value3: 3 },
  { value1: 2, value2: 1, value3: 4 },
  { value1: 3, value2: 5, value3: 2 },
  { value1: 4, value2: 5, value3: 2 },
  { value1: 5, value2: 5, value3: 2 },
];
arr2.sort((a, b) => {
  const productA = a.value2 * a.value3;
  const productB = b.value2 * b.value3;

  if (productA > productB) {
    return -1;
  }
  if (productA < productB) {
    return 1;
  }
  return 0;
});
for(let i=0;arr.length>i;i++){
  for(let j=0;arr[i].value2>j; j++){
    const element = arr2.find(obj => obj.value2 ===arr2[0].value1+j);
   console.log(element)


  }


}
const devices = [
  { id: 1, powerConsumption: 2000, duration: 2 },
  { id: 2, powerConsumption: 1000, duration: 1 },
  { id: 3, powerConsumption: 3000, duration: 3 },
  { id: 4, powerConsumption: 1500, duration: 2 },
  { id: 5, powerConsumption: 1800, duration: 1 }
];

// Sample data for time slots and their prices per hour
const timeSlots = [
  { time: 0, price: 14 },
  { time: 1, price: 12 },
  { time: 2, price: 14 },
  { time: 3, price: 11 },
  { time: 4, price: 12 },
  { time: 5, price: 12 },
  { time: 6, price: 12 }
];

// Sort the devices by their power consumption, from highest to lowest
devices.sort((a, b) => b.powerConsumption - a.powerConsumption);

// Array to store the scheduled time slots
const scheduled = [];
const modifier=1.01;
// Iterate over the devices in the sorted order
for (const device of devices) {
  // Find the cheapest available time slot where the device can be scheduled
  let cheapestTime = null;

  let cheapestCost = Infinity;
  for (const timeSlot of timeSlots) {
    if (scheduled[timeSlot.time]) continue;
    if (timeSlots.length - timeSlot.time < device.duration) continue;
    const cost = device.powerConsumption * timeSlot.price;
    if (cost < cheapestCost) {
      cheapestTime = timeSlot.time;
      cheapestCost = cost;
      console.log(timeSlot.price+" "+timeSlot.time)
    }
  }
  //
    const startId = cheapestTime;
 const endId = cheapestTime + device.duration-1;
  // If a time slot was found, mark it as unavailable for scheduling and add the device cost to the total
const startIndex = timeSlots.findIndex(item => item.time === startId);
  const endIndex = timeSlots.findIndex(item => item.time === endId);
 const slicedData = timeSlots.slice(startIndex, endIndex + 1);
 console.log(slicedData)
  const multipliedArray = slicedData.map((item) => {
    return { time: item.time, price: item.price * device.powerConsumption };
  });
  
  const total = multipliedArray.reduce((acc, item) => acc + item.price, 0);

  console.log(slicedData)
  console.log(`Scheduled device ${device.id} from ${cheapestTime}:00 to ${cheapestTime + device.duration - 1}:59 cost=${total}`);
}



//** 
//** const array1 = [5, 5, 5, 5, 5];
//** const array2 = [5, 4, 4, 4, 3] ;
//** array2.sort();

//** const multipliedAndAddedArr = array1.map((item, index) => {
  //** const smallest = array2.reduce((prev, current) => {
  //**   return prev < current ? prev : current;
 //**  }); 
 //**  const multipliedItem = item * smallest; 
 //**  const addedItem = smallest + 10; 
 //**  array2[index] = addedItem; 
//**   return multipliedItem;
//** });



const sortedArray = energytime.map((item) => {
  return {
    id: item.id,
    product: item.value1,
    value: item.value1*item.value2
  };
});

sortedArray.sort((a, b) => b.product-a.product);
const getSmallest = () => {
  const sortedArr = [timeprice].sort((a, b) => a - b); // Create a sorted copy of arr2
  const smallest = Math.min(sortedArr.map(item => item.id)); // Remove and return the smallest element of the sorted array
  return smallest;
};
const newarray= sortedArray.map((item,id)=>
  {sortedArray.sort((a, b) => b.product-a.product);
    const smallest = getSmallest();
   
    return {
      id: item.id,
      value1:timeprice[id].value1,
      product: item.value* smallest,
    
  
    };
    
});
for(let i=0;  energytime.length>i; i++){
  console.log(i)
 console.log(energytime[i].value1*timeprice[0].value1)
 console.log(energytime.length)

};

const [array1, setArray1] = useState([2, 4, 6]);
const [array2, setArray2] = useState([1, 3, 5]);

const newArray = array1.map((value, index) => {

  const result = value * array2[0];

  array2.sort();
  return index === 0 ? [result, result] : result;
});
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
// fetch devices and display in radio boxes
const [selectedOptions, setSelectedOptions] = useState([]);

  function handleOptionChange(selectedValues) {
    setSelectedOptions(selectedValues);
    console.log(selectedOptions)
  }
  return (
 <div>
<h1>Hello</h1>
<h2>Id and Two Values Array Example</h2>
      <p>Energy time Data: {JSON.stringify(energytime)}</p>
      <p>Time Price Data: {JSON.stringify(timeprice)}</p>
      <p>Sorted Data: {JSON.stringify(sortedArray)}</p>
      <p>Id and Two Values Array:{JSON.stringify(newarray)}</p>
     <p>{JSON.stringify(arr)}</p>
    <ul>
        {newArray.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <Select
      value={selectedOptions}
      onChange={handleOptionChange}
      options={devices}
      isMulti={true}
      placeholder="Select options"
    />
 <ul>
          {selectedOptions.map(option => (
            <li key={option.value}>{option.label}</li>
          ))}
          </ul>
 </div>
 
  );
}

export default App;
