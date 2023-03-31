import React from 'react'
function CourseCard(props) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://source.unsplash.com/random/500x300"
          alt="Course Image"
          className="w-full h-48 object-cover"
        />
        <div className="px-4 py-2">
          <h2 className="text-xl font-bold mb-2">{props.title}</h2>
          <p className="text-gray-700 mb-2">{props.instructor}</p>
          <p className="font-bold">${props.price}</p>
        </div>
        <div className="bg-gray-100 px-4 py-2">
          <div className="text-sm text-gray-600 mb-1">Progress</div>
          <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-2 bg-indigo-500 rounded-full"
              style={{ width: `${props.progress}%` }}
            ></div>
          </div>
        </div>
        <div className="px-4 py-2">
          <a
            href="#"
            className="text-indigo-500 hover:text-indigo-700 transition duration-200"
          >
            Download
          </a>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-red-500">{props.status}</span>
        </div>
      </div>
    );
  }

  const courses = [
    {
      title: 'Course 1',
      instructor: 'Instructor 1',
      price: 9.99,
      progress: 75,
      status: 'Refunded'
    },
    {
      title: 'Course 2',
      instructor: 'Instructor 2',
      price: 12.99,
      progress: 100,
      status: 'Completed'
    },
    {
      title: 'Course 3',
      instructor: 'Instructor 3',
      price: 24.99,
      progress: 50,
      status: 'In progress'
    },
    // Add more courses as needed
  ];
function PurchaseHistory() {
    return (
        <div className='pt-16 pb-4'>

            <div className="bg-gray-100 min-h-screen">
                <header className="bg-white shadow-md">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <a href="#" className="text-lg font-bold">
                            Site Logo
                        </a>
                        <div className="flex items-center">
                            <input
                                type="search"
                                placeholder="Search"
                                className="border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            <a
                                href="#"
                                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition duration-200"
                            >
                                Profile
                            </a>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto mt-8 mb-4 px-4">
                    <h1 className="text-3xl font-bold">Purchase History</h1>
                </div>

                <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {courses.map((course) => (
        <div key={course.title}>
          <CourseCard
            title={course.title}
            instructor={course.instructor}
            price={course.price}
            progress={course.progress}
            status={course.status}
          />
        </div>
      ))}
    </div>
  </div>
</div>

                </div>
                )
}

                export default PurchaseHistory