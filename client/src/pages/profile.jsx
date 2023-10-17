import './Profile.css'; // Assuming you have a CSS file for styling

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

function Profile() {
    const { profileId } = useParams();

    const { loading, data } = useQuery(
        profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
        {
          variables: { profileId: profileId },
        }
      );
    
    const profile = data?.me || data?.profile || {};

    if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
        return <Navigate to="/profile" />;
      }
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!profile?.username) {
        return (
          <h4>
            You need to be logged in to see your profile page. Use the navigation
            links above to sign up or log in!
          </h4>
        );
      }    

      const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };    

    return (
        <div className="profile-container">
            <h1>Your Account</h1>

            {/* Profile Image */}
            <div className="profile-image-container">
                {/* <img src="path_to_your_image.jpg" alt="Profile" className="profile-image"/> */}
            </div>

            {/* Profile Details */}
            <div className="profile-details">
                <div className="profile-row">
                    <label className="profile-label">Username:</label>
                    <span className="profile-info">{profile.username}</span>
                </div>
                <div className="profile-row">
                    <label className="profile-label">Email:</label>
                    <span className="profile-info">{profile.email}</span>
                </div>
            </div>

            {/* Profile Actions */}
            <div className="profile-actions">
                <button>Edit Profile</button>
                <button>Change Password</button>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    );
}

export default Profile;

