import { Container, Typography } from "@mui/material";
import Nav from "../components/Nav";
import SignupContent from '../components/SignupContent';

export default function Signup(){
    return (
        <Container sx={{ paddingX: 0 }}>
          <Typography variant="h3">
            <Nav />
            <Container maxWidth={"lg"}>
                <SignupContent/>
            </Container>
          </Typography>
        </Container>
      );
}