import { getNotifications } from "@/lib/actions";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import Image from "next/image";

const NotificationsPage = async () => {
  const notifications = await getNotifications();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h1>
          <div className="flex flex-col gap-1">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition cursor-pointer border-b last:border-0 border-gray-50">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={notif.sender?.avatar || "/noAvatar.png"}
                    fill
                    className="rounded-full object-cover border-2 border-green-500 p-0.5"
                    alt=""
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-bold">{notif.sender?.username || "Someone"}</span> {notif.action}
                  </p>
                  <span className="text-xs text-gray-400">{new Date(notif.createdAt).toLocaleString()}</span>
                </div>
                {!notif.isRead && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
              </div>
            ))}
            
            {notifications.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                 <p className="text-4xl mb-4">🔔</p>
                 <p>No new notifications yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default NotificationsPage;
