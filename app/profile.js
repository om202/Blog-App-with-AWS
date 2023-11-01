import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (err) {
      setUser(null);
    }
  }
  useEffect(() => {
    checkUser();
  }),
    [];

  if (!user) return null;

  return (
    <div className="mx-auto mt-10 bg-gray-200 w-1/2 p-5 rounded-lg">
      <h1 className="text-3xl font-semibold tracking-wide mt-6 text-gray-500">Profile</h1>
      <p className="text-sm text-gray-500 mt-6">Username: {user.username}</p>
      <p className="text-sm text-gray-500 mb-6">Email: {user.attributes.email}</p>
      <AmplifySignOut />
    </div>
  );
};

export default withAuthenticator(Profile);