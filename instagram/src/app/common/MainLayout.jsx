import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-14">{children}</main>
      <Footer />
    </>
  );
};
