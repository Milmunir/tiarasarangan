"use client";

const JumbotronComponent = () => {
  return (
    <div className="gambar bg-cover bg-center bg-loaded">
      <div className="h-768 flex items-center justify-center bg-black bg-opacity-65 backdrop-blur-sm">
        <div className="container px-16 text-white text-center items-center justify-center">
          <h1 className="text-4xl md:text-6xl mb-6 text-shadow-lg leading-tight font-jumbo">
            Villa <span className="text-red-500">Tiara</span>
            <br />
            Sarangan
          </h1>
          <p className="text-md md:text-xl mb-12 max-w-lg mx-auto text-shadow-md">
            Nikmati pengalaman menginap di villa terbaik di Sarangan dengan
            pemandangan Telaga Sarangan yang memukau.
          </p>
          <div className="flex justify-center mt-10">
            <a
              href="https://wa.me/083127605430"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-xl px-8 py-4 rounded-full hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-600 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center space-x-3"
            >
              <span className="text-xl font-semibold animate-pulse">
                Pesan Sekarang
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumbotronComponent;
