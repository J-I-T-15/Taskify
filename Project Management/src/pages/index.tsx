import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function Home() {
  const { data: session } = useSession();

  const handleDashboardClick = () => {
    if (!session) {
      toast.error("Please log in to access the dashboard.");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Background Animation */}
      <div className="absolute inset-0">
        {/* Wave Animation */}
        <motion.div
          className="absolute top-0 h-1/2 w-full rounded-b-full bg-gradient-to-r from-blue-300 to-indigo-500"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          style={{ filter: "blur(80px)", opacity: 0.4 }}
        ></motion.div>

        {/* Floating Circles */}
        <motion.div
          className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 opacity-50"
          style={{ top: "20%", left: "10%" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        <motion.div
          className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-pink-300 to-yellow-400 opacity-40"
          style={{ top: "50%", left: "70%" }}
          animate={{
            scale: [1, 0.3, 1],
            x: [0, -30, 0],
            y: [0, -300, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>

        {/* Subtle Particle Effect */}
        <motion.div
          className="absolute h-3 w-3 rounded-full bg-white opacity-50"
          style={{ top: "30%", left: "40%" }}
          animate={{
            x: [0, -20, 20],
            y: [0, 20, -20],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute h-4 w-4 rounded-full bg-white opacity-60"
          style={{ top: "60%", left: "20%" }}
          animate={{
            x: [0, 20, -20],
            y: [0, -20, 20],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center py-8 text-center">
          <motion.div
            className="w-full max-w-screen-lg px-6 md:px-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="mb-4 text-4xl font-extrabold text-gray-800 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-indigo-800 to-purple-700 bg-clip-text text-transparent hover:bg-gradient-to-l hover:from-blue-700 hover:to-green-700">
                Taskify
              </span>
            </motion.h2>

            <motion.p
              className="mb-8 text-lg text-gray-600 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              A platform to efficiently manage your projects and tasks with
              ease.
            </motion.p>

            <motion.div
              className="space-x-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {session ? (
                <Link href="/dashboard">
                  <motion.button
                    className="rounded-md bg-blue-600 px-6 py-3 text-white shadow-md transition hover:bg-blue-700"
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
              ) : (
                <button
                  className="rounded-md bg-blue-600 px-6 py-3 text-white shadow-md transition hover:bg-blue-700"
                  onClick={handleDashboardClick}
                >
                  Go to Dashboard
                </button>
              )}
              <Link href="/about">
                <motion.button
                  className="rounded-md bg-gray-100 px-6 py-3 text-blue-600 shadow-md transition hover:bg-gray-200"
                  whileHover={{
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Updated About Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-8">
          <motion.div className="pointer-events-none absolute inset-0">
            {/* Floating Circles for About Section */}
            <motion.div
              className="absolute h-48 w-48 rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 opacity-40"
              style={{ top: "10%", left: "10%" }}
              animate={{
                scale: [1, 0.7, 1],
                x: [0, 20, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>

            <motion.div
              className="absolute h-60 w-60 rounded-full bg-gradient-to-br from-pink-300 to-yellow-400 opacity-30"
              style={{ top: "60%", left: "80%" }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>

            {/* Particle Effect for About Section */}
            <motion.div
              className="absolute h-3 w-3 rounded-full bg-white opacity-50"
              style={{ top: "30%", left: "50%" }}
              animate={{
                x: [0, -30, 30],
                y: [0, 25, -25],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.div
              className="absolute h-4 w-4 rounded-full bg-white opacity-60"
              style={{ top: "80%", left: "10%" }}
              animate={{
                x: [0, 25, -25],
                y: [0, -30, 30],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
          </motion.div>

          <motion.div
            className="z-10 w-full max-w-screen-lg px-6 text-left md:px-12"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h3
              className="mb-4 text-3xl font-semibold text-gray-800 md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              About the Project
            </motion.h3>

            <motion.p
              className="text-lg text-gray-600 md:text-xl"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Taskify is a Project Management App that helps you streamline your
              workflow by providing a user-friendly interface to organize tasks,
              assign deadlines, and track progress. Whether you're working on a
              small project or a large one, this platform allows you to stay on
              top of all your work, prioritize tasks, and collaborate with your
              team.
            </motion.p>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
