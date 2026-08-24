'use client'
import { Button, Card, CardContent, CardFooter, Chip, Spinner } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { IoTrashBinOutline } from 'react-icons/io5';
import { MdCheckCircleOutline } from 'react-icons/md';
import { PiBuildingOfficeDuotone } from 'react-icons/pi';

const ManageStartup = () => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStartups = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/startups`);
        const data = await res.json();
        setStartups(data);
        setLoading(false);
    };
    useEffect(() => { fetchStartups(); }, []);
    const handleApprove = async (id) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/startups/${id}/approve`,
            {
                method: "PATCH"
            }
        );
        fetchStartups();
    };
    const handleDelete = async (id) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/startups/${id}
            `, {
            method: "DELETE",
        });
        fetchStartups();
    };
    if (loading) return <div className="flex justify-center py-20"><Spinner label="Loading startups..." /></div>;
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {startups.map((startup) => (
                <Card key={startup._id}
                    className='border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden'
                >
                    <div className='h-32 w-full bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-blue-950 flex items-center justify-center'>{startup.logo ? (
                        <img src={startup.logo}
                            alt={startup.startup_name}
                            className="h-16 w-16 object-cover rounded-full border-2 border-white shadow"
                        />
                    ) : (
                        <PiBuildingOfficeDuotone width={36} height={36} className="text-indigo-400" />
                    )}</div>
                    <CardContent className="gap-2 py-4">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{startup.startup_name}</p>
                            <Chip
                                size="sm"
                                variant="flat"
                                color={startup.status === "approved" ? "success" : "warning"}
                            >
                                {startup.status}
                            </Chip>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {startup.industry}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                            {startup.founder_email}
                        </p>
                    </CardContent>

                    <CardFooter className="pt-0 gap-2">
                        {startup.status !== "approved" && (
                            <Button
                                size="sm"
                                fullWidth
                                color="success"
                                variant="flat"
                                startContent={<MdCheckCircleOutline width={16} />}
                                onPress={() => handleApprove(startup._id)}
                            >
                                Approve
                            </Button>
                        )}
                        <Button
                            size="sm"
                            fullWidth
                            color="danger"
                            variant="flat"
                            startContent={<IoTrashBinOutline width={16} />}
                            onPress={() => handleDelete(startup._id)}
                        >
                            Remove
                        </Button>
                    </CardFooter>
                </Card>
            ))}

        </div>
    );
};

export default ManageStartup;