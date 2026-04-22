import LeftMenu from "../components/LeftMenu";
import RightMenu from "../components/RightMenu";

const PlaceholderPage = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[400px]">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-500 text-center max-w-md">
            We&apos;re currently building this feature to help improve campus sustainability. Check back soon for updates!
          </p>
          <div className="mt-8 w-16 h-1 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
};

export default PlaceholderPage;
