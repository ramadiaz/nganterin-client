const Page = () => {
  return (
    <>
      <div className="bg-orange-100 flex items-center justify-center min-h-screen">
        <div className="max-w-screen-2xl w-full bg-white p-20 rounded-lg shadow-md">
          <h2 className="text-4xl font-semibold mb-3 text-gray-800 text-center">
            Contact Us
          </h2>
          <p className="text-black text-center mb-4">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form action="#" method="POST">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-gray-700 font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
                placeholder="Subject"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w- bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-700"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
