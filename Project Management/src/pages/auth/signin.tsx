import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
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
      <div className="relative z-10 bg-white shadow-lg rounded-xl p-8 max-w-md w-full backdrop-blur-lg">
        {/* Animated Owl */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="relative w-20 h-20"
            animate={{ y: isTyping ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Owl Body */}
            <div className="bg-gray-800 w-20 h-16 rounded-full relative"></div>
            {/* Eyes */}
            <motion.div
              animate={{ scaleY: isTyping ? 0.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-3 left-3 w-6 h-6 bg-white rounded-full border-2 border-gray-700 flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </motion.div>
            <motion.div
              animate={{ scaleY: isTyping ? 0.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full border-2 border-gray-700 flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 transition-all hover:bg-indigo-50"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 transition-all hover:bg-indigo-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
