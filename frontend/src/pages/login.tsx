import { Container, Typography } from "@mui/material";
import LoginContent from '../components/LoginContent';
import Nav from "../components/Nav";

export default function Login() {
    return (
        <Container sx={{ paddingX: 0 }}>
          <Typography variant="h3">
            <Nav />
            <Container maxWidth={"lg"}>
                <LoginContent/>
            </Container>
          </Typography>
        </Container>
      );
}
