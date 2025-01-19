import { redirect } from "next/navigation";
import { auth } from "../auth";
import { useSession } from "next-auth/react";

/**
 * A function to get current user and redirect to
 * login page if user does not exist.
 * To be used on server component only.
 * @name currentUser
 * @function
 */
export const currentUser = async (isRedirect = false) => {
  const session = await auth();

  if (!session?.user && isRedirect) {
    return redirect("/auth/signin");
  }

  return session?.user;
};

/**
 * A hook that is used to get the current user.
 * To be used on client component.
 * @name useCurrentUser
 * @param {boolean} required if true it will redirect to login page if no user is authenticated (default: false)
 * @returns {object} currentUser
 * @returns {boolean} currentUser.isAuthenticated whether the current user is authenticated
 * @returns {boolean} currentUser.isLoading whether the function is still getting the data
 * @returns {object} currentUser.user the user object
 */
export const useCurrentUser = (required = false) => {
  const session = useSession({
    required: required,
    onUnauthenticated() {
      return redirect("/auth/signin");
    },
  });

  if (session.status === "loading") {
    return {
      isAuthenticated: false,
      isLoading: true,
      user: null,
    };
  }

  return {
    isAuthenticated: session.status === "authenticated",
    isLoading: false,
    user: session.data?.user || null,
  };
};
