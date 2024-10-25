"use client";

import useOwnerClient from "@/api/owner/api";
import LoadingIcon from "@/components/LoadingIcon";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AddHousePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="mx-8">
      {loading && (
        <div className="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center z-50 bg-black/50">
          Loading... <LoadingIcon />
          {error}
        </div>
      )}
      <Link
        className="flex items-center w-fit bg-gray-500/20 border border-gray-500/30 px-2 py-1 mb-8 rounded-lg"
        href={"/owner"}
      >
        <ChevronLeft /> Go back
      </Link>

      <AddHouse setLoading={setLoading} />
    </div>
  );
}

function AddEmergencyContact({
  emergencyContacts,
  setEmergencyContacts,
}: {
  emergencyContacts: any[];
  setEmergencyContacts: any;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const addContact = (name: string, phone: string) => {
    setEmergencyContacts([...emergencyContacts, { name: name, phone: phone }]);
    setIsEditing(false);
  };

  function AddForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    return (
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-800 bg-gray-900 focus-visible:outline-none rounded-lg px-4 py-2"
        />
        <label className="mt-2" htmlFor="phone">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-800 bg-gray-900 focus-visible:outline-none rounded-lg px-4 py-2"
        />
        <div className="flex justify-around gap-2 mt-4 mb-2">
          <button
            onClick={() => addContact(name, phone)}
            className="bg-blue-600 text-white flex-grow flex justify-center items-center py-2 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-600 text-white flex-grow flex justify-center items-center py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 border border-gray-800 rounded-lg py-2 px-6 bg-gray-950">
      {isEditing ? (
        <AddForm />
      ) : (
        <div className="flex flex-col gap-4">
          {emergencyContacts.length ? (
            emergencyContacts.map((contact, index) => (
              <div key={index} className="flex gap-4 items-center">
                <p className="font-bold">{contact.name}</p>
                <p>{contact.phone}</p>
                <button
                  onClick={() =>
                    setEmergencyContacts(
                      emergencyContacts.filter((_, i) => i !== index)
                    )
                  }
                  className="bg-red-100 text-red-900 border border-red-400 flex-row flex justify-center items-center p-2 rounded-full"
                >
                  <X className="w-4 h-auto" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700 italic mt-4">
              No contacts added
            </p>
          )}
        </div>
      )}
      {isEditing ? null : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-gray-200 text-black px-8 py-2 font-semibold rounded-lg flex justify-center items-center gap-2"
        >
          Add Contact <Plus className="w-4 h-auto" />
        </button>
      )}
    </div>
  );
}

function AddHouse({
  setLoading,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [owner_id, setOwner_id] = useState(String);

  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);

  const [houseName, setHouseName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [rent, setRent] = useState("");

  const [imgUrl, setImgUrl] = useState<any[]>([]);
  const [imgScroll, setImgScroll] = useState<number>(0);

  const ownerClient = useOwnerClient();

  useEffect(() => {
    setOwner_id(localStorage.getItem("user_id")!);
  });

  async function addHouseToDB() {
    setLoading(true);
    try {
      await ownerClient
        .insertHouse({
          owner_id,
          house_name: houseName,
          address,
          zip_code: zipCode,
          rent,
          emergencyContacts,
          images: imgUrl,
        })
        .then(() => {
          window.location.href = "/owner";
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 relative">
      <h2 className="text-3xl">Add a house</h2>
      <label>Add images</label>
      <input
        accept="image/*"
        type="file"
        multiple
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:bg-blue-600 file:text-white file:px-4 file:py-2 file:border-none"
        onChange={(e) => {
          e.target.files && setImgUrl(Array.from(e.target.files));
        }}
      />
      <div className="w-full flex items-center relative overflow-x-hidden">
        {imgUrl.length && (
          <>
            <button
              className="absolute z-10 left-10 bg-black p-2 rounded-full"
              onClick={() => {
                imgScroll > 0 && setImgScroll(imgScroll - 1);
              }}
            >
              <ChevronLeft />
            </button>
            <button
              className="absolute z-10 right-10 bg-black p-2 rounded-full"
              onClick={() => {
                imgScroll < imgUrl.length - 1 && setImgScroll(imgScroll + 1);
              }}
            >
              <ChevronRight />
            </button>
            <div>
              <div
                className="grid relative"
                style={{
                  width: `${imgUrl.length * 100}%`,
                  translate: `-${(imgScroll / imgUrl.length) * 100}% 0`,
                  gridTemplateColumns: `repeat(${imgUrl.length}, minmax(0, 1fr))`,
                }}
              >
                {imgUrl.map((img, key) => (
                  <div
                    key={key}
                    className="relative flex items-center justify-center h-80 w-full"
                  >
                    <img
                      className="max-h-full w-auto"
                      src={URL.createObjectURL(img)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="house_name">House Name</label>
        <input
          type="text"
          id="house_name"
          placeholder="House Name"
          value={houseName}
          onChange={(e) => setHouseName(e.target.value)}
          className="border border-gray-800 bg-gray-900 focus-visible:outline-none rounded-lg px-4 py-2"
        />
        <label className="mt-4" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border border-gray-800 bg-gray-900 focus-visible:outline-none rounded-lg px-4 py-2"
        />
        <label className="mt-4" htmlFor="zip">
          Zip Code
        </label>
        <input
          type="text"
          id="zip"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="border border-gray-800 bg-gray-900 focus-visible:outline-none rounded-lg px-4 py-2"
        />
        <label className="mt-4" htmlFor="rent">
          Rent
        </label>
        <input
          type="number"
          id="rent"
          placeholder="1200"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          className="border border-gray-800 bg-gray-900 focus-visible:outline-none rounded-lg px-4 py-2"
        />

        <label className="mt-4" htmlFor="emergency_contacts">
          Emergency Contacts
        </label>

        <AddEmergencyContact
          emergencyContacts={emergencyContacts}
          setEmergencyContacts={setEmergencyContacts}
        />

        <button
          onClick={addHouseToDB}
          className="mt-4 bg-blue-600 text-white px-8 py-2 mb-16 font-semibold rounded-lg"
        >
          Add House
        </button>
      </div>
    </div>
  );
}
