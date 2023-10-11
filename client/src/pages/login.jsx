import "./login.css";

function LoginPage() {
  return (
    <div>
      <h1>Signin Page</h1>

      <form className="form">
        <p className="form-title">Sign in to your account</p>
        
        <div className="input-container">
          <input type="email" placeholder="Enter email" />
        </div>
        
        <div className="input-container">
          <input type="password" placeholder="Enter password" />
        </div>
        
        <button type="submit" className="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account? <a href="#">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;

