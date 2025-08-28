import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { UserCard } from "@/components/UserCard";
import WishToRegister from "@/components/WishToRegister";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <UserCard />
      <WishToRegister />
      <Footer />
    </>
  );
}
