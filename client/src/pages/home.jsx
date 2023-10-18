import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomButton from '../components/customButton';
import "./home.css";

const Home = () => { 
  const navigate = useNavigate(); 

  useEffect(() => { 
    // Redirect if the user is already logged in 
    if (localStorage.getItem('token')) { 
      navigate('/messaging'); 
    }
  }, [navigate]);  

  return (  
    <div> 
      <h1>Welcome to Hurdle</h1> 
      <p>Start messaging with people around the world</p> 
      <Link to="/login"> 
        <CustomButton buttonText='Start Messaging'/> 
      </Link> 
    </div> 
  ); 
} 
 
export default Home; 
