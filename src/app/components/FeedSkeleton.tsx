const FeedSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="bg-white h-64 rounded-2xl border border-gray-100"></div>
      <div className="bg-white h-64 rounded-2xl border border-gray-100"></div>
      <div className="bg-white h-64 rounded-2xl border border-gray-100"></div>
    </div>
  );
};

export default FeedSkeleton;
