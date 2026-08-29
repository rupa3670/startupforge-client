'use client'
import ImageUpload from '@/components/ImageUpload';
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, TextField, TextArea, Label, Input, FieldError, Button } from '@heroui/react';

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const formRef = useRef(null);
    const userEmail = session?.user?.email;

    const [profile, setProfile] = useState({ name: '', image: '', bio: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (isPending) return;
        if (!userEmail) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const { data: tokenData } = await authClient.token();
                const token = tokenData?.token;

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/${encodeURIComponent(userEmail)}`,
                    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
                );

                if (!res.ok) throw new Error('Failed to fetch profile');
                const data = await res.json();

                setProfile({
                    name: data.name || '',
                    image: data.image || '',
                    bio: data.bio || '',
                });
            } catch (err) {
                console.error('Failed to load profile:', err);
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userEmail, isPending]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSaving(true);

        try {
            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/${encodeURIComponent(userEmail)}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` })
                    },
                    body: JSON.stringify(profile),
                }
            );
            const data = await res.json();

            if (res.ok) {
                toast.success('Profile updated');
                setEditing(false);
            } else {
                setErrorMsg(data.message || 'Could not update profile');
                toast.error('Could not update profile');
            }
        } catch (err) {
            console.error('Failed to update profile:', err);
            setErrorMsg('Something went wrong');
            toast.error('Something went wrong');
        } finally {
            setSaving(false);
        }
    };

    if (loading || isPending) return <p className="p-6 text-sm text-gray-500 dark:text-slate-400">Loading...</p>;
    if (!session) return <p className="p-6 text-sm text-gray-500 dark:text-slate-400">Please log in to view your profile.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a] px-4 py-6 sm:py-10 sm:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
                </div>

                {errorMsg && !editing && <p className="text-sm text-red-500 dark:text-red-400 mb-4">{errorMsg}</p>}

                {!editing ? (
                    <div className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-5 sm:p-8 space-y-5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-gray-200 dark:border-white/10 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                    {profile.image ? (
                                        <img src={profile.image} alt={profile.name || 'Profile'} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-lg font-semibold text-white">
                                            {profile.name ? profile.name[0].toUpperCase() : 'U'}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">{profile.name || 'Add your name'}</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
                                </div>
                            </div>
                            <span className="self-start sm:self-auto flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 capitalize">
                                {session?.user?.role || 'Founder'} · Active
                            </span>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-sm break-words">
                            {profile.bio || 'No bio added yet. Tell others a bit about yourself.'}
                        </p>

                        <div className="pt-2">
                            <Button variant="primary" fullWidth onPress={() => setEditing(true)}>
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-5 sm:p-8 space-y-6"
                    >
                        <TextField isRequired name="name" defaultValue={profile.name} onChange={(val) => setProfile(p => ({ ...p, name: val }))}>
                            <Label>Name</Label>
                            <Input placeholder="Your name" />
                            <FieldError />
                        </TextField>

                        <div>
                            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Profile Picture</Label>
                            <div className="w-32 sm:w-40 mb-3">
                                <ImageUpload
                                    value={profile.image}
                                    onUploaded={(url) => setProfile((prev) => ({ ...prev, image: url }))}
                                    label=""
                                    shape="circle"
                                />
                            </div>
                        </div>

                        <TextField name="bio" defaultValue={profile.bio} onChange={(val) => setProfile(p => ({ ...p, bio: val }))}>
                            <Label>Bio</Label>
                            <TextArea rows={4} placeholder="Write a short bio..." />
                            <FieldError />
                        </TextField>

                        {errorMsg && <p className="text-sm text-red-500 dark:text-red-400 -mt-2">{errorMsg}</p>}

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button type="submit" variant="primary" fullWidth isDisabled={saving}>
                                {saving ? 'Saving...' : 'Save changes'}
                            </Button>
                            <Button type="button" variant="tertiary" fullWidth={false} className="w-full sm:w-auto" onPress={() => setEditing(false)}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;