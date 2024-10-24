import getClient from "../common/getClient";

export default function useUserClient() {
  const client = getClient();

  async function payRent(house_id: string, history: any[], rent: number) {
    let { data, error } = await client
      .from("house")
      .update({
        pending_rent: 0,
        history: [
          ...history,
          { payment: new Date().toISOString(), rent: rent },
        ],
      })
      .eq("id", house_id);

    if (error) {
      throw error;
    }

    return data;
  }
  async function fetchHouseWithID(house_id: string) {
    let { data, error } = await client
      .from("house")
      .select("*")
      .eq("id", house_id);

    if (error) {
      throw error;
    }

    return data;
  }
  async function fetchTenantData(tenant_id: string) {
    {
      let { data, error } = await client
        .from("house")
        .select("*")
        .eq("tenant_id", tenant_id);

      if (error) {
        throw error;
      }
      return data;
    }
  }

  async function linkUser(
    house_id: string,
    tenant_id: string,
    rent: number
  ) {
    let { data, error } = await client
      .from("house")
      .update({
        tenant_id: tenant_id,
        lease_date: new Date().toISOString(),
        pending_rent: 0,
        notification: [],
        history: [{ payment: new Date().toISOString(), rent: rent }],
      })
      .eq("id", house_id);

    if (error) {
      throw error;
    }

    return data;
  }
  return { payRent, fetchHouseWithID, fetchTenantData, linkUser };
}
