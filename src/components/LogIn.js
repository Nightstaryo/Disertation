import React, {useState, useEffect} from 'react';
import { Buffer } from 'buffer';

function LogIn(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [log,setLog]=useState(false);
    useEffect(
        () => {
            if (localStorage.getItem('token')) {
                props.handleAuthenticated(true);
            }
        }
    ,[])
    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
 
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
 
   
    const handleClick = () => {
        const encodedString = Buffer.from(
            username + ":" + password
          ).toString('base64');
    

        fetch("http://unn-w19012185.newnumyspace.co.uk/project/api/auth",
        {
            method: 'POST',     
            headers: new Headers( { "Authorization":"Basic " +encodedString })
        })
        .then(
            (response) => {   
                return response.json()
              
            }
        )
        .then(
            (json) => {
                if (json.message === "success") {
                    props.handleAuthenticated(true)
                    localStorage.setItem('token', json.data.token);
                    setPassword("");
                    setUsername("");
                    setLog(false);
                  }
                  if (json.message === "invalid credentials")
                  {
                    setLog(true);
                    setPassword("");
                  }
            }
        )
        .catch(
            (e) => {
                console.log(e.message)
            }
        )
    }


    return (
    <div>
    
       {!props.authenticated && log===false &&  <div>
                <h2>Sign in</h2>
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
                <input type="button" 
                  value="Submit" 
                  onClick={handleClick}
                />
             </div>
            }
             {!props.authenticated && log===true &&  <div>
                <h2>Username or password incorrect please try again</h2>
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
                <input type="button" 
                  value="Submit" 
                  onClick={handleClick}
                />
          
                </div>
}
             {props.authenticated && <div>
            <p>LoggedIn</p>
        </div>
}
</div>
    );
    
    }
    export default LogIn