import React from 'react';

const Header = () => {

  const backgroundImageUrl = 'url(./Header.svg)';
  const backgroundSize = 'cover';

  return (
    <section className="text-white body-font -m- py-24" style={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: backgroundSize,
        height: '100%', 
        width: '100vw', 
      }}>
  <div class="mx-auto flex px-12 py-0 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 class="title-font sm:text-4xl text-4xl mb-4 font-bold text-white">ROCKET TYPE
      </h1>
      <p class="mb-8 leading-relaxed">Welcome to Rocket Type, the ultimate web application for improving your typing speed and accuracy! Whether you're a beginner looking to learn touch typing or a seasoned typist aiming to reach new heights, Rocket Type has got you covered.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 hover:text-white rounded text-lg">Practice Mode</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 hover:text-white rounded text-lg">Multiplayer Mode</button>
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:block hidden">
      <img class="object-cover object-center rounded" alt="Hero" src="Hero.svg"/>
    </div>
  </div>
</section>
  );
};

export default Header;
