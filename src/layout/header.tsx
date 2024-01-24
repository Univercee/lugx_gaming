'use client'
import Image from "next/image"
import logo from "~/logo.png";
import { useEffect, useRef, useState } from "react";
import bgImage from "~/banner-bg.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({Banner}: { Banner: JSX.Element }) {
    const pathname = usePathname();
    const headerRef = useRef(null);
    let [scrolled, setScroleld] = useState(false);
    useEffect(()=>{
      if (headerRef.current) {
        const header = headerRef.current as HTMLDivElement;
        onScroll(header);
        window.addEventListener('scroll', ()=>{
          onScroll(header);
        });
      }
    }, [])

    function onScroll(el: HTMLElement){
      if(window.scrollY > el.scrollHeight){
        el.classList.add('header-scrolled');
        setScroleld(true);
      }
      else{
        el.classList.remove('header-scrolled');
        setScroleld(false);
      }
    }

    return (
      <div className="main-banner flex flex-col w-full" style={{backgroundImage: `url(${bgImage.src})`, backgroundSize: "100% 100%", borderRadius: "0 0 150px 150px"}}>
       <div className="wrapper pt-12">

        {/* navigation */}
        <nav className="absolute header w-full" ref={headerRef}>
          <div className="container flex items-center justify-between px-8 lg:px-24 mx-auto">
            <Link href="/"><Image unoptimized src={logo.src} width={160} height={60} alt="Logo"></Image></Link>
            <ul className="flex gap-10">
              <Link href="/"><li className={`nav-link ${pathname=='/'?'active':''}`}>Home</li></Link>
              <Link href="/shop"><li className={`nav-link ${pathname=='/shop'?'active':''}`}>Our shop</li></Link>
              <Link href="/shop/1"><li className={`nav-link ${pathname=='/shop/1'?'active':''}`}>Product details</li></Link>
              <Link href="/contacts"><li className={`nav-link ${pathname=='/contacts'?'active':''}`}>Contact us</li></Link>
              <Link href="#"><li className="nav-link disabled button-accented">Sign in</li></Link>
            </ul>
          </div>
        </nav>

        {/* banner */}
        {/* my-32 suddenly stop working */}
        <div className="text-white flex flex-col justify-center items-center my-32" style={{margin: "8rem 0 8rem 0"}}>
          {Banner}
        </div>

       </div>
      </div>
    );
}
  