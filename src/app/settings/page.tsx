import { auth } from "@clerk/nextjs/server";
import { getUserProfile, updateUserProfile } from "@/lib/actions";
import { redirect } from "next/navigation";
import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";

const SettingPage = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  const user = await getUserProfile(userId);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-500">
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
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold mb-8 text-gray-800">Account Settings</h1>
          
          <form action={handleUpdate} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Display Name</label>
              <input
                name="displayName"
                type="text"
                defaultValue={user.display_name || ""}
                placeholder="How others see you"
                className="p-3 rounded-xl border border-gray-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-600">Bio</label>
              <textarea
                name="description"
                defaultValue={user.description || ""}
                placeholder="Tell us about your sustainability goals..."
                className="p-3 rounded-xl border border-gray-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition h-32 resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">School/University</label>
                <input
                  name="school"
                  type="text"
                  defaultValue={user.school || ""}
                  className="p-3 rounded-xl border border-gray-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600">Work/Initiative</label>
                <input
                  name="work"
                  type="text"
                  defaultValue={user.work || ""}
                  className="p-3 rounded-xl border border-gray-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-100"
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
