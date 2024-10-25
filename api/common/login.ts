import getClient from "./getClient";

export default async function signIn(email: string, password: string) {
  const client = getClient();
  
  let { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw error;
  }

  return data;
}
