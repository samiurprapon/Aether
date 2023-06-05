import { Container, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

// landing page components
import Nav from "../components/Nav";
import HeroContent from '../components/HeroContent';

const LandingPage = () => {
  return (
    <Container sx={{ paddingX: 0 }}>
      <Typography variant="h3">
        <Nav />
        <Container maxWidth={"lg"}>
        <HeroContent/>
        </Container>
      </Typography>
    </Container>
  );
};

export default LandingPage;
