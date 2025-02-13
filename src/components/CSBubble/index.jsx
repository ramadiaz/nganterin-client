'use client'

import { CS_API, CS_WS } from '@/utilities/environtment'
import { Avatar, Button, Image, Input, Spinner } from '@nextui-org/react'
import { Headset, PaperPlaneTilt } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import CSChats from '../CSChats'

export const CSBubble = () => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const open = localStorage.getItem('cs_open')
        if (open) {
            setIsOpen(open === 'true')
        }
    }, [])

    const handleOpen = () => {
        localStorage.setItem('cs_open', !isOpen)
        setIsOpen(!isOpen)
    }

    return (
        <div className='fixed flex flex-col justify-end items-end gap-4 bottom-10 right-10 w-max h-max z-50'>
            <CSWindow isOpen={isOpen} />
            <Button
                className='bg-gradient-to-br from-sky-500 to-sky-700 rounded-full p-3 w-max h-max shadow-lg shadow-sky-700'
                isIconOnly
                onClick={() => handleOpen()}
            >
                <Headset size={40} color='#fffceb' />
            </Button>
        </div>
    )
}

const CSWindow = ({ isOpen }) => {
    const [token, setToken] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token)
        }
    }, [])

    return (
        <div className={`rounded-xl h-[400px] w-[300px] flex flex-col bg-white shadow-lg shadow-neutral-700/50 ${isOpen ? '' : 'hidden'}`}>
            <div className='bg-gradient-to-r from-sky-500 to-sky-700 text-white px-4 py-3 rounded-md font-poppins flex flex-row gap-4 items-center justify-start'>
                <Avatar src='/avatar/cs.webp' />
                <div>
                    <p className='text-left font-semibold text-xl'>
                        Temenin
                    </p>
                    <p className='text-xs opacity-90'>Ask anything!</p>
                </div>
            </div>
            {token ? <ChatSection /> : <GettingStartSection setToken={setToken} />}
        </div>
    )
}

const GettingStartSection = ({ setToken }) => {
    const [isRegistering, setIsRegistering] = useState(false)

    return (
        <>
            {
                isRegistering ? <RegisterSection setToken={setToken} />
                    :
                    <div className='flex-grow flex flex-col gap-4 items-center justify-center p-4'>
                        <Image
                            src='/images/others/cs-cloud.webp'
                            width={150}
                            alt='cs-cloud'
                        />
                        <Button
                            className='bg-gradient-to-r from-sky-400 to-sky-600 text-white' onClick={() => setIsRegistering(true)}
                        >
                            Chat Temenin
                        </Button>
                    </div>
            }

        </>
    )
}
const ChatSection = () => {
    const [chats, setChats] = useState([]);
    const [ws, setWs] = useState(null);
    const [message, setMessage] = useState("");
    const pingInterval = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chats]);

    useEffect(() => {
        const lastChats = localStorage.getItem("chats");
        if (lastChats) {
            setChats(JSON.parse(lastChats));
        }

        const last = localStorage.getItem("last")
        const token = localStorage.getItem("token");
        if (!token) return;

        const socket = new WebSocket(`${CS_WS}/ws/chat?token=${token}&last=${last}`);

        socket.onopen = () => {
            console.log("WebSocket connected");
            setWs(socket);

            pingInterval.current = setInterval(() => {
                if (socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({ type: "ping" }));
                }
            }, 30000);
        };

        socket.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                localStorage.setItem("last", data.uuid);
                setChats((prev) => {
                    localStorage.setItem("chats", JSON.stringify([...prev, data]));

                    return [...prev, data]
                });


            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
            }
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");

            if (pingInterval.current) {
                clearInterval(pingInterval.current);
                pingInterval.current = null;
            }
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
            if (pingInterval.current) {
                clearInterval(pingInterval.current);
            }
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            toast.error("WebSocket not connected");
            return;
        }

        const payload = JSON.stringify({ message });
        ws.send(payload);
        setMessage("");
    };

    return (
        <>
            <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
                {chats.map((chat, i) => (
                    <CSChats key={i} data={chat} />
                ))}
            </div>
            <form onSubmit={sendMessage} className="px-4 py-3 w-full flex flex-row gap-2">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="faded"
                    placeholder="Type your message here"
                    className="text-black"
                />
                <Button type="submit" className="bg-gradient-to-br from-sky-500 to-sky-700" isIconOnly>
                    <PaperPlaneTilt size={24} color="#fffceb" />
                </Button>
            </form>
        </>
    );
};

const RegisterSection = ({ setToken }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const payload = {
                email: e.target.email.value,
                phone: "+62" + e.target.phone.value,
                name: e.target.name.value,
            }

            const res = await fetch(CS_API + '/customer/register', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json()
            if (res.ok) {
                localStorage.setItem('token', data.body)
                setToken(data.body)
            } else {
                toast.error(data.error)
            }
        } catch (err) {
            toast.error("Connection Error")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex-grow px-4 py-4 items-center justify-center'>
            <div className='space-y-2 h-max'>
                <p className='text-neutral-700 mt-2 font-semibold'>
                    Help us, know who you are :3
                </p>
                <Input
                    variant='faded'
                    label='Email'
                    name='email'
                    type='email'
                    size='sm'
                    className='text-black text-sm'
                />
                <div className='flex flex-row items-center gap-2'>
                    <div className='text-neutral-500 border-2 py-2 px-2 rounded-lg border-neutral-500/20 bg-neutral-500/10'>
                        +62
                    </div>
                    <Input
                        variant='faded'
                        label='Phone'
                        name='phone'
                        size='sm'
                        type='number'
                        className='text-black text-sm'
                    />
                </div>
                <Input
                    variant='faded'
                    label='Name'
                    name='name'
                    size='sm'
                    className='text-black text-sm'
                />
                <br />
                <Button type='submit' className='bg-gradient-to-r from-sky-500 to-sky-700 text-white w-full'>
                    <Spinner size="sm" color='white' className={`${isLoading ? '' : 'hidden'}`} />
                    Chat Temenin
                </Button>
            </div>
        </form>
    )
}