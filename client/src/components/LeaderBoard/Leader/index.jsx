import React from 'react'

const Leader = () => {

    const backgroundImageUrl = 'url(./Leader_Header.svg)';
    const backgroundSize = '100% auto';
    const backgroundPosition = 'center top';
  
    return (
      <section
        className="text-gray-700 body-font py-12"
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition, 
          height: '100%',
          width: '100%',
        }}
      >
        <div className="container px-5 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-4xl font-bold title-font text-white">LEADER BOARD</h1>
            </div>
            <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    1
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">Name</h2>
                </div>
                <div className="flex-grow">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Accuracy</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Speed</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Raw</th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-3">5 Mb/s</td>
                        <td className="px-4 py-3">15 GB</td>
                        <td className="px-4 py-3 text-lg text-gray-900">Free</td>
                        <td className="w-10 text-center"></td>
                    </tr>
                </tbody>
                </table>
                </div>
                </div>
            </div>
            <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">The Catalyzer</h2>
                </div>
                <div className="flex-grow">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Accuracy</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Speed</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Raw</th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-3">5 Mb/s</td>
                        <td className="px-4 py-3">15 GB</td>
                        <td className="px-4 py-3 text-lg text-gray-900">Free</td>
                        <td className="w-10 text-center"></td>
                    </tr>
                </tbody>
                </table>
                </div>
                </div>
            </div>
            <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <circle cx="6" cy="6" r="3"></circle>
                        <circle cx="6" cy="18" r="3"></circle>
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                    </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">Neptune</h2>
                </div>
                <div className="flex-grow">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Accuracy</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Speed</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Raw</th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-3">5 Mb/s</td>
                        <td className="px-4 py-3">15 GB</td>
                        <td className="px-4 py-3 text-lg text-gray-900">Free</td>
                        <td className="w-10 text-center"></td>
                    </tr>
                </tbody>
                </table>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
  )
}

export default Leader