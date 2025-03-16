// src/components/Login.jsx
import React, { useState } from "react";
import { Button, Label, TextInput, Card, Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { HiIdentification, HiLockClosed } from "react-icons/hi";

const Login = ({ setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const loginRef = collection(db, "login");
      const q = query(loginRef, where("ID", "==", id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid ID or password.");
        setLoading(false);
        return;
      }

      const userData = querySnapshot.docs[0].data();

      if (userData.Password === password) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setError("Invalid ID or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('https://plus.unsplash.com/premium_vector-1726145200616-b5bba441d931?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
      <div className="min-h-screen w-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm relative overflow-hidden">
          {/* Gradient Header */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>

          <div className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="w-full text-center text-2xl font-bold text-gray-800 dark:text-white">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  DIGISCHOLAR-ADMIN
                </span>
              </h3>
            </div>

            {error && (
              <Alert color="failure" icon={ExclamationCircleIcon}>
                <span className="font-medium">{error}</span>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ID Input */}
              <div className="group relative">
                <Label
                  htmlFor="id"
                  value="ID"
                  className="mb-2 block text-sm font-medium text-gray-600"
                />
                <div className="relative">
                  <HiIdentification className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 h-5 w-5" />
                  <TextInput
                    id="id"
                    type="text"
                    placeholder="Enter your ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="pl-10  focus:border-blue-400 focus:ring-2 focus:ring-blue-400 h-[42px]"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group relative">
                <Label
                  htmlFor="password"
                  value="Password"
                  className="mb-2 block text-sm font-medium text-gray-600"
                />
                <div className="relative">
                  <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 h-5 w-5" />
                  <TextInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10  focus:border-blue-400 focus:ring-2 focus:ring-blue-400 h-[42px]"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-[42px] rounded-lg bg-gradient-to-r from-green-400 to-blue-500 
                                          font-semibold text-white shadow-md hover:scale-[1.02] 
                                          hover:from-green-500 hover:to-blue-600 transition-all"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
