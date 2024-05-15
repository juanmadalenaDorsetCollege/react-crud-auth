import { Outlet } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import { Toaster } from "sonner";


export default function BasicLayout() {

  return (
    <>
        <Toaster position="bottom-center" duration={2000} />
        <Header />
            <main className="pt-24 px-8 min-h-screen">
                <Outlet />
            </main>
        <Footer />
    </>
  )
}