"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils"
import { toast } from "sonner";
import Cookies from "js-cookie";
import Link from "next/link";
import { BASE_API } from "@/utilities/environtment";
import {
    IconBrandGoogle,
} from "@tabler/icons-react";
import { Modal, ModalBody, ModalContent, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export function SignUpContainer() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [tempGoogleData, setTempGoogleData] = useState({
        email: "",
        name: "",
        avatar: "",
        google_sub: ""
    })
    const googleRegisterModal = useDisclosure()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const inputData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmation_password: formData.get("confirmation_password"),
            phone_number: formData.get("phone_number"),
            country: formData.get("country"),
            province: formData.get("province"),
            city: formData.get("city"),
            zip_code: formData.get("zip_code"),
            complete_address: formData.get("complete_address"),
        };

        if (!formValidation(inputData)) return;

        try {
            setIsLoading(true)
            const res = await fetch(BASE_API + "/auth/register", {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            const data = await res.json()
            if (res.ok) {
                toast.success("Register successful, check your mail!");
                router.push("/auth/login")
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Connection error!");
        } finally {
            setIsLoading(false)
        }
    };

    const formValidation = (data) => {
        const validationRules = {
            name: /^[a-zA-Z\s]+$/, // Only letters and spaces
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
            password: /^.{8,}$/, // At least 8 characters
            phone_number: /^\+?[0-9]{10,15}$/, // Phone number with optional "+" and 10-15 digits
            country: /^[a-zA-Z\s]+$/, // Only letters and spaces
            province: /^[a-zA-Z\s]+$/, // Only letters and spaces
            city: /^[a-zA-Z\s]+$/, // Only letters and spaces
            zip_code: /^\d{5,6}$/, // 5 or 6 digits for zip code
            complete_address: /^.{10,}$/, // At least 10 characters
        };
    
        const { password, confirmation_password, ...otherFields } = data;
        const missingFields = [];
        const invalidFields = [];
    
        for (const [field, value] of Object.entries(otherFields)) {
            if (!value) {
                missingFields.push(field);
            } else if (validationRules[field] && !validationRules[field].test(value)) {
                invalidFields.push(field);
            }
        }
    
        if (!password || !validationRules.password.test(password)) {
            invalidFields.push("password");
        }
        if (!confirmation_password || confirmation_password !== password) {
            invalidFields.push("confirmation_password");
        }
    
        if (missingFields.length > 0) {
            toast.error(`Missing fields: ${missingFields.join(", ")}`);
            return false;
        }
    
        if (invalidFields.length > 0) {
            toast.error(`Invalid fields: ${invalidFields.join(", ")}`);
            return false;
        }
    
        return true;
    };
    


    const handleGoogleRegisterSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);

        const inputData = {
            email: tempGoogleData.email,
            name: tempGoogleData.name,
            google_sub: tempGoogleData.google_sub,
            avatar: tempGoogleData.avatar,
            phone_number: formData.get("phone_number"),
            country: formData.get("country"),
            province: formData.get("province"),
            city: formData.get("city"),
            zip_code: formData.get("zip_code"),
            complete_address: formData.get("complete_address"),
        };

        if (!googleFormValidation(inputData)) return;

        try {
            setIsLoading(true)
            const res = await fetch(BASE_API + "/auth/google/register", {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            })

            const data = await res.json()
            if (res.ok) {
                Cookies.set("user_jwt", data.data)
                toast.success("Login successful");
                location.replace('/')
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Connection error")
        } finally {
            setIsLoading(false)
        }
    }

    const googleFormValidation = (data) => {
        const requiredFields = {
            phone_number: /^\+?[0-9]{10,15}$/,
            country: /^[a-zA-Z\s]+$/,
            province: /^[a-zA-Z\s]+$/,
            city: /^[a-zA-Z\s]+$/,
            zip_code: /^\d{5,6}$/,
            complete_address: /^.{10,}$/,
        };

        const missingFields = [];
        const invalidFields = [];

        for (const [field, regex] of Object.entries(requiredFields)) {
            if (!data[field]) {
                missingFields.push(field);
            } else if (!regex.test(data[field])) {
                invalidFields.push(field);
            }
        }

        if (missingFields.length > 0) {
            toast.error(`Missing fields: ${missingFields.join(", ")}`);
            return false;
        }

        if (invalidFields.length > 0) {
            toast.error(`Invalid fields: ${invalidFields.join(", ")}`);
            return false;
        }

        return true;
    };


    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await fetch(
                    `https://www.googleapis.com/oauth2/v3/userinfo`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`
                        },
                        method: "GET"
                    }
                );

                if (userInfo.ok) {
                    const data = await userInfo.json()

                    const res = await fetch(BASE_API + "/auth/google/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: data.email,
                            google_sub: data.sub
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const res_data = await res.json()
                    if (res.ok) {
                        Cookies.set("user_jwt", res_data.data)
                        toast.success("Login successful");
                        location.replace('/')
                    } else if (res.status === 404) {
                        setTempGoogleData({
                            email: data.email,
                            google_sub: data.sub,
                            name: data.name,
                            avatar: data.picture,
                        })
                        googleRegisterModal.onOpen()
                    } else {
                        toast.error(res_data.message);
                    }
                }

            } catch (error) {
                console.error(error);
                toast.error("Failed to login with Google");
            }
        },
        onError: (error) => {
            toast.error("Google login failed");
        }
    });

    return (
        (<div
            className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 text-slate-900 bg-transparent">
            <h2 className="font-bold text-xl text-slate-900 ">
                Sign Up to Nganterin
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2">
                While our login feature is still in the works, you can register now and start exploring the possibilities with Nganterin.
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Walter Pinkman" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input id="phone_number" name="phone_number" placeholder="(+62) 813 0000 0000" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" placeholder="AS" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="province">Province</Label>
                    <Input id="province" name="province" placeholder="New Mexico" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" placeholder="Albuquerque" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="zip_code">Zip Code</Label>
                    <Input id="zip_code" name="zip_code" placeholder="87111" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="complete_address">Complete Address</Label>
                    <Input id="complete_address" name="complete_address" placeholder="3828 Piermont Dr, Albuquerque, NM 87111" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" placeholder="••••••••" type="password" />
                    <p className="text-xs">*Password must be at least 8 characters</p>
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                    <Label htmlFor="confirmation_password">Confirm Password</Label>
                    <Input id="confirmation_password" name="confirmation_password" placeholder="••••••••" type="password" />
                    <p className="text-xs">*Password must be match</p>
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative flex flex-row gap-2 justify-center items-center group/btn from-sky-500 to-sky-700 text-white w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={isLoading}

                >
                    <Spinner color="white" size="sm" className={!isLoading && "hidden"} />
                    Register &rarr;
                    <BottomGradient />
                </button>
                <div
                    className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <button
                        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-slate-900 rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                        type="button"
                        onClick={handleGoogleLogin}
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Google
                        </span>
                        <BottomGradient />
                    </button>
                </div>
            </form>
            <Modal isOpen={googleRegisterModal.isOpen} onOpenChange={googleRegisterModal.onOpenChange} isDismissable={false} closeButton={<></>} backdrop="blur" radius="sm">
                <ModalContent className="text-slate-900">
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Complete your registration</ModalHeader>
                            <ModalBody>
                                <form className="mb-6" onSubmit={handleGoogleRegisterSubmit}>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="phone_number">Phone Number</Label>
                                        <Input id="phone_number" name="phone_number" placeholder="(+62) 813 0000 0000" type="text" />
                                    </LabelInputContainer>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="country">Country</Label>
                                        <Input id="country" name="country" placeholder="AS" type="text" />
                                    </LabelInputContainer>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="province">Province</Label>
                                        <Input id="province" name="province" placeholder="New Mexico" type="text" />
                                    </LabelInputContainer>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" name="city" placeholder="Albuquerque" type="text" />
                                    </LabelInputContainer>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="zip_code">Zip Code</Label>
                                        <Input id="zip_code" name="zip_code" placeholder="87111" type="text" />
                                    </LabelInputContainer>
                                    <LabelInputContainer className="mb-8">
                                        <Label htmlFor="complete_address">Complete Address</Label>
                                        <Input id="complete_address" name="complete_address" placeholder="3828 Piermont Dr, Albuquerque, NM 87111" type="text" />
                                    </LabelInputContainer>

                                    <button
                                        className="bg-gradient-to-br relative flex flex-row gap-2 justify-center items-center group/btn from-sky-500 to-sky-700 text-white w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                                        type="submit"
                                        disabled={isLoading}

                                    >
                                        <Spinner color="white" size="sm" className={!isLoading && "hidden"} />
                                        Register &rarr;
                                        <BottomGradient />
                                    </button>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>)
    );
}

const BottomGradient = () => {
    return (<>
        <span
            className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span
            className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>);
};

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        (<div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>)
    );
};
