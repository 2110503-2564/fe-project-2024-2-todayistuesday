import Image from "next/image";
import Banner from '@/components/Banner'
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard";
import CarPanel from "@/components/CarPanel";

export default function Home() {
  return (
    <main>
      <Banner/>
    </main>
  );
}
