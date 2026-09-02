'use client'
import React, { useEffect, useRef, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import {
  Form, TextField, TextArea, Label, Input, FieldError,
  Button, Select, ListBox,
} from '@heroui/react';
import { HiOutlineBriefcase } from 'react-icons/hi';

const fundingStages = ['Idea', 'Pre-seed', 'Seed', 'Series A', 'Series B+'];

const MyStartupPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const formRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [startup, setStartup] = useState(null);
  const [editing, setEditing] = useState(false);

  const [fundingStage, setFundingStage] = useState(fundingStages[0]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isPending) return;
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchStartup = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-startup?email=${session.user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setStartup(data);
        if (data) {
          setFundingStage(data.funding_stage || fundingStages[0]);
          setLogoPreview(data.logo || '');
        }
      } catch (err) {

      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [isPending, session?.user?.email]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const uploadLogo = async () => {
    if (!logoFile) return startup?.logo || '';
    const fd = new FormData();
    fd.append('image', logoFile);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: 'POST', body: fd }
    );
    const data = await res.json();
    if (!data.success) throw new Error('Logo upload failed');
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!startup && !logoFile) {
      setErrorMsg('Please upload a logo.');
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData(e.target);
      const logoUrl = await uploadLogo();

      const startupData = {
        startup_name: fd.get('startupName'),
        founder_name: fd.get('founderName'),
        team_size_needed: Number(fd.get('teamSizeNeeded')),
        logo: logoUrl,
        industry: fd.get('industry'),
        description: fd.get('description'),
        funding_stage: fundingStage,
        founder_email: session?.user?.email,
        ...(!startup && { status: 'pending' }),
      };

      // token nao
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const isEdit = Boolean(startup?._id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/startup${isEdit ? `/${startup._id}` : ''}`,
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,   // ← ei line ta add koro
          },
          body: JSON.stringify(startupData),
        }
      );
      const data = await res.json();

      if (data.success) {
        setStartup({ ...startupData, _id: startup?._id || data.insertedId, status: startup?.status || 'pending' });
        setEditing(false);
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Could not save your startup. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  const handleDelete = async () => {
    const confirmed = window.confirm('Delete your startup profile? This cannot be undone.');
    if (!confirmed) return;
    setDeleting(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/startup/${startup._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.deletedCount > 0) {
        setStartup(null);
        setFundingStage(fundingStages[0]);
        setLogoPreview('');
        formRef.current?.reset();
      } else {
        setErrorMsg('Could not delete your startup. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Could not delete your startup. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading || isPending) return <p className="p-6 text-sm text-gray-500 dark:text-slate-400">Loading...</p>;
  if (!session) return <p className="p-6 text-sm text-gray-500 dark:text-slate-400">Please log in to manage your startup.</p>;

  const showForm = !startup || editing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0a12] dark:via-black dark:to-[#0f0a1a] px-4 py-10 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <HiOutlineBriefcase size={14} />
                    My StartUp
                  </span>
                </div>

        {errorMsg && !showForm && <p className="text-sm text-red-500 dark:text-red-400 mb-4">{errorMsg}</p>}

        {!showForm ? (
          <div className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {startup.logo && <img src={startup.logo} alt={startup.startup_name} className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-white/10" />}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{startup.startup_name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{startup.industry}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${startup.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'}`}>
                {startup.status === 'approved' ? 'Approved' : 'Pending Approval'}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{startup.description}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
              <p>Founder: <span className="text-gray-800 dark:text-gray-200 font-medium">{startup.founder_name}</span></p>
              <p>Team size needed: <span className="text-gray-800 dark:text-gray-200 font-medium">{startup.team_size_needed}</span></p>
              <p>Funding stage: <span className="text-gray-800 dark:text-gray-200 font-medium">{startup.funding_stage}</span></p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="primary" fullWidth onPress={() => setEditing(true)}>Edit</Button>
              <Button variant="secondary" fullWidth isDisabled={deleting} onPress={handleDelete} className="border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400">
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        ) : (
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 space-y-6"
          >
            <TextField isRequired name="startupName" defaultValue={startup?.startup_name}>
              <Label>Startup Name</Label>
              <Input placeholder="e.g. StartupForge" />
              <FieldError />
            </TextField>

            <TextField isRequired name="founderName" defaultValue={startup?.founder_name}>
              <Label>Founder Name</Label>
              <Input placeholder="e.g. Rafid Hasan" />
              <FieldError />
            </TextField>

            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Logo</Label>
              <input type="file" accept="image/*" onChange={handleLogoChange} className="text-sm text-gray-600 dark:text-gray-300" />
              {logoPreview && <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-xl object-cover mt-3 border border-gray-200 dark:border-white/10" />}
            </div>

            <TextField isRequired name="industry" defaultValue={startup?.industry}>
              <Label>Industry</Label>
              <Input placeholder="e.g. Fintech" />
              <FieldError />
            </TextField>

            <TextField isRequired name="teamSizeNeeded" type="number" defaultValue={startup?.team_size_needed}>
              <Label>Team Size Needed</Label>
              <Input type="number" min="1" placeholder="e.g. 5" />
              <FieldError />
            </TextField>

            <TextField isRequired name="description" defaultValue={startup?.description}>
              <Label>Description</Label>
              <TextArea rows={4} placeholder="What is your startup building?" />
              <FieldError />
            </TextField>

            <Select selectedKey={fundingStage} onSelectionChange={setFundingStage}>
              <Label>Funding Stage</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {fundingStages.map((stage) => (
                    <ListBox.Item key={stage} id={stage} textValue={stage}>
                      <Label>{stage}</Label>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {errorMsg && <p className="text-sm text-red-500 dark:text-red-400 -mt-2">{errorMsg}</p>}

            <div className="flex gap-3">
              <Button type="submit" variant="primary" fullWidth isDisabled={submitting}>
                {submitting ? 'Saving...' : startup ? 'Save changes' : 'Create startup'}
              </Button>
              {startup && <Button type="button" variant="tertiary" onPress={() => setEditing(false)}>Cancel</Button>}
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default MyStartupPage;