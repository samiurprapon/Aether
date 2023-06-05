// import MUI components
import Button from "@mui/material/Button";
// import static assets
import logo from "../assets/images/logo.svg";
export default function Nav() {
  function handleNavBtnCLick(action){
    alert(action)
  }
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>

      <ul className="nav-lists">
        <li><Button variant="contained" size="large" onClick={() => {handleNavBtnCLick('signup')}}>Sign up</Button></li>
        <li><Button variant="outlined" size="large" onClick={() => {handleNavBtnCLick('login')}}>Login</Button></li>
      </ul>

    </nav>
  );
}