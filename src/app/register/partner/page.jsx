"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { CompassRose, Link as LinkIcon } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF"];

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileURLs, setUploadedFileURLs] = useState([]);
  const user_token = Cookies.get("user_token");
  console.log({ user_token });

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    handleUpload(file);

    console.log({ file });
  };

  const handleUpload = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${BASE_API}/files/upload`, {
        method: "POST",
        headers: {
          "X-Authorization": API_KEY,
          Authorization: `Bearer ${user_token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedFileURLs((prev) => [...prev, data.data]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    console.log({ uploadedFileURLs });
  }, [uploadedFileURLs]);

  return (
    <div className="text-neutral-700 pt-12">
      <div className="w-3/5 mx-auto" data-aos="fade-up">
        <div className="flex flex-row gap-4 items-center justify-center">
          <h1 className="text-4xl font-semibold">
            Let's Partner with Nganterin!
          </h1>
          <LinkIcon size={64} className="animate-pulse" />
        </div>
        <div className="mt-14 p-8 bg-white rounded-lg shadow-lg shadow-neutral-600/50">
          <div>
            <h2 className="text-lg">Tell us about your company!</h2>
          </div>
          <form className="flex flex-col gap-8 mt-4">
            <div>
              <Input type="text" variant="bordered" label="Your company name" />
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-1/2 flex flex-row gap-4">
                <Input type="text" variant="bordered" label="Owner name" />
                <Input type="text" variant="bordered" label="Company Field" />
              </div>
              <div className="basis-1/2">
                <Input type="email" variant="bordered" label="Company Email" />
              </div>
            </div>
            <div>
              <Textarea
                name="company_address"
                variant="bordered"
                type="text"
                label="Company Address"
                disableAutosize
                classNames={{
                  input: "resize-y min-h-[40px]",
                }}
              />
            </div>
            <div>
              <FileUploader
                handleChange={handleChange}
                name="file"
                multiple={false}
                types={fileTypes}
                children={
                  <div className="border-2 border-neutral-300/60 hover:border-neutral-400 flex justify-center items-center h-24 rounded-xl">
                    <h3 className="opacity-80">
                      {file
                        ? "Drop .pdf file here!"
                        : isUploading
                        ? "Uploading..."
                        : "Uploaded"}
                    </h3>
                  </div>
                }
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-sky-600 text-white">
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
