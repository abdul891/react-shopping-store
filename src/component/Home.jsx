import React from "react";
import LatestProducts from "./LatestProducts";
import HeroSection from "./Section/HeroSection";
import TopCat from "./Section/TopCat";
import BestSeller from "./Section/Bestseller";
export default function Home()
{
    return(
        <>
        <HeroSection />
        <TopCat />
        <LatestProducts />
        <BestSeller />
        </>
    )
}