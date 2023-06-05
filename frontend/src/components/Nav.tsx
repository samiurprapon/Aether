// import MUI components
import Button from "@mui/material/Button";
// import static assets
import logo from "../assets/images/logo.svg";
export default function Nav() {
  function handleNavBtnCLick(action){
    alert(action)
  }
  return (
    <nav style={{margin: '3rem 0'}}>
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>

      <ul className="nav-lists">
        <li><Button variant="contained" size="large" href="/signup">Sign up</Button></li>
        <li><Button variant="outlined" size="large" href="/login">Login</Button></li>
      </ul>

    </nav>
  );
}