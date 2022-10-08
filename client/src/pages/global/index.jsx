import GlobalTopbar from "../../layout/GlobalTopbar";
import { Link } from 'react-router-dom';
import appleStoreImg from "../../assets/apple_store.svg";
import playStoreImg from "../../assets/play_store.svg";
import contentImg from "../../assets/content.svg";

const Index = () => {
  return (
    <>
      <GlobalTopbar />
      {/* Main Body */}
      <div className="container mx-auto w-4/5 mt-20 font-Montserrat mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 md:gap-x-40">
          <div className="text-center">
            <h1 className="text-left text-5xl md:text-7xl font-bold">
              Make Learning
              <br />
              Fun!
            </h1>
          </div>
          {/* content image */}
          <div className="row-span-4 mt-8 pr-9">
            <img
              src={contentImg}
              alt="content"
            />
          </div>
          <div className="row-span-2 pt-9 md:pt-6">
            <p className="text-2xl">
              Where your instructor knows the best{" "}
              <br className="hidden md:inline-block" />
              way to make you understand.
            </p>
            <button className="mt-14 rounded-md bg-primary px-14 py-3 text-white text-lg font-bold">
              <Link to='/Register'>Sign up for free</Link>
            </button>
          </div>
          {/* play store and apple store buttons */}
          <div className="mb-4 mt-12 sm:mt-0">
            <p className="mb-4 text-lg">Or download the app:</p>
            <div className="flex flex-row w-4/5">
              <img src={playStoreImg} alt="google-play" />
              <img className="" src={appleStoreImg} alt="google-play" />
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-auto w-full text-center font-Montserrat">
        <ul className="flex flex-row flex-wrap justify-center">
          <li className="px-4 text-lg">
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li className="px-4 text-lg">
            <a href="/terms-conditions.html">Terms &amp; Conditions</a>
          </li>
          <li className="px-4 text-lg">
            <a href="/about">About</a>
          </li>
        </ul>
        <p className="mt-1">aether © 2021</p>
      </div>
    </>
  );
};

export default Index;
