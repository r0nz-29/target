import Lottie from "lottie-react";

// eslint-disable-next-line react/prop-types
export default function LottieModal({animation}) {
	return (
		<div className="bg-black/[0.6] absolute w-screen h-screen flex justify-center items-center">
			<div className="p-4 bg-white w-1/5 rounded-lg shadow dark:bg-gray-700">
				<Lottie animationData={animation} loop={true} />
			</div>
		</div>
	)
}
