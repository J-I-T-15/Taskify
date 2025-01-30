import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchUserDetails = async () => {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        }
      };

      fetchUserDetails();
    }

    // Detect scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [session]);

  return (
    <header
      className={`sticky top-0 z-20 px-6 py-4 transition-all ${
        isScrolled ? "bg-blue-700 shadow-lg" : "bg-blue-600"
      } text-white`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <Link href="/">Taskify</Link>
        </h1>
        <div>
          {session ? (
            <div className="flex items-center space-x-4">
              <p className="text-sm">
                Welcome, {userDetails?.name || session.user?.email}!
              </p>
              <button
                onClick={() => signOut()}
                className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
                className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
              >
                Login
              </button>
              <Link href="/signup">
                <button className="rounded bg-gray-100 px-4 py-2 text-blue-600 transition hover:bg-gray-200">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
