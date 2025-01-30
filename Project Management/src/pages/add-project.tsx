import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function AddProject() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      return setError("You must be logged in to add a project.");
    }

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        userId: session.user?.id,
      }),
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      const data = await response.json();
      setError(data.message || "Failed to add project.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 bg-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Add New Project
          </h1>
          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.3 }}
              className="text-red-500 bg-red-100 p-3 rounded mb-4"
            >
              {error}
            </motion.p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <motion.input
                type="text"
                id="name"
                placeholder="Enter project name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <motion.textarea
                id="description"
                placeholder="Enter project description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Project
            </motion.button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
