import { supabase } from "../../client";

export default function Profile({ user }) {
  return (
    <div>
      <h2>Hello from protected route</h2>
      <p>{user}</p>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/sign-in" } };
  }

  return { props: { user } };
}
