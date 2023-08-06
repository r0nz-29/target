import React from 'react';

const SignUp = ({ onInputChange, signupUser, error, toggle }) => {
  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
        >
          <div
            className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
          >
            <img
              src="./signin_image.svg"
              className="w-3/4 mx-auto sm:my-5"
              alt="signup image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="text-indigo-900 font-bold font-primaryfont text-4xl py-5 md:mx-auto">
                Rocket Type
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onChange={(e) => onInputChange(e)}
                  name="email"
                  placeholder="Email address"
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onChange={(e) => onInputChange(e)}
                  name="username"
                  placeholder="Username"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  onChange={(e) => onInputChange(e)}
                  name="password"
                  placeholder="Password"
                />
              </div>
              {error && <div className="pb-4 text-red-600 ">{error}</div>}
              <div className="text-center lg:text-left">
                <button
                  type="button"
                  className="inline-block px-7 py-3 bg-primary font-medium text-sm rounded shadow-md bg-indigo-800 text-white hover:bg-indigo-900 hover:text-white hover:shadow-lg active:shadow-lg"
                  onClick={() => signupUser()}
                >
                  Sign In
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0 text-white">Or</p>
                </div>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0 text-white">
                  Already have an account?
                  <button
                    href="#!"
                    className="text-indigo-900 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                    onClick={() => toggle()}
                  >
                    Log in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
