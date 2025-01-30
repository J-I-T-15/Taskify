import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, ChangeEvent } from "react";
import { withAuth } from "../utils/auth";
import { GetServerSidePropsContext } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) router.push("/");
  }, [session, router]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();
      console.log(data);
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setProjects((prevProjects) =>
      [...prevProjects].sort((a, b) => {
        if (e.target.value === "name") {
          return a.name.localeCompare(b.name);
        } else if (e.target.value === "date") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        return 0;
      }),
    );
  };

  if (!session) return <p>Loading...</p>;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Animated Spherical Background */}
      <div className="absolute inset-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full animate-pulse"
        >
          <circle
            cx="25%"
            cy="40%"
            r="100"
            fill="rgba(0, 123, 255, 0.2)"
            className="animate-sphere-1 sm:r-60 md:r-80 lg:r-100"
          />
          <circle
            cx="75%"
            cy="30%"
            r="120"
            fill="rgba(255, 159, 67, 0.2)"
            className="animate-sphere-2 sm:r-80 md:r-100 lg:r-120"
          />
          <circle
            cx="60%"
            cy="70%"
            r="140"
            fill="rgba(52, 211, 153, 0.2)"
            className="animate-sphere-3 sm:r-100 md:r-120 lg:r-150"
          />
          <circle
            cx="10%"
            cy="80%"
            r="180"
            fill="rgba(255, 99, 132, 0.2)"
            className="animate-sphere-4 sm:r-120 md:r-140 lg:r-160"
          />
        </svg>
      </div>

      <Header />
      <main className="relative z-10 flex-1 p-6">
        <h1 className="mb-4 text-4xl font-bold text-blue-600">Dashboard</h1>
        <p className="mb-6 text-lg text-gray-700">
          Welcome, {session.user?.name || session.user?.email}!
        </p>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Your Projects</h2>
          <Link href="/add-project">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-all duration-200 ease-in-out hover:scale-105 hover:bg-blue-700">
              Add New Project
            </button>
          </Link>
        </div>

        <div className="mb-4 flex items-center space-x-4">
          <label htmlFor="sort" className="font-medium text-gray-700">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="name">Name</option>
            <option value="date">Creation Date</option>
          </select>
        </div>

        {projects.length === 0 ? (
          <p className="text-gray-600">
            No projects found. Start by creating one!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((project) => project.userId === session.user.id)
              .map((project) => (
                <div
                  key={project.id}
                  className="transform rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-50 hover:shadow-xl"
                >
                  <h3 className="mb-2 text-lg font-bold text-blue-600">
                    <Link href={`/projects/${project.id}`}>{project.name}</Link>
                  </h3>
                  <p className="mb-4 text-gray-700">
                    {project.description || "No description available"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created on:{" "}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps = withAuth(
  async (context: GetServerSidePropsContext, session) => {
    return {
      props: {
        session,
      },
    };
  },
);

export default Dashboard;
