import Image from "next/image";
import logo from "~/logo.png";
import bgImage from "~/banner-bg.jpg";
import bannerImage from "~/banner-image.jpg";
import FeatureCard from "@/components/feature-card";
import featureIcon1 from "~/featured-01.png";
import featureIcon2 from "~/featured-02.png";
import featureIcon3 from "~/featured-03.png";
import featureIcon4 from "~/featured-04.png";

import ProductCard from "@/components/product-card";
import { categories, games } from '@/lib/placeholderdata';
import ProductCardMostPlayed from "@/components/product-card-mostplayed";
import CategoryCard from "@/components/category-card";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-32 mb-32">
      <div className="main-banner flex flex-col w-full" style={{backgroundImage: `url(${bgImage.src})`, backgroundSize: "100% 100%", borderRadius: "0 0 150px 150px"}}>
       <div className="container mx-auto px-8 lg:px-24 pt-12">

        {/* navigation */}
        <nav className="navbar w-full flex justify-between items-center">
          <Image unoptimized src={logo.src} width={160} height={60} alt="Logo"></Image>
          <ul className="flex gap-8">
            <a href="#"><li className="nav-link active">Home</li></a>
            <a href="#"><li className="nav-link">Our shop</li></a>
            <a href="#"><li className="nav-link">Product details</li></a>
            <a href="#"><li className="nav-link">Contact us</li></a>
            <a href="#"><li className="nav-link disabled bg-accent font-medium">Sign in</li></a>
          </ul>
        </nav>

        {/* banner */}
        <div className="text-white flex flex-col justify-center items-center my-32">
          <div className="flex gap-10 justify-between items-center max-lg:flex-col max-lg:text-center">
            <div className="w-1/2 max-lg:w-full pt-24 max-lg:flex max-lg:flex-col max-lg:items-center">
              <h6>Welcome to lugx</h6>
              <h2 className="font-bold">BEST GAMING SITE EVER!</h2>
              <p>LUGX Gaming is free Bootstrap 5 HTML CSS website template for your gaming websites. You can download and use this layout for commercial purposes. Please tell your friends about TemplateMo.</p>
              <div className="search flex mt-20 max-lg:justify-center w-full">
                <input className="text-black w-full" type="text" placeholder="Type something" />
                <button className="bg-accent hover:bg-primary uppercase font-medium">Search now</button>
              </div>
            </div>
            <div className=" h-full relative max-lg:min-w-72 max-lg:flex max-lg:justify-center">
              <Image unoptimized className="rounded-3xl" src={bannerImage.src} alt="Banner image"width={400} height={500}></Image>
              <div className="banner-sale">-40%</div>
              <div className="banner-price">$22</div>
            </div>
          </div>
        </div>
       </div>
      </div>

      {/* features */}
      <div className="container mx-auto px-8 lg:px-24 mb-32" style={{marginTop: '-12rem'}}>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
            <FeatureCard text="free storage" iconSrc={featureIcon1.src}></FeatureCard>
            <FeatureCard text="user more" iconSrc={featureIcon2.src}></FeatureCard>
            <FeatureCard text="reply ready" iconSrc={featureIcon3.src}></FeatureCard>
            <FeatureCard text="easy layout" iconSrc={featureIcon4.src}></FeatureCard>
        </div>
      </div>

      {/* trending */}
      <div className="container mx-auto px-8 lg:px-24">
        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-accent uppercase font-bold mb-4">Trending</p>
            <h1 className="capitalize font-bold text-4xl">Trending Games</h1>
          </div>
          <button className="bg-accent hover:bg-primary px-5 py-3 rounded-3xl text-white uppercase text-sm font-semibold">View All</button>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            <ProductCard data={games[0]}></ProductCard>
            <ProductCard data={games[0]}></ProductCard>
            <ProductCard data={games[0]}></ProductCard>
            <ProductCard data={games[0]}></ProductCard>
        </div>
      </div>

      {/* most played */}
      <div className="bg-muted w-full container mx-auto py-24 px-8 lg:px-24" style={{borderRadius: "150px"}}>
        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-accent uppercase font-bold mb-4">TOP GAMES</p>
            <h1 className="capitalize font-bold text-4xl">Most Played</h1>
          </div>
          <button className="bg-accent hover:bg-primary px-5 py-3 rounded-3xl text-white uppercase text-sm font-semibold">View All</button>
        </div>
        <div className="grid lg:grid-cols-6 md:grid-cols-2 lg:gap-3 gap-16">
          <ProductCardMostPlayed data={games[0]}></ProductCardMostPlayed>
          <ProductCardMostPlayed data={games[0]}></ProductCardMostPlayed>
          <ProductCardMostPlayed data={games[0]}></ProductCardMostPlayed>
          <ProductCardMostPlayed data={games[0]}></ProductCardMostPlayed>
          <ProductCardMostPlayed data={games[0]}></ProductCardMostPlayed>
          <ProductCardMostPlayed data={games[0]}></ProductCardMostPlayed>
        </div>
      </div>

      {/* top categories */}
      <div className="w-full container mx-auto px-8 lg:px-24">
        <div className="flex items-center justify-center mb-16">
          <div className="text-center">
            <p className="text-accent uppercase font-bold mb-4">Categories</p>
            <h1 className="capitalize font-bold text-4xl">Top Categories</h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-5 md:grid-cols-2 lg:gap-3 gap-16">
          <CategoryCard data={categories[0]}></CategoryCard>
          <CategoryCard data={categories[0]}></CategoryCard>
          <CategoryCard data={categories[0]}></CategoryCard>
          <CategoryCard data={categories[0]}></CategoryCard>
          <CategoryCard data={categories[0]}></CategoryCard>
        </div>
      </div>

      {/* info */}
      <div className="w-full container mx-auto px-8 lg:px-24 relative info mt-0 lg:mt-20">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-16 lg:gap-32">
          <div className="bg-muted p-16 rounded-3xl flex flex-col gap-16">
            <div>
              <p className="text-accent uppercase font-bold mb-4">Our shop</p>
              <h2 className="text-4xl font-bold">Go Pre-Order Buy & Get Best <span className="text-primary">Prices</span> For You!</h2>
            </div>
            <p className="font-medium">Lorem ipsum dolor consectetur adipiscing, sed do eiusmod tempor incididunt.</p>
            <button className="w-max bg-accent hover:bg-primary px-5 py-3 rounded-3xl text-white uppercase text-sm font-semibold">Shop now</button>
          </div>
          <div className="bg-muted p-16 rounded-3xl flex flex-col gap-16 h-full">
           <div>
            <p className="text-accent uppercase font-bold mb-4">NEWSLETTER</p>
            <h2 className="text-4xl font-bold">Get Up To $100 Off Just Buy <span className="text-primary">Subscribe</span> Newsletter!</h2>
           </div>
            <div className="search flex max-lg:justify-center w-full">
              <input className="text-black w-full" type="text" placeholder="Your email..." />
              <button className="bg-accent hover:bg-primary text-white uppercase font-bold">Search now</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
