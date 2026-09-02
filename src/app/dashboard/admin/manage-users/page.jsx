'use client'
import { authClient } from '@/lib/auth-client';
import { LockOpenFill } from '@gravity-ui/icons';
import { Button, Chip, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { TbLockBitcoin } from 'react-icons/tb';
import { HiOutlineUsers } from 'react-icons/hi';

const UserAvatar = ({ image, name }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center shrink-0">
            {image && !imgError ? (
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                />
            ) : (
                <span className="text-sm font-semibold text-indigo-500">
                    {name?.charAt(0).toUpperCase() || "U"}
                </span>
            )}
        </div>
    );
};

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [togglingEmail, setTogglingEmail] = useState(null);

    const getAuthHeader = async () => {
        const { data } = await authClient.token();
        return { Authorization: `Bearer ${data?.token}` };
    };

    const fetchUsers = async () => {
        const headers = await getAuthHeader();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-users`, { headers });
        const data = await res.json();
        const filtered = data.filter((user) => user.role !== "admin");
        setUsers(filtered);
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleBlockToggle = async (email, isBlocked) => {
        const endpoint = isBlocked ? "unblock" : "block";
        setTogglingEmail(email);

        try {
            const headers = await getAuthHeader();
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${email}/${endpoint}`, {
                method: "PATCH",
                headers,
            });

            setUsers((prev) =>
                prev.map((u) =>
                    u.email === email ? { ...u, isBlocked: !isBlocked } : u
                )
            );
        } catch (err) {
            console.error('Block/unblock failed:', err);
        } finally {
            setTogglingEmail(null);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Spinner label="Loading users..." /></div>;

    return (
        <div className="space-y-6">

            
            <div className="flex flex-col items-center text-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <HiOutlineUsers size={14} />
                    Manage Users
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                    View, block, or unblock users on the platform.
                </p>
            </div>


            <div className="hidden sm:block rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 dark:border-white/10 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            <th className="px-6 py-4 font-semibold">User</th>
                            <th className="px-6 py-4 font-semibold">Role</th>
                            <th className="px-6 py-4 font-semibold">Plan</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {users.map((user) => (
                            <tr
                                key={user._id}
                                className="hover:bg-indigo-50/50 dark:hover:bg-white/[0.03] transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <UserAvatar image={user.image} name={user.name} />
                                        <div className="min-w-0">
                                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Chip size="sm" variant="flat" color="primary">
                                        {user.role || "no role"}
                                    </Chip>
                                </td>
                                <td className="px-6 py-4">
                                    {user.plan === 'premium' ? (
                                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                                            Premium
                                        </span>
                                    ) : (
                                        <span className="text-xs text-gray-400 dark:text-gray-500">Free</span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <Chip
                                        size="sm"
                                        variant="flat"
                                        color={user.isBlocked ? "danger" : "success"}
                                    >
                                        {user.isBlocked ? "Blocked" : "Active"}
                                    </Chip>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button
                                        size="sm"
                                        variant="flat"
                                        isLoading={togglingEmail === user.email}
                                        isDisabled={togglingEmail === user.email}
                                        startContent={
                                            togglingEmail === user.email
                                                ? null
                                                : user.isBlocked
                                                    ? <LockOpenFill width={16} />
                                                    : <TbLockBitcoin width={16} />
                                        }
                                        onPress={() => handleBlockToggle(user.email, user.isBlocked)}
                                        className={
                                            user.isBlocked
                                                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                                                : "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/20"
                                        }
                                    >
                                        {user.isBlocked ? "Unblock" : "Block"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-10">
                        No users found.
                    </p>
                )}
            </div>

            <div className="sm:hidden space-y-3">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-sm p-4 space-y-3"
                    >
                        <div className="flex items-center gap-3">
                            <UserAvatar image={user.image} name={user.name} />
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                            {user.plan === 'premium' && (
                                <span className="shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                                    Premium
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <div className="flex gap-2 flex-wrap">
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
                            <Button
                                size="sm"
                                variant="flat"
                                isLoading={togglingEmail === user.email}
                                isDisabled={togglingEmail === user.email}
                                startContent={
                                    togglingEmail === user.email
                                        ? null
                                        : user.isBlocked
                                            ? <LockOpenFill width={16} />
                                            : <TbLockBitcoin width={16} />
                                }
                                onPress={() => handleBlockToggle(user.email, user.isBlocked)}
                                className={
                                    user.isBlocked
                                        ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/20 shrink-0"
                                        : "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/20 shrink-0"
                                }
                            >
                                {user.isBlocked ? "Unblock" : "Block"}
                            </Button>
                        </div>
                    </div>
                ))}

                {users.length === 0 && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-10">
                        No users found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;