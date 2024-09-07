import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";

import useFetch from "@/hooks/use-fetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { UrlState } from "@/context";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, loading, error, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .matches(/^.+@gmail\.com$/, "Email must be a Gmail address")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic: Yup.mixed()
          .notRequired()
          .test(
            "fileSize",
            "Profile picture file size is too large",
            (value) => {
              if (!value) return true; // Skip the test if no file is provided
              return value.size <= 5 * 1024 * 1024; // 5 MB
            }
          ),
      });
      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white shadow-2xl rounded-lg transition-transform transform hover:scale-105">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-3xl font-extrabold text-gradient">
            Signup
          </CardTitle>
          <CardDescription className="text-gray-400">
            Create a new account if you haven’t already
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-2">
            <Input
              name="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleInputChange}
              aria-label="Name"
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.name ? "border-red-500" : "border-gray-600"
              } bg-gray-700 text-white placeholder-gray-400 transition-colors duration-300 focus:border-blue-400 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.name && <Error message={errors.name} />}
          </div>
          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              aria-label="Email"
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-600"
              } bg-gray-700 text-white placeholder-gray-400 transition-colors duration-300 focus:border-blue-400 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && <Error message={errors.email} />}
          </div>
          <div className="space-y-2">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              aria-label="Password"
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-600"
              } bg-gray-700 text-white placeholder-gray-400 transition-colors duration-300 focus:border-blue-400 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && <Error message={errors.password} />}
          </div>
          <div className="space-y-2">
            <Input
              name="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              aria-label="Profile Picture"
              className={`w-full px-4 py-3 border rounded-lg ${
                errors.profile_pic ? "border-red-500" : "border-gray-600"
              } bg-gray-700 text-white placeholder-gray-400 transition-colors duration-300 focus:border-blue-400 focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.profile_pic && <Error message={errors.profile_pic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSignup}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <BeatLoader size={10} color="#ffffff" />
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
