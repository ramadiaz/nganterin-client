"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { Link as LinkIcon } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import Redirecting from "@/app/redirecting";

const fileTypes = ["PDF"];

const BASE_API = process.env.NEXT_PUBLIC_BASE_API;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Page = () => {
  const [inputData, setInputData] = useState({
    company_name: "",
    owner: "",
    company_field: "",
    company_email: "",
    company_address: "",
    legality_file: "",
    mou_file: "",
  });

  const { push } = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isUploading, setIsUploading] = useState({
    legality: false,
    mou: false,
  });
  const user_token = Cookies.get("user_token");
  console.log({ user_token });

  const [legalityFile, setLegalityFile] = useState(null);
  const [mouFile, setMOUFile] = useState(null);

  useEffect(() => {
    console.log({ legalityFile });
  }, [legalityFile]);

  const handleLegalityChange = async (file) => {
    const url = await handleUpload(file, "legality");
    setLegalityFile(url);
  };

  const handleMOUChange = async (file) => {
    const url = await handleUpload(file, "mou");
    setMOUFile(url);
  };

  const handleUpload = async (file, type) => {
    if (type == "legality") {
      setIsUploading((prev) => ({ ...prev, legality: true }));
    } else {
      setIsUploading((prev) => ({ ...prev, mou: true }));
    }
    let url;
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
        url = data.data;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }

    if (type == "legality") {
      setIsUploading((prev) => ({ ...prev, legality: false }));
    } else {
      setIsUploading((prev) => ({ ...prev, mou: false }));
    }

    return url;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("company_name", inputData.company_name);
    formData.append("owner", inputData.owner);
    formData.append("company_field", inputData.company_field);
    formData.append("company_email", inputData.company_email);
    formData.append("company_address", inputData.company_address);
    formData.append("legality_file", legalityFile);
    formData.append("mou_file", mouFile);
    try {
      const response = await fetch(`${BASE_API}/partner/register`, {
        method: "POST",
        headers: {
          "X-Authorization": API_KEY,
          Authorization: `Bearer ${user_token}`,
        },
        body: formData,
      });
      if (response.ok) {
        setIsRedirecting(true);
        const data = await response.json();
        Cookies.remove("user_partner_id");
        Cookies.set("user_partner_id", data.data.partner_id);
        push("/partner/hotel-register");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
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
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-8 mt-4"
            >
              <div>
                <Input
                  name="company_name"
                  value={inputData.company_name}
                  onChange={handleInputChange}
                  required
                  type="text"
                  variant="bordered"
                  label="Your company name"
                />
              </div>
              <div className="flex flex-row gap-4">
                <div className="basis-1/2 flex flex-row gap-4">
                  <Input
                    name="owner"
                    value={inputData.owner}
                    onChange={handleInputChange}
                    required
                    type="text"
                    variant="bordered"
                    label="Owner name"
                  />
                  <Input
                    name="company_field"
                    value={inputData.company_field}
                    onChange={handleInputChange}
                    required
                    type="text"
                    variant="bordered"
                    label="Company Field"
                  />
                </div>
                <div className="basis-1/2">
                  <Input
                    name="company_email"
                    value={inputData.company_email}
                    onChange={handleInputChange}
                    required
                    type="email"
                    variant="bordered"
                    label="Company Email"
                  />
                </div>
              </div>
              <div>
                <Textarea
                  name="company_address"
                  value={inputData.company_address}
                  onChange={handleInputChange}
                  required
                  variant="bordered"
                  type="text"
                  label="Company Address"
                  disableAutosize
                  classNames={{
                    input: "resize-y min-h-[40px]",
                  }}
                />
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="opacity-90 text-sm mx-2">
                    Upload legality file
                  </h3>
                  <FileUploader
                    required={true}
                    handleChange={handleLegalityChange}
                    name="file"
                    multiple={false}
                    types={fileTypes}
                    children={
                      <div className="border-2 border-neutral-300/60 hover:border-neutral-400 flex justify-center items-center h-24 rounded-xl w-64">
                        <h3 className="opacity-80 text-sm">
                          {isUploading.legality
                            ? "Uploading..."
                            : legalityFile
                            ? "Uploaded"
                            : "Drop .pdf file here!"}
                        </h3>
                      </div>
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="opacity-90 text-sm mx-2">Upload MOU file</h3>
                  <FileUploader
                    required={true}
                    handleChange={handleMOUChange}
                    name="file"
                    multiple={false}
                    types={fileTypes}
                    children={
                      <div className="border-2 border-neutral-300/60 hover:border-neutral-400 flex justify-center items-center h-24 rounded-xl w-64">
                        <h3 className="opacity-80 text-sm">
                          {isUploading.mou
                            ? "Uploading..."
                            : mouFile
                            ? "Uploaded"
                            : "Drop .pdf file here!"}
                        </h3>
                      </div>
                    }
                  />
                </div>
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
      {isRedirecting && <Redirecting />}
    </>
  );
};

export default Page;
