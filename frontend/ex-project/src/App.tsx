import { useState } from "react";
import { Header, type PageId } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { InstrumentRentalPage } from "./pages/InstrumentRentalPage";
import { PracticeRoomPage } from "./pages/PracticeRoomPage";

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === "home" && <HomePage />}
      {currentPage === "instrument-rental" && <InstrumentRentalPage />}
      {currentPage === "practice-room" && <PracticeRoomPage />}

      <footer className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
        © SUMMIT Web Page. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
