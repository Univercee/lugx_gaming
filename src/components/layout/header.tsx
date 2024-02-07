'use client'
import Image from "next/image"
import logo from "~/logo.png";
import bannerImage from "~/banner-image.jpg";
import { useEffect, useRef } from "react";
import bgImage from "~/banner-bg.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LoginButton } from "../auth/login-button";
import { useSession } from "next-auth/react";

export default function Header() {
    let isScrollEventInit = false;
    let isClickEventInit = false;
    const session = useSession();
    const user = session.data?.user;
    const pathname = usePathname();
    const headerRef = useRef(null);
    const listRef = useRef(null);
    const barsRef = useRef(null)

    useEffect(()=>{
      if(!isScrollEventInit) initScrollEvent();
      if(!isClickEventInit) initClickEvent();
    }, [])

    function initScrollEvent(){
      if (headerRef.current && listRef.current) {
        const header = headerRef.current as HTMLDivElement;
        const list = listRef.current as HTMLElement;
        onScroll(header);
        window.addEventListener('scroll', ()=>{
          onScroll(header);
          hideMenu(list);
        });
        isScrollEventInit = true;
      }
    }

    function initClickEvent(){
      if(listRef.current && barsRef.current){
        const list = listRef.current as HTMLElement;
        const bars = barsRef.current as HTMLElement;
        bars.addEventListener('click', ()=>{
          switchMenu(list);
        })
        isClickEventInit = true;
      }
    }

    function onScroll(el: HTMLElement){
      if(window.scrollY > el.scrollHeight){
        el.classList.add('header-scrolled');
      }
      else{
        el.classList.remove('header-scrolled');
      }
    }
    
    function switchMenu(el: HTMLElement){
      if(el.classList.contains('expanded')){
        hideMenu(el);
      }
      else{
        showMenu(el);
      }
    }

    function hideMenu(el: HTMLElement){
      el.classList.remove('expanded')
    }

    function showMenu(el: HTMLElement){
      el.classList.add('expanded')
    }

    return (
      <div className="main-banner flex flex-col w-full" style={{backgroundImage: `url(${bgImage.src})`, backgroundSize: "100% 100%", borderRadius: "0 0 150px 150px"}}>
       <div className="wrapper pt-12">

        {/* navigation */}
        <nav className="absolute header w-full" ref={headerRef}>
          <div className="container flex items-center justify-between px-8 lg:px-24 mx-auto relative">
            <Link href="/"><Image unoptimized src={logo.src} width={160} height={60} alt="Logo"></Image></Link>
            <FontAwesomeIcon icon={faBars} className="nav-bars h-10 w-10" ref={barsRef}/>
            <ul className="nav-list text-nowrap" ref={listRef}>
              <Link href="/" className={`nav-link ${pathname=='/'?'active':''}`}><li>Home</li></Link>
              <Link href="/shop" className={`nav-link ${pathname=='/shop'?'active':''}`}><li>Our shop</li></Link>
              <Link href="/contacts" className={`nav-link ${pathname=='/contacts'?'active':''}`}><li>Contacts</li></Link>
              {user && <Link href="/dashboard" className={`nav-link ${pathname=='/dashboard'?'active':''}`}><li>Dashboard</li></Link>}
              <LoginButton></LoginButton>
            </ul>
          </div>
        </nav>

        {/* banner */}
        <div className="text-white flex flex-col justify-center items-center" style={{margin: "8rem 0 8rem 0"}}>
          <div className="flex gap-10 justify-between items-center max-lg:flex-col max-lg:text-center">
              <div className="w-1/2 max-lg:w-full pt-24 max-lg:flex max-lg:flex-col max-lg:items-center">
                  <h6>Welcome to lugx</h6>
                  <h2 className="font-bold">BEST GAMING SITE EVER!</h2>
                  <p>This is a portfolio project written using Next.js, Tailwind and PostgreSQL. You can view the source code <a className="text-accent font-bold hover:underline" href="https://github.com/Univercee/lugx_gaming"> here</a></p>
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
        </div>

       </div>
      </div>
    );
}
  