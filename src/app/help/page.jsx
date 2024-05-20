import { Button, Input, Textarea } from "@nextui-org/react";

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
          <form className="flex flex-col gap-2">
            <div className="mb-4">
              <Input
                placeholder="Your name"
                variant="bordered"
                type="text"
                label="Name"
                labelPlacement="outside"
                radius="sm"
              />
            </div>
            <div className="mb-4">
              <Input
                placeholder="Your email"
                variant="bordered"
                type="email"
                label="Email"
                labelPlacement="outside"
                radius="sm"
              />
            </div>
            <div className="mb-4">
              <Input
                placeholder="Type subject"
                variant="bordered"
                type="text"
                label="Subject"
                labelPlacement="outside"
                radius="sm"
              />
            </div>
            <div className="mb-4">
              <Textarea
                disableAutosize
                variant="bordered"
                label="Message"
                type="text"
                radius="sm"
                labelPlacement="outside"
                classNames={{
                  input: "resize-y min-h-[40px]",
                }}
              />
            </div>
            <div className="mb-4">
              <Button className="bg-sky-700 text-white px-4 py-2 rounded-lg">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
