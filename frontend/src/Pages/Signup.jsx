import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Name can only contain letters and numbers (No spaces or special characters)"
    )
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name cannot exceed 20 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .matches(
      /^[^\s@]+@[^\s@]+\.(com|net)$/,
      "Only .com and .net domains are allowed"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters long")
    .max(30, "Password must not exceed 30 characters")
    .matches(/^[a-zA-Z0-9]*$/, "Only letters and numbers allowed")
    .required("Password is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="relative flex flex-col rounded-2xl bg-white shadow-xl p-8 w-full sm:w-[420px]">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Welcome! Fill in the details to register
        </p>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const response = await fetch(`${apiUrl}/auth/user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });

              const data = await response.json();
              setLoading(false);

              if (response.ok) {
                toast.success(data.message);
                navigate("/");
              } else {
                toast.error(data.message || "Signup failed");
              }
            } catch (error) {
              setLoading(false);
              toast.error(error.message || "An error occurred");
            }
          }}
        >
          <Form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <Field
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ab9#xP4!qLm2"
                  className="w-full mt-1 px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1f3b5c] hover:bg-[#2a4a7b] text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Link to Login */}
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-[#1f3b5c] hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
