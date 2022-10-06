import GlobalTopbar from "../../layout/GlobalTopbar";
import { Button } from "@mui/material";

const login = () => {
  return (
    <>
      <GlobalTopbar />
      <div className="container mx-auto mt-20">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* <!-- Login Form --> */}
          <form className="flex w-full flex-col items-center justify-center sm:w-1/2 md:justify-center">
            <h1 className="text-4xl font-BalooBhai">Welcome Back!</h1>
            <div className="mt-8 w-3/4 border-2 px-3 shadow-sm focus-within:border-l-4 focus-within:border-l-red-400 sm:w-96">
              <label className="block text-xs" htmlFor="email">
                Email Address
              </label>
              <input
                className="pb-1 outline-none"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="mt-5 w-3/4 border-2 px-3 shadow-sm focus-within:border-l-4 focus-within:border-l-red-400 sm:w-96">
              <label className="block text-xs" htmlFor="password">
                Password
              </label>
              <input
                className="pb-1 outline-none"
                type="password"
                name="password"
                id="password"
              />
            </div>
            {/* <!-- form controller --> */}
            <div className="mt-2 w-3/4 sm:w-96">
              <p className="text-right sm:text-lg">Forgot Password?</p>
              {/* <button className="mt-4 rounded-sm bg-red-400 py-1 px-7 text-2xl text-white font-Montserrat">
                Log in
              </button> */}
              <Button variant="contained" size="large">Login</Button>
            </div>
          </form>
          {/* <!-- body doodle --> */}
          <div className="hidden w-full sm:w-1/2 md:flex md:justify-center">
            <img
              src="https://stage.aether.buzz/assets/content.bff395fe.svg"
              alt="doodle"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
