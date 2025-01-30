import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/");
    } else {
      const data = await response.json();
      setError(data.message || "Signup failed.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 overflow-hidden">
      {/* Background Motioned Isometric Animation Effects */}
      <div className="absolute inset-0">
        {/* Isometric Cube Animation */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-br from-teal-400 to-blue-600 opacity-60 transform rotate-45"
          animate={{
            rotateY: [0, 360], // Rotate the cube in the Y-axis (isometric effect)
            rotateX: [0, 180], // Rotate along the X-axis
            y: [0, -50, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "20%",
            left: "15%",
            transformStyle: "preserve-3d",
          }}
        ></motion.div>

        {/* Isometric Pyramid Animation */}
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 opacity-50 transform rotate-45"
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 180],
            y: [0, 60, 0],
            x: [0, -60, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "50%",
            left: "60%",
            transformStyle: "preserve-3d",
          }}
        ></motion.div>

        {/* Isometric Hexagon Animation */}
        <motion.div
          className="absolute w-28 h-28 bg-gradient-to-br from-yellow-300 to-indigo-500 opacity-40 transform rotate-45"
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 180],
            y: [0, -40, 0],
            x: [0, 40, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "70%",
            left: "30%",
            transformStyle: "preserve-3d",
          }}
        ></motion.div>

        {/* Isometric Cube (smaller) */}
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-br from-purple-500 to-green-500 opacity-50 transform rotate-45"
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 180],
            y: [0, 30, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            top: "40%",
            left: "80%",
            transformStyle: "preserve-3d",
          }}
        ></motion.div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Sign Up</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 focus:outline-none hover:border-indigo-500 hover:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 focus:outline-none hover:border-indigo-500 hover:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300 focus:outline-none hover:border-indigo-500 hover:shadow-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
