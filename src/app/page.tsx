import Image from "next/image";
import HomePageComponent from "./Homepage/page";
import NavbarComponent from "./components/NavbarComponent";

export default function Home() {
  return (
    <>
    <NavbarComponent/>
    <HomePageComponent/>
    </>
  );
}
