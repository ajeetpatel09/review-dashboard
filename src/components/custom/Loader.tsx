export default function BubbleLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 border-4 border-white rounded-full animate-ping"></div>
          <div className="absolute inset-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full animate-bubble"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
