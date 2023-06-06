import { Container, Typography } from "@mui/material";
import Nav from "../components/Nav";
import SignupContent from '../components/SignupContent';

export default function Signup(){
    return (
        <Container sx={{ paddingX: 0 }}>
          <Typography variant="h3">
            <Nav primary_btn={{text: 'Login', href: '/login'}} secondary_btn={{text: 'home', href: '/'}}/>
            <Container maxWidth={"lg"}>
                <SignupContent/>
            </Container>
          </Typography>
        </Container>
      );
}