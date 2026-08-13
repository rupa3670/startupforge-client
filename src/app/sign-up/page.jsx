"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, TextField, Label, Input } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "collaborator",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    return minLength && hasUpper && hasLower;
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const form = new FormData();
    form.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: form }
    );

    const data = await res.json();
    return data?.data?.url || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 6 characters and include one uppercase and one lowercase letter."
      );
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage();

      const { data, error: signUpError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: imageUrl || "",
        role: formData.role,
      });

      if (signUpError) {
        setError(signUpError.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      if (data) {
        // Sign the user out right after registration so they don't get
        // an authenticated session / home page access automatically.
        await authClient.signOut();
        toast.success("Account created successfully! Please log in.");
        router.push("/login");
        return;
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    toast.success("SignUp successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-950 dark:to-blue-950">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border border-blue-100 dark:border-blue-950 p-8">
          <h1 className="text-2xl font-bold text-center mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create an Account
          </h1>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
            Join StartupForge and build your dream team
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-blue-400">No Image</span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-xs text-gray-500 dark:text-gray-400 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-300 hover:file:bg-blue-200"
              />
            </div>

            {/* Name */}
            <TextField name="name" isRequired>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </TextField>

            {/* Email */}
            <TextField name="email" type="email" isRequired>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </TextField>

            {/* Password */}
            <TextField name="password" type="password" isRequired>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </TextField>

            <p className="text-xs text-gray-400 -mt-2">
              Min 6 characters, one uppercase & one lowercase letter
            </p>

            {/* Role */}
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                I want to join as
              </p>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: "founder" })
                  }
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border ${formData.role === "founder"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent"
                      : "bg-white text-indigo-900 border-gray-300"
                    }`}
                >
                  Founder
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, role: "collaborator" })
                  }
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border ${formData.role === "collaborator"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent"
                      : "bg-white text-indigo-900 border-gray-300"
                    }`}
                >
                  Collaborator
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold"
              size="lg"
            >
              Sign Up
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Google Button */}
          <Button
            onClick={handleGoogleSignUp}
            variant="bordered"
            className="w-full border border-sky-50 shadow-sm hover:bg-sky-50"
            size="lg"
          >
            <FcGoogle />  Continue with Google
          </Button>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login">
              <Button
                variant="light"
                className="text-blue-600 dark:text-blue-400 font-medium p-0 h-auto min-w-0"
              >
                Log in
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;