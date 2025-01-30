import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "next-auth/react";

/**
 * A higher-order function to wrap getServerSideProps for authentication.
 *
 * @param gssp - The original getServerSideProps function.
 * @returns A wrapped getServerSideProps function with authentication logic.
 */
export function withAuth<P extends { [key: string]: any }>(
  gssp: (context: GetServerSidePropsContext, session: any) => Promise<GetServerSidePropsResult<P>>
): GetServerSideProps<P> {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    // Pass the session to the original getServerSideProps function
    return gssp(context, session);
  };
}
