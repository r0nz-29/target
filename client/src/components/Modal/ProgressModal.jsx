export default function ProgressModal({title}) {
	return (
		<div className="bg-black/[0.6] absolute w-screen h-screen flex justify-center items-center">
			<div className="p-4 bg-white w-1/3 rounded-lg shadow dark:bg-gray-700">
				<p className="text-xl">{title}</p>
			</div>
		</div>
	)
}
