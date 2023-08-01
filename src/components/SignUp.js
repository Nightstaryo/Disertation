import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
function SignUp(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [UserExists, setUserExists] = useState(false); 
    const [Test, setTest] = useState("");

    const navigate = useNavigate();
    //Naviagte to the login page
    const routeChange = () =>{
        let path = '/login';
        navigate(path)
    }
    const handleUsername = (event) => {
  
        setUsername(event.target.value);
    }
    const handlePassword = (event) => {
  
        setPassword(event.target.value);
    }
    const handleSignUp = () =>{
        //Checks password meets critera
        setUserExists(false);
            //Sets the data into the form
            const formData = new FormData();
            formData.append('username',username);
            formData.append('password',password);
  

            //Sends the request to the API
            fetch("http://unn-w19012185.newnumyspace.co.uk/project/api/signup",
            {
                //Set post and headers
                method:'POST',
                body:formData
            })
            .then(
                (response) => {
                    return response.json()
                }
            )
            .then(
                //Handles response
                (json) => {
       
                    if(json.message === "Success"){
                        handleSuccess()
                    }
           
                    else if(json.message === "User Already Exists"){
                        setUserExists(true)
                     
                    }
           
                }
            )
     
            .catch(
                (e) => {
                    console.log(e.message)
                }
            )
            }

  
    const handleSuccess = () => {
        setTest("hello");
        //On success redirect user to login page
        routeChange();
    }
    return (
    <div>
   
   <h2>Sign up</h2>
   <h2>{Test}</h2>
   {UserExists===false &&<div>
                <input 
                  type="text" 
                  placeholder ="username"  
                  value={username} 
                  onChange={handleUsername} 
                />        
                <input 
                  type="password" 
                  placeholder="password" 
                  value={password} 
                  onChange={handlePassword} 
                />
            
                </div>
   }
      {UserExists===true &&<div>
                <h2>Username already Exists please choose a new one</h2>
                <input 
                  type="text" 
                  placeholder ="username"  
                  value={username} 
                  onChange={handleUsername} 
                />        
                <input 
                  type="password" 
                  placeholder="password" 
                  value={password} 
                  onChange={handlePassword} 
                />
             
                </div>
   }
   {username!=="" &&password!==""&&<div>
        <input type="button" 
                  value="Submit" 
                  onClick={handleSignUp}
                />
    </div> 


   }
        </div>
    
    
    );
    
    }
    export default SignUp