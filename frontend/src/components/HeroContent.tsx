import { Grid, Button } from "@mui/material";
import hero_image from "../assets/images/hero.svg";
import apple_store from "../assets/images/apple_store.svg";
import play_store from "../assets/images/play_store.svg";
export default function HeroContent() {
  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"100vh"}
        spacing={10}
      >
        <Grid item md={6}>
          <Grid container spacing={16}>
            <Grid item container spacing={3}>
              <Grid item md={12}>
                <h1
                  style={{
                    color: "#2F281E",
                    fontWeight: "extrabold",
                    fontSize: "74px",
                  }}
                >
                  Make Learning fun!
                </h1>
              </Grid>
              <Grid item md={12}>
                <p style={{ fontSize: "24px", color: "#544837" }}>
                  Where your instructor knows the best way to make you
                  understand.
                </p>
              </Grid>
              <Grid item md={12}>
                <Button variant="contained" size="large">
                  Sign up for free
                </Button>
              </Grid>
            </Grid>
            <Grid item container spacing={3}>
              <Grid item>
                <a href="#">
                  <img src={apple_store} alt="Apple Store" />
                </a>
              </Grid>
              <Grid item>
                <a href="#">
                  <img src={play_store} alt="PLay Store" />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md>
          <img src={hero_image} alt="Hero Image" width={"100%"} />
        </Grid>
      </Grid>
    </>
  );
}
