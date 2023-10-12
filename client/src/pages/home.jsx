import { Link } from 'react-router-dom';
import CustomButton from '../components/customButton';
import "./home.css";
const Home = () => {
  return ( 
    <div>
      <h1>Welcome to Hurdle</h1>
      <p>Start messaging with people around the world</p>
      <Link to="/signup">
      <CustomButton buttonText='Start Messaging'/>
      </Link>
    </div>
   );
}
 
export default Home;