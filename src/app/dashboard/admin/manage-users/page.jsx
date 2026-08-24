'use client'
import { LockOpenFill } from '@gravity-ui/icons';
import { Button, Card, CardContent, CardFooter, Chip, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { FaEnvelopeCircleCheck } from 'react-icons/fa6';
import { TbLockBitcoin } from 'react-icons/tb';

// 👇 UserAvatar ManageUsers-এর বাইরে — component প্রতি render-এ নতুন হবে না
const UserAvatar = ({ image, name }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center shrink-0">
            {image && !imgError ? (
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                />
            ) : (
                <span className="text-lg font-semibold text-blue-500">
                    {name?.charAt(0).toUpperCase() || "U"}
                </span>
            )}
        </div>
    );
};

const ManageUsers = () => {
    const [users, setUsers] = useState([]); // "" এর বদলে [] — শুরুতেই array রাখা নিরাপদ
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-users`);
        const data = await res.json();
        const filtered = data.filter((user) => user.role !== "admin");
        setUsers(filtered);
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleBlockToggle = async (email, isBlocked) => {
        const endpoint = isBlocked ? "unblock" : "block";
        // 👇 আগে এখানে ${} মিসিং ছিল, ঠিক করা হলো
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${email}/${endpoint}`, {
            method: "PATCH",
        });
        fetchUsers();
    };

    if (loading) return <div className="flex justify-center py-20"><Spinner label="Loading users..." /></div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {users.map((user) => (
                <Card
                    key={user._id}
                    className="border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow"
                >
                    <CardContent className="items-center text-center gap-2 py-6">
                        {/* 👇 পুরনো inline image div-এর বদলে UserAvatar ব্যবহার */}
                        <UserAvatar image={user.image} name={user.name} />

                        <p className="font-semibold text-sm mt-2">{user.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <FaEnvelopeCircleCheck width={12} height={12} />
                            <span className="truncate max-w-[180px]">{user.email}</span>
                        </div>

                        <div className="flex gap-2 mt-2">
                            <Chip size="sm" variant="flat" color="primary">
                                {user.role || "no role"}
                            </Chip>
                            <Chip
                                size="sm"
                                variant="flat"
                                color={user.isBlocked ? "danger" : "success"}
                            >
                                {user.isBlocked ? "Blocked" : "Active"}
                            </Chip>
                        </div>
                    </CardContent>

                    <CardFooter className="pt-0 justify-center">
                        <Button
                            size="sm"
                            fullWidth
                            color={user.isBlocked ? "success" : "danger"}
                            variant="flat"
                            startContent={user.isBlocked ? <LockOpenFill width={16} /> : <TbLockBitcoin width={16} />}
                            onPress={() => handleBlockToggle(user.email, user.isBlocked)}
                        >
                            {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default ManageUsers;