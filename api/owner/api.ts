import getClient from "@/api/common/getClient";

type House = {
  owner_id: string;
  house_name: string;
  address: string;
  rent: string;
  emergencyContacts: any[];
};

export default function useOwnerClient() {
  const client = getClient();

  const insertHouse = async ({
    owner_id,
    house_name,
    address,
    rent,
    emergencyContacts,
  }: House) => {
    const { data, error } = await client.from("house").insert([
      {
        owner_id,
        house_name,
        house_address: address,
        rent_price: rent,
        contacts: emergencyContacts,
      },
    ]);

    if (error) {
      throw error;
    }

    return data;
  };

  async function removeTenant(house_id: string) {
    let { data, error } = await client
      .from("house")
      .update({
        tenant_id: null,
        lease_date: null,
        pending_rent: null,
        notification: [],
        history: [],
      })
      .eq("id", house_id);

    if (error) {
      throw error;
    }
    return data;
  }
  async function fetchHouseData(owner_id: string) {
    let { data, error } = await client
      .from("house")
      .select("*")
      .eq("owner_id", owner_id);

    if (error) {
      throw error;
    }

    return data;
  }

  async function editPendingRent(house_id: string, pending_rent: number) {
    let { data, error } = await client
      .from("house")
      .update({
        pending_rent: pending_rent,
      })
      .eq("id", house_id);

    if (error) {
      throw error;
    }
    return data;
  }

  async function editNotification(house_id: string, notification: string[]) {
    let { data, error } = await client
      .from("house")
      .update({
        notification: notification,
      })
      .eq("id", house_id);

    if (error) {
      throw error;
    }
    return data;
  }

  async function editHouseData(
    owner_id: string,
    house_id: string,
    house_name: string,
    address: string,
    rent: string,
    emergencyContacts: any[]
  ) {
    let { data, error } = await client
      .from("house")
      .update({
        house_name,
        house_address: address,
        rent_price: rent,
        contacts: emergencyContacts,
      })
      .eq("id", house_id);

    if (error) {
      throw error;
    }
    return data;
  }

  async function deleteHouse(house_id: string) {
    let { data, error } = await client
      .from("house")
      .delete()
      .eq("id", house_id);

    if (error) {
      throw error;
    }
    return data;
  }

  return {
    insertHouse,
    removeTenant,
    fetchHouseData,
    editPendingRent,
    editNotification,
    editHouseData,
    deleteHouse,
  };
}
