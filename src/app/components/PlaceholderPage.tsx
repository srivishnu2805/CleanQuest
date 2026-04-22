import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div
          className="p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px]"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>{title}</h1>
          <p className="text-center max-w-md" style={{ color: "var(--text-secondary)" }}>
            We&apos;re currently building this feature to help improve campus sustainability. Check back soon for updates!
          </p>
          <div className="mt-8 w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default PlaceholderPage;
