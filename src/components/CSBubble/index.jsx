'use client'

import { CS_API, CS_WS } from '@/utilities/environtment'
import { Avatar, Button, Image, Input, Spinner } from '@nextui-org/react'
import { Headset, PaperPlaneTilt } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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
        const cs_token = localStorage.getItem('cs_token')
        if (cs_token) {
            setToken(cs_token)
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
    const [chats, setChats] = useState([])
    const [ws, setWs] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("cs_token");
        if (!token) return;

        const socket = new WebSocket(`${CS_WS}/ws/chat?token=${token}`);

        socket.onopen = () => {
            console.log("WebSocket connected");
            setWs(socket);
        };

        socket.addEventListener('ping', (event) => {
            socket.pong();
        });

        socket.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                setChats((prev) => [...prev, data]);
            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
            }
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            socket.close();
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
            <div className='flex-grow p-4 overflow-y-auto'>
                {chats.map((chat, i) => (
                    <div key={i} className="mb-2 p-2 bg-gray-200 rounded-lg">
                        {chat.message}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className='px-4 py-3 w-full flex flex-row gap-2'>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} variant='faded' placeholder='Type your message here' className='text-black' />
                <Button type='submit' className='bg-gradient-to-br from-sky-500 to-sky-700' isIconOnly>
                    <PaperPlaneTilt size={24} color="#fffceb" />
                </Button>
            </form>
        </>
    )
}

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
                localStorage.setItem('cs_token', data.body)
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