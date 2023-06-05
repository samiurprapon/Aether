// import components
import { Button, Grid } from "@mui/material";
import Input from './Input';

// import assets
import hero_image from "../assets/images/hero.svg";
export default function LoginContent(){
    function handleSubmit(e){
        e.preventDefault();
        const form_data = new FormData(e.target);
        const credentials = {};
        for(let [key, val] of form_data.entries()){
            credentials[key] = val;
        }
        // TODO: authenticate
    }
    return <>
    <Grid container spacing={3} height={'calc(100vh - ( 2 * 3rem))'} justifyContent={'center'}>
        <Grid item md={6} alignSelf={'center'}>
            <form style={{height: '100%'}} onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                    <Grid item md={12}>
                        <h3 style={{color: 'rgba(0, 0, 0, 0.6)', fontSize: '56px'}}>Welcome back!</h3>
                    </Grid>
                    <Grid item md={12}>
                        <Input id="email" name="email" label="Email Address" fullWidth={true} required={true} type="email"/>
                    </Grid>
                    <Grid item md={12}>
                    <Input id="password" name="password" label="Password" fullWidth={true} required={true} type="password"/>
                    </Grid>
                    <Grid item md={12}>
                        <Grid container justifyContent={'center'} alignItems={'center'}>
                            <Grid item md={6}>
                                <div style={{display:'flex', justifyContent: 'start', alignItems:'center'}}>
                                <input type="checkbox" id="remember" name="remember"/>
                                <label htmlFor="remember" style={{fontSize: '1rem', margin:'0 0.5rem'}}>Remember me</label>
                                </div>
                            </Grid>
                            <Grid item md>
                                <Button href="#" variant="text" size="small">Forgot Password?</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Button variant="contained" size="large" type="submit">Login</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
        <Grid item md alignSelf={'center'}>
            <img src={hero_image} alt="Hero Image" />
        </Grid>
    </Grid>
    </>;
}