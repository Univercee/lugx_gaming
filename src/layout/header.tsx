'use client'
import Image from "next/image"
import logo from "~/logo.png";
import { useEffect, useRef, useState } from "react";

export default function Header() {
    const headerRef = useRef(null);
    let [scrolled, setScroleld] = useState(false);
    useEffect(()=>{
      if (headerRef.current) {
        const header = headerRef.current as HTMLDivElement;
        window.onscroll = function(e: Event){
          if(window.scrollY > header.scrollHeight){
            header.classList.add('header-scrolled');
            setScroleld(true);
          }
          else if(scrolled){
            header.classList.remove('header-scrolled');
          }
        }
      }
    })

    return (
      <header className="absolute header w-full" ref={headerRef}>
        <div className="container flex items-center justify-between px-8 lg:px-24 mx-auto">
          <Image unoptimized src={logo.src} width={160} height={60} alt="Logo"></Image>
          <ul className="flex gap-10">
            <a href="#"><li className="nav-link active">Home</li></a>
            <a href="#"><li className="nav-link">Our shop</li></a>
            <a href="#"><li className="nav-link">Product details</li></a>
            <a href="#"><li className="nav-link">Contact us</li></a>
            <a href="#"><li className="nav-link disabled bg-accent font-medium">Sign in</li></a>
          </ul>
        </div>
      </header>
    );
}
  