import React from "react";

const Hero = () => {
  return (
    <div>
      <div
        className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto
       text-center flex flex-col justify-center p-4"
      >
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Vote for Web3 communities from bitFlyer safe wallet
        </h1>
        <div>
          <p>
            Lock your tokens, and mint voting right NFT to jump into
            <a
              href="https://ethereum.foundation/infinitegarden"
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
            >
              &nbsp; The Infinite Garden
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
