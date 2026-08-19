'use client'
import ImageUpload from '@/components/ImageUpload';
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FiEdit2, FiCheckCircle } from 'react-icons/fi';

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const userEmail = session?.user?.email;

    const [profile, setProfile] = useState({ name: '', image: '', bio: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (isPending) return;
        if (!userEmail) {
            setLoading(false);
            return;
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${encodeURIComponent(userEmail)}`)
            .then((res) => res.json())
            .then((data) => {
                setProfile({
                    name: data.name || '',
                    image: data.image || '',
                    bio: data.bio || '',
                });
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load profile:', err);
                toast.error('Failed to load profile');
                setLoading(false);
            });
    }, [userEmail, isPending]);

    const handleChange = (e) => {
        setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${encodeURIComponent(userEmail)}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile),
            });
            const data = await res.json();
            if (data.modifiedCount >= 0) {
                toast.success('Profile updated');
                setEditing(false);
            } else {
                toast.error('Could not update profile');
            }
        } catch (err) {
            console.error('Failed to update profile:', err);
            toast.error('Something went wrong');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p className="text-center py-10 text-gray-400">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 ">
            {/* ---------- Profile Card ---------- */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 border border-indigo-100 dark:border-indigo-500/20 shadow-sm p-8 sm:p-10">
                {/* subtle background blobs */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-indigo-200/40 dark:bg-indigo-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-purple-200/30 dark:bg-purple-500/10 blur-3xl" />

                <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-8">
                    {/* Left: text */}
                    <div className="flex-1 text-center sm:text-left">
                        <span className="inline-block text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 mb-2">
                            My Profile
                        </span>

                        {editing ? (
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                placeholder="Your name"
                                className="w-full text-3xl font-bold text-gray-900 dark:text-white bg-transparent border-b-2 border-indigo-300 dark:border-indigo-600 focus:outline-none focus:border-indigo-600 pb-1 mb-3"
                            />
                        ) : (
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                {profile.name || 'Add your name'}
                            </h1>
                        )}

                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                {session?.user?.role || 'Founder'} · Active
                            </span>
                        </div>

                        {editing ? (
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Write a short bio..."
                                className="w-full text-sm text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-indigo-100 dark:border-indigo-500/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md">
                                {profile.bio || 'No bio added yet. Tell others a bit about yourself.'}
                            </p>
                        )}

                        <div className="mt-6 flex items-center justify-center sm:justify-start gap-3">
                            {editing ? (
                                <>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={saving}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium shadow-md shadow-indigo-500/20 hover:opacity-90 transition disabled:opacity-50"
                                    >
                                        <FiCheckCircle size={16} />
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditing(false)}
                                        className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-slate-800/60 transition"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-slate-700 transition shadow-sm"
                                >
                                    <FiEdit2 size={16} />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right: image */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/50 dark:from-indigo-500/20 dark:to-purple-500/20 blur-xl scale-110" />
                            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                {profile.image ? (
                                    <img
                                        src={profile.image}
                                        alt={profile.name || 'Profile'}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl font-semibold text-white">
                                        {profile.name ? profile.name[0].toUpperCase() : 'U'}
                                    </span>
                                )}
                            </div>
                        </div>

                        {editing && (
                            <div className="w-40">
                                <ImageUpload
                                    value={profile.image}
                                    onUploaded={(url) => setProfile((prev) => ({ ...prev, image: url }))}
                                    label=""
                                    shape="circle"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;