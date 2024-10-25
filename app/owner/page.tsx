"use client";

import checkUser from "@/api/common/checkUser";
import fetchUserData from "@/api/common/fetchUserData";
import useOwnerClient from "@/api/owner/api";
import LoadingIcon from "@/components/LoadingIcon";
import { ChevronDown, Edit, MapPin, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OwnerPage() {
  const [userId, setUserId] = useState(String);

  useEffect(() => {
    const user = localStorage.getItem("user_id");

    user && setUserId(user);
  }, []);

  return <div className="mx-8">{userId && <Owner userId={userId} />}</div>;
}

function HouseCard({
  house,
  setEditHouseId,
  setEditHouseOverlay,
  editHouseOverlay,
}: {
  house: any;
  setEditHouseId: any;
  setEditHouseOverlay: any;
  editHouseOverlay: any;
}) {
  const [notificationLength, setNotificationLength] = useState(0);
  const [input, setInput] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [dangerZoneOpen, setDangerZoneOpen] = useState(false);
  const ownerClient = useOwnerClient();

  useEffect(() => {
    if (house.notification) {
      setNotificationLength(house.notification.length);
    }
  }, [house]);

  const addNotification = async () => {
    async function addNotification() {
      await ownerClient.editNotification(house.id, house.notification);
    }

    await addNotification();
  };

  const [historyOpen, setHistoryOpen] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0].split("-")[2];
  const todayMonth = new Date().toISOString().split("T")[0].split("-")[1];

  const editPending = async (house_id: string, pending_rent: number) => {
    async function edit(house_id: string, pending_rent: number) {
      await ownerClient.editPendingRent(house_id, pending_rent);
    }

    await edit(house_id, pending_rent);
  };

  if (!house.history) return;

  if (house.history.length > 0) {
    let historyDate;
    let historyMonth;
    historyDate = house.history[house.history.length - 1].payment
      .toString()
      .split("T")[0]
      .split("-")[2];
    historyMonth = house.history[house.history.length - 1].payment
      .toString()
      .split("T")[0]
      .split("-")[1];

    const leaseDate = house.lease_date.toString().split("T")[0].split("-")[2];

    if (todayDate >= leaseDate && todayMonth != historyMonth) {
      if (house.pending_rent <= 0) {
        editPending(house.id, house.rent_price);
      }
    }
  }
  // }, [house]);
  const removeTenantFromDB = async (house_id: string) => {
    async function remove(house_id: string) {
      await ownerClient.removeTenant(house_id);
    }

    await remove(house_id);
  };

  return (
    <div
      className="flex flex-col relative gap-2 bg-gray-900 border border-gray-800 p-2 rounded-xl"
      key={house.id}
    >
      <button
        onClick={() => {
          setEditHouseId(house.id);
          setEditHouseOverlay(!editHouseOverlay);
        }}
        className="absolute right-2"
      >
        <Edit />
      </button>
      <p className="font-bold italic text-3xl text-gray-500"># {house.id}</p>
      <p className="text-lg font-semibold">{house.house_name}</p>
      <p className="flex items-center gap-2 text-gray-600">
        <MapPin /> {house.house_address}
      </p>

      {house.tenant_id ? (
        <>
          <div className="flex gap-2 items-center">
            {house.pending_rent > 0 ? (
              <>
                <div className="w-2 h-2 mx-2 rounded-full bg-red-500 animate-pulse"></div>
                <p>Rent is due (${house.pending_rent})</p>
              </>
            ) : (
              <>
                <div className="w-2 h-2 mx-2 rounded-full bg-green-500"></div>
                Property is occupied
              </>
            )}
          </div>

          {house.history ? (
            <div className="">
              <button
                onClick={() => {
                  setHistoryOpen(!historyOpen);
                }}
                className="flex gap-2 items-center"
              >
                <div className="p-1">
                  <ChevronDown
                    className={
                      "w-4 h-auto " + (historyOpen ? "rotate-180" : "")
                    }
                  />
                </div>
                <p>Payment History</p>
              </button>

              <div className={historyOpen ? "h-full" : "h-0 overflow-hidden"}>
                {house.history.map((history: any, index: number) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-between "
                  >
                    <p>{history.payment}</p>
                    <p>$ {history.rent}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="bg-white p-2 rounded-xl">
            {notificationLength ? (
              <>
                <p className="text-sm font-semibold">
                  Notifications • {notificationLength}
                </p>

                {house.notification.map((notification: any, index: number) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-between bg-gay-200  rounded-lg"
                  >
                    <p>{notification}</p>
                    <button
                      onClick={() => {
                        house.notification.splice(index, 1);
                        setNotificationLength(house.notification.length);
                        addNotification();
                      }}
                      className="text-red-500 py-2 font-semibold rounded-lg"
                    >
                      <X className="stroke-[3]" />
                    </button>
                  </div>
                ))}
              </>
            ) : null}

            {inputOpen ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  placeholder="Add a notification"
                  className="bg-gray-100 p-2 rounded-lg"
                />
              </div>
            ) : null}

            <button
              onClick={() => {
                if (inputOpen) {
                  if (input) {
                    house.notification.push(input);

                    setNotificationLength(house.notification.length);
                    addNotification();
                    setInput("");
                  }
                }
                setInputOpen(!inputOpen);
              }}
              className="bg-indigo-300 w-full text-black px-8 py-2 font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              {inputOpen ? "Done" : "Add Notification"}
            </button>
          </div>
          <button
            onClick={() => {
              setDangerZoneOpen(!dangerZoneOpen);
            }}
          >
            {dangerZoneOpen ? "Close Danger Zone" : "Open Danger Zone"}
          </button>
          <button
            className={
              "bg-red-500 text-white px-8 w-full mt-2  font-semibold rounded-lg overflow-hidden " +
              (dangerZoneOpen ? "h-fit py-2" : "h-0")
            }
            onClick={() => {
              removeTenantFromDB(house.id);

              window.location.reload();
            }}
          >
            Remove Tenant
          </button>
        </>
      ) : (
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 mx-2 rounded-full bg-amber-500"></div>
          Vacant
        </div>
      )}
    </div>
  );
}

function Owner({ userId }: { userId: string }) {
  const [addHouseOverlay, setAddHouseOverlay] = useState(false);
  const [editHouseOverlay, setEditHouseOverlay] = useState(false);
  const [editHouseId, setEditHouseId] = useState("");

  const [userName, setUserName] = useState("");

  const [loading, setLoading] = useState(true);
  const [activeHouseData, setActiveHouseData] = useState<any[]>([]);
  const [vacantHouseData, setVacantHouseData] = useState<any[]>([]);

  const ownerClient = useOwnerClient();

  async function getHouseData(owner_id: string) {
    let data = await ownerClient.fetchHouseData(owner_id);

    if (data) {
      data = data.sort((a, b) => a.id - b.id);

      setActiveHouseData(data.filter((item) => item.tenant_id));
      setVacantHouseData(data.filter((item) => !item.tenant_id));

      setLoading(false);
    }
  }

  useEffect(() => {
    async function getUserName(id: string) {
      let data = await fetchUserData(id);

      if (data && data[0]) {
        setUserName(data[0].name);
      }
    }

    getUserName(userId);

    getHouseData(userId);
  }, []);

  useEffect(() => {
    getHouseData(userId);
  }, [addHouseOverlay, editHouseOverlay]);

  return loading ? (
    <div className="w-full flex items-center justify-center gap-2 h-[80vh]">
      <LoadingIcon />
      Loading...
    </div>
  ) : (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl">
        <span className=" italic font-thin">Welcome,</span> {userName}
      </h1>

      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl">Your Houses</h2>
          <Link
            href={"/owner/add-house"}
            className="bg-blue-600 text-white px-8 py-2 font-semibold rounded-lg"
          >
            Add house
          </Link>
        </div>
        {activeHouseData.length || vacantHouseData.length ? (
          <>
            <h3>Vacant Houses</h3>
            {vacantHouseData.map((house, index) => (
              <HouseCard
                key={index}
                house={house}
                setEditHouseId={setEditHouseId}
                setEditHouseOverlay={setEditHouseOverlay}
                editHouseOverlay={editHouseOverlay}
              />
            ))}
            <h3>Active Houses</h3>
            {activeHouseData.map((house, index) => (
              <HouseCard
                key={index}
                house={house}
                setEditHouseId={setEditHouseId}
                setEditHouseOverlay={setEditHouseOverlay}
                editHouseOverlay={editHouseOverlay}
              />
            ))}
          </>
        ) : (
          <p className="text-center italic text-gray-600">
            You have not added any house.
          </p>
        )}
      </div>
    </div>
  );
}
