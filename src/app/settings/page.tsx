import { auth } from "@clerk/nextjs/server";
import { getUserProfile, updateUserProfile } from "@/lib/actions";
import { redirect } from "next/navigation";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — CleanQuest",
  description: "Manage your CleanQuest profile and account settings.",
};

const SettingPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const user = await getUserProfile(userId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]" style={{ color: "var(--text-tertiary)" }}>
        <p>User profile not found. Try visiting the homepage first to sync your account.</p>
      </div>
    );
  }

  const handleUpdate = async (formData: FormData) => {
    "use server";
    const data = {
      display_name: formData.get("displayName") as string,
      description: formData.get("description") as string,
      school: formData.get("school") as string,
      work: formData.get("work") as string,
    };
    await updateUserProfile(data);
  };

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="settings" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div
          className="p-8 rounded-2xl"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h1 className="text-2xl font-bold mb-8" style={{ color: "var(--text-primary)" }}>Account Settings</h1>
          
          <form action={handleUpdate} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Display Name</label>
              <input
                name="displayName"
                type="text"
                defaultValue={user.display_name || ""}
                placeholder="How others see you"
                className="p-3 rounded-xl outline-none transition"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Bio</label>
              <textarea
                name="description"
                defaultValue={user.description || ""}
                placeholder="Tell us about your sustainability goals..."
                className="p-3 rounded-xl outline-none transition h-32 resize-none"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>School/University</label>
                <input
                  name="school"
                  type="text"
                  defaultValue={user.school || ""}
                  className="p-3 rounded-xl outline-none transition"
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Work/Initiative</label>
                <input
                  name="work"
                  type="text"
                  defaultValue={user.work || ""}
                  className="p-3 rounded-xl outline-none transition"
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition shadow-lg shadow-emerald-500/20"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default SettingPage;
