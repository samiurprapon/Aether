// import components
import { Button, Grid } from "@mui/material";
import Input from './Input';

// import assets
import hero_image from "../assets/images/hero.svg";
export default function SignupContent(){
    function handleSubmit(e){
        e.preventDefault();
        const form_data = new FormData(e.target);
        const credentials = {};
        for(let [key, val] of form_data.entries()){
            credentials[key] = val;
        }
        console.log(credentials)
        // TODO: authenticate
    }
    return <>
    <Grid container spacing={3} height={'calc(100vh - ( 2 * 3rem))'} justifyContent={'center'}>
        <Grid item md={6} alignSelf={'center'}>
            <form style={{height: '100%'}} onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                    <Grid item md={12}>
                        <h3 style={{color: 'rgba(0, 0, 0, 0.6)', fontSize: '56px'}}>Create your account</h3>
                    </Grid>
                    <Grid item md={12}>
                        <Input id="email" name="email" label="Email Address" fullWidth={true} required={true} type="email"/>
                    </Grid>
                    <Grid item md={12}>
                    <Input id="password" name="password" label="Password" fullWidth={true} required={true} type="password"/>
                    </Grid>
                    <Grid item md={12}>
                    <Input id="password_confirm" name="password_confirm" label="Confirm Password" fullWidth={true} required={true} type="password"/>
                    </Grid>
                    <Grid item md={12}>
                        <Grid container justifyContent={'center'} alignItems={'center'}>
                            <Grid item md={6}>
                                <div style={{display:'flex', justifyContent: 'start', alignItems:'center'}}>
                                <input type="radio" id="radio_student" name="role" value="student"/>
                                <label htmlFor="radio_student" style={{fontSize: '1rem', margin:'0 0.5rem'}}>Student</label>
                                </div>
                            </Grid>
                            <Grid item md>
                            <div style={{display:'flex', justifyContent: 'start', alignItems:'center'}}>
                                <input type="radio" id="radio_teacher" name="role" value="teacher"/>
                                <label htmlFor="radio_teacher" style={{fontSize: '1rem', margin:'0 0.5rem'}}>Teacher</label>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <Button variant="contained" size="large" type="submit">Register</Button>
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