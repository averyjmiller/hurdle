import { Link } from 'react-router-dom';
import CustomButton from '../components/customButton';
const Home = () => {
  return ( 
    <div>
      <h1>Welcome to Hurdle</h1>
      <p>Start messaging with people around the world</p>
      <CustomButton buttonText='Sign In'/>
      <CustomButton buttonText='Sign Up'/>
      {/* "Start Messaging" button */}
      <Link to="/messaging">
      <CustomButton buttonText='Start Messaging'/>
      </Link>
    </div>
   );
}
 
export default Home;