import Image from "next/image";
import Link from "next/link";
import oeuvres from "../data/oeuvres.json";
import InstallPrompt from "./components/InstallPrompt";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#FFD700] flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#FFD700] mb-4 text-center">
          MboaMuse
        </h1>
        <p className="text-xl md:text-2xl text-[#FFD700] mb-12 text-center">
          Scan. Listen. Become Royalty.
        </p>

        {/* Oeuvres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
          {oeuvres.map((oeuvre) => (
            <div key={oeuvre.id} className="bg-black border-2 border-[#FFD700] rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src="https://via.placeholder.com/400x300/000000/FFD700?text=Artwork"
                  alt={oeuvre.titre}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-[#FFD700] mb-2">
                  {oeuvre.titre}
                </h3>
                <p className="text-[#FFD700]/80 mb-4">
                  {oeuvre.description}
                </p>
                <Link
                  href={`/oeuvre/${oeuvre.id}`}
                  className="inline-block bg-[#FFD700] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#FFD700]/80 transition-colors"
                >
                  Écouter l'histoire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <p className="text-[#FFD700]/60 mb-4">Install the app for the full experience</p>
        <button className="bg-[#FFD700] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#FFD700]/80 transition-colors">
          Install App
        </button>
      </footer>

      <InstallPrompt />
    </div>
  );
}
