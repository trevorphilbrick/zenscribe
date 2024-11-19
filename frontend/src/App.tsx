export default function App() {
  return (
    <div>
      <nav className="px-8 py-4 absolute">
        <div className="flex items-center ">
          <img src="logo.svg" width={20} height={20} className="mr-2" />
          <h3 className="font-semibold ">Zenscribe</h3>
        </div>
      </nav>
      <div
        className="flex items-center justify-center h-screen "
        style={{
          backgroundImage: `url(/homepageBackground.png)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-customSecondary w-72 rounded-lg p-8 drop-shadow-xl flex items-center justify-center flex-col ">
          <h1 className="text-2xl font-semibold text-center mb-4 tracking-wider">
            Coming Soon
          </h1>
          <img src="logo.svg" width={32} height={32} className="mb-4" />
          <p className="text-center tracking-widest">Focus • Track • Grow</p>
        </div>
      </div>
    </div>
  );
}
