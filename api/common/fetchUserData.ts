import client from "./supabase";


export default function fetchUserData(id: string) {
  async function fetchData(id: string) {
    let { data, error } = await client()
      .from('users')
      .select('*')
      .eq('user_id', id);

    if (error) {
      throw error;
    }

    return data;
  }

    return fetchData(id);
}