import Image from "next/image";

const Page = () => {
  return (
    <>
      <div className="bg-orange-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex flex-col items-center">
            <Image
              className="w-32 h-32 object-cover rounded-full border-4 border-sky-700"
              src="/images/profile/nig.jpg"
              width={200}
              height={200}
              alt="Profile Picture"
            />
            <h2 className="text-2xl font-bold mt-4 text-gray-800">Nig</h2>
          </div>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium w-1/3">Email</label>
              <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                nig@gmail.com
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium w-1/3">Gender</label>
              <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                Male
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium w-1/3">
                Phone Number
              </label>
              <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                085155115622
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium w-1/3">Country</label>
              <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                Indonesia
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium w-1/3">
                Province
              </label>
              <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                West Java
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium w-1/3">City</label>
              <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                Bandung
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium w-1/3">
                Zip Code
              </label>
              <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                40151
              </p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-gray-600 font-medium w-1/3">Address</label>
              <p className="text-gray-900 bg-gray-100 rounded-lg px-4 py-2 w-2/3">
                Bandung, Bandung Kota, Jawa Barat, Indonesia, 40151
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-orange-100 to-orange-50 h-24"></div>
    </>
  );
};

export default Page;
