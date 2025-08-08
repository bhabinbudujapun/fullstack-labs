import { Link, useNavigate } from "react-router-dom";
import useTokenStore from "../../store/useAuthStore";
import useUserStore from "../../store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../http/userApi";

const Navbar = () => {
  const token = useTokenStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      useTokenStore.getState().clearToken();
      setUser(null);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
    },
  });

  const handleLogout = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">ChatStream</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-auto size-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </div>

        <div className="lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          {token ? (
            <div className="flex items-center space-x-4">
              <h1 className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                {user?.username || "User"}
              </h1>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-md transition duration-200 cursor-pointer">
                Logout <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
