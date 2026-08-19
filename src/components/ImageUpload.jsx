'use client'
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
const ImageUpload = ({ value, onUploaded, label = 'Image', shape = 'square' }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();

      if (data.success) {
        onUploaded(data.data.url);
        toast.success('Image uploaded');
      } else {
        toast.error('Image upload failed');
      }
    } catch (err) {
      console.error('Image upload error:', err);
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>

      {value && (
        <img
          src={value}
          alt="Preview"
          className={`w-20 h-20 object-cover mb-2 border border-gray-200 dark:border-slate-700 ${
            shape === 'circle' ? 'rounded-full' : 'rounded-lg'
          }`}
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="w-full text-sm"
      />
      {uploading && <p className="text-xs text-gray-400 mt-1">Uploading...</p>}
    </div>
  );
}

export default ImageUpload;