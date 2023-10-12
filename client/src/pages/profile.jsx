import './Profile.css'; // Assuming you have a CSS file for styling

function Profile() {
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
                    <span className="profile-info">YourUsername</span>
                </div>
                <div className="profile-row">
                    <label className="profile-label">Email:</label>
                    <span className="profile-info">youremail@example.com</span>
                </div>
                <div className="profile-row">
                    <label className="profile-label">Joined:</label>
                    <span className="profile-info">Date you joined</span>
                </div>
            </div>

            {/* Profile Actions */}
            <div className="profile-actions">
                <button>Edit Profile</button>
                <button>Change Password</button>
                <button>Log Out</button>
            </div>
        </div>
    );
}

export default Profile;

