import Image from "next/image";
import bannerImage from "~/banner-image.jpg";

export function MainBanner(){
    return (
        <div className="flex gap-10 justify-between items-center max-lg:flex-col max-lg:text-center">
            <div className="w-1/2 max-lg:w-full pt-24 max-lg:flex max-lg:flex-col max-lg:items-center">
                <h6>Welcome to lugx</h6>
                <h2 className="font-bold">BEST GAMING SITE EVER!</h2>
                <p>LUGX Gaming is free Bootstrap 5 HTML CSS website template for your gaming websites. You can download and use this layout for commercial purposes. Please tell your friends about TemplateMo.</p>
                <div className="search flex mt-20 max-lg:justify-center w-full">
                    <input className="text-black w-full" type="text" placeholder="Type something" />
                    <button className="bg-accent hover:bg-primary uppercase font-bold">Search now</button>
                </div>
            </div>
            <div className=" h-full relative max-lg:min-w-72 max-lg:flex max-lg:justify-center">
                <Image unoptimized className="rounded-3xl" src={bannerImage.src} alt="Banner image"width={400} height={500}></Image>
                <div className="banner-sale">-40%</div>
                <div className="banner-price">$22</div>
            </div>
        </div>
    )
}