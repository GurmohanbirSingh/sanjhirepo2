import fetchUserData from "./fetchUserData";

export default async function checkUser() {
  try {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      throw new Error("User not found");
    }

    const data = await fetchUserData(user_id);

    if (!data || data.length === 0) {
      throw new Error("User data not found");
    }

    return data[0].is_owner;
  } catch (error: any) {
    throw error;
  }
}
