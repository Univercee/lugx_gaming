import Image from "next/image";
import logo from "~/logo.png";
import bgImage from "~/banner-bg.jpg";
import bannerImage from "~/banner-image.jpg"
import FeatureCard from "@/components/feature-card";
import featureIcon1 from "~/featured-01.png"
import featureIcon2 from "~/featured-02.png"
import featureIcon3 from "~/featured-03.png"
import featureIcon4 from "~/featured-04.png"
export default function Home() {
  return (
    <main className="main-banner flex flex-col justify-center items-center">
      <div className="flex flex-col w-full" style={{backgroundImage: `url(${bgImage.src})`, backgroundSize: "100% 100%", borderRadius: "0 0 150px 150px"}}>
       <div className="container mx-auto px-8 lg:px-24 pt-12">

        {/* navigation */}
        <nav className="navbar w-full flex justify-between items-center">
          <Image src={logo.src} width={160} height={60} alt="Logo"></Image>
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
              <Image className="rounded-3xl" src={bannerImage.src} alt="Banner image"width={400} height={500}></Image>
              <div className="main-banner-sale">-40%</div>
              <div className="main-banner-price">$22</div>
            </div>
          </div>
        </div>
       </div>
      </div>
      <div className="container mx-auto px-8 lg:px-24">
        <div className="w-full flex flex-wrap justify-center gap-8 mb-32" style={{marginTop: '-64px'}}>
          <div className="lg:w-1/5 md:w-1/3">
            <FeatureCard text="free storage" iconSrc={featureIcon1.src}></FeatureCard>
          </div>
          <div className="lg:w-1/5 md:w-1/3">
            <FeatureCard text="user more" iconSrc={featureIcon2.src}></FeatureCard>
          </div>
          <div className="lg:w-1/5 md:w-1/3">
            <FeatureCard text="reply ready" iconSrc={featureIcon3.src}></FeatureCard>
          </div>
          <div className="lg:w-1/5 md:w-1/3">
            <FeatureCard text="easy layout" iconSrc={featureIcon4.src}></FeatureCard>
          </div>
        </div>
        </div>
    </main>
  );
}
