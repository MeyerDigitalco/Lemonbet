import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export const Layout = ({children}) => {
  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">
      {/* HEADER */}
      <Header />
      <Sidebar />
      <sidebar />
      {/* CONTENT AREA WITH TOP NAV + PADDING FOR FIXED BOTTOM BAR */}
      <div className="mt-[80px] flex-1">
        <div>{children}</div>
      </div>
      {/* FOOTER */}
      <Footer />

      {/* ────────────────────────────────────────────── */}
      {/* BOTTOM MENU (MOBILE ONLY) */}
      {/* ────────────────────────────────────────────── */}

    </div>
  );
};
