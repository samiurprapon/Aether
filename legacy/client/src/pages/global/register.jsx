import GlobalTopbar from "../../layout/GlobalTopbar";
import { Button } from "@mui/material";

import contentImg from "../../assets/content.svg";

const register = () => {
  return (
    <>
      <GlobalTopbar />
      <div className="container mx-auto mt-20">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <form className="flex w-full flex-col items-center justify-center sm:w-1/2 md:justify-center">
            <h1 className="font-BalooBhai text-3xl md:text-3xl">
              Create Your Account
            </h1>
            <div className="mt-8 w-3/4 border-2 border-red-200 px-3 shadow-sm focus-within:border-l-4 focus-within:border-l-red-400 sm:w-96">
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
            <div className="mt-5 w-3/4 border-2 border-red-200 px-3 shadow-sm focus-within:border-l-4 focus-within:border-l-red-400 sm:w-96">
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
            <div className="mt-5 w-3/4 border-2 border-red-200 px-3 shadow-sm focus-within:border-l-4 focus-within:border-l-red-400 sm:w-96">
              <label className="block text-xs" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                className="pb-1 outline-none"
                type="password"
                name="confirm-password"
                id="confirm-password"
              />
            </div>
            <div className="mt-2 w-3/4 sm:w-96">
              <p className="mb-1 text-left font-Montserrat text-xs text-red-400 sm:text-sm">
                I'm a -
              </p>
              <div className="inline border-2 border-red-200 py-[1px] px-3">
                <input
                  className="mr-3 border-red-400"
                  type="radio"
                  name="radio"
                  id="student-option"
                />
                <label htmlFor="student-option">Student</label>
              </div>
              <div className="ml-7 inline border-2 border-red-200 py-[1px] px-3">
                <input
                  className="mr-3 border-red-400"
                  type="radio"
                  name="radio"
                  id="teacher-option"
                />
                <label htmlFor="teacher-option">Teacher</label>
              </div>
            </div>
            <div className="mt-2 w-3/4 sm:w-96">
              <Button variant="contained" size="large">
                Register
              </Button>
            </div>
          </form>
          <div className="hidden w-full sm:w-1/2 md:flex md:justify-center">
            <img src={contentImg} alt="body-doodle" />
          </div>
        </div>
      </div>
    </>
  );
};

export default register;
