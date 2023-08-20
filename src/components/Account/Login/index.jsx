import React from 'react';

const Login = ({onValueChange, login, error, loginUser, toggle}) => {
	return (
		<div>
			<section className="h-screen">
				<div className="px-6 h-full flex text-gray-800">
					<div
						className="my-auto mx-auto max-w-7xl grid grid-cols-2 gap-32">
						<img
							src="login_image.svg"
							className="w-9/10 mx-auto sm:my-5"
							alt="Login image"
						/>
						<form>
							<div className="text-indigo-400 font-bold font-primaryfont text-4xl py-5 ">
								Rocket Type
							</div>

							<div className="mb-6">
								<input
									type="text"
									className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Username"
									onChange={onValueChange}
									name="username"
									value={login.username}
								/>
							</div>

							<div className="mb-6">
								<input
									type="password"
									className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									placeholder="Password"
									onChange={onValueChange}
									name="password"
									value={login.password}
								/>
							</div>
							{error && <div className="pb-4 text-red-600 ">{error}</div>}
							<div className="text-center lg:text-left">
								<button
									type="button"
									className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm rounded shadow-md bg-indigo-800 hover:bg-indigo-900 hover:text-white hover:shadow-lg active:shadow-lg"
									onClick={() => loginUser()}
								>
									Login
								</button>
								<div
									className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
									<p className="text-center font-semibold mx-4 mb-0 text-white">Or</p>
								</div>
								<p className="text-sm text-white font-semibold mt-2 pt-1 mb-0">
									Don't have an account?
									<button
										className="text-indigo-400 hover:text-blue-700 focus:text-blue-700 focus:outline-none font-semibold pl-1"
										onClick={toggle}
									>
										Sign up here
									</button>
								</p>
							</div>
						</form>
						{/*</div>*/}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Login;
