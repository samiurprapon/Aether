// import MUI components
import Button from "@mui/material/Button";
// import static assets
import logo from "../assets/images/logo.svg";
export default function Nav({primary_btn = {text: 'Sign up', href: '/signup'}, secondary_btn = {text: 'Login', href: '/login'}}) {
  function handleNavBtnCLick(action){
    alert(action)
  }
  return (
    <nav style={{margin: '3rem 0'}}>
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>

      <ul className="nav-lists">
        <li><Button variant="contained" size="large" href={primary_btn.href}>{primary_btn.text}</Button></li>
        <li><Button variant="outlined" size="large" href={secondary_btn.href}>{secondary_btn.text}</Button></li>
      </ul>

    </nav>
  );
}