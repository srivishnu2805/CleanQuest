import Link from "next/link";
import Image from "next/image";
import Ad from "./Ad";
import ProfileCard from "./ProfileCard";

const LeftMenu = ({ type }: { type: "home" | "profile" | "settings" }) => {
  const links = [
    { href: "/", icon: "/home.png", label: "Home" },
    { href: "/friends", icon: "/friends.png", label: "Friends" },
    { href: "/dashboard", icon: "/activity.png", label: "Dashboard" },
    { href: "/notifications", icon: "/notifications.png", label: "Notifications" },
    { href: "/leaderboard", icon: "/market.png", label: "Leaderboard" },
    { href: "/events", icon: "/events.png", label: "Events" },
    { href: "/settings", icon: "/settings.png", label: "Settings" },
  ];

  return (
    <div className="flex flex-col gap-6 sticky top-28">
      {type === "home" && <ProfileCard />}
      <div
        className="p-2 rounded-2xl flex flex-col gap-1"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group hover:bg-[var(--bg-tertiary)]"
          >
            <Image
              src={link.icon}
              alt=""
              width={22}
              height={22}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="font-medium" style={{ color: "var(--text-secondary)" }}>
              {link.label}
            </span>
          </Link>
        ))}
      </div>
      <Ad size="sm" />
    </div>
  );
};

export default LeftMenu;
