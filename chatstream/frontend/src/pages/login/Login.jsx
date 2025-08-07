import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../http/userApi"; // Updated path
import { useMutation } from "@tanstack/react-query";
import useTokenStore from "../../store/useAuthStore";
import useUserStore from "../../store/useUserStore";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const setToken = useTokenStore((state) => state.setToken);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.token);
      setUser(response.user); // { id, username, email, avatar, isOnline }
      navigate("/chat", { replace: true });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    mutation.mutate(credentials);
    setLoading(false);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center pt-24 px-4 pb-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="ChatStream"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300">
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
