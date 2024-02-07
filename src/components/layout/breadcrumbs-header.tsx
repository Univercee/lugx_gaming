'use client'
import Image from "next/image"
import logo from "~/logo.png";
import { useEffect, useRef } from "react";
import bgImage from "~/banner-bg.jpg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LoginButton } from "../auth/login-button";
import { Breadcrumbs } from "../breadcrumbs";
import { useSession } from "next-auth/react";

export default function BreadcrumbsHeader({title, pageName}:{title?: string, pageName?: string}) {
    let isScrollEventInit = false;
    let isClickEventInit = false;
    const session = useSession();
    const user = session.data?.user;
    
    const pathname = usePathname();
    const routeName = pathname.split("/")[pathname.length-1];
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
            <FontAwesomeIcon icon={faBars} className="nav-bars" ref={barsRef}/>
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
        {/* my-32 suddenly stop working */}
        <div className="text-white flex flex-col justify-center items-center" style={{margin: "8rem 0 8rem 0"}}>
            <div className="flex flex-col gap-4 justify-between items-center ">
                <h1 className="uppercase font-semibold text-center" style={{fontSize: "3rem"}}>{title?title:routeName}</h1>
                <Breadcrumbs currentPageName={pageName?pageName:routeName}></Breadcrumbs>
            </div>
        </div>

       </div>
      </div>
    );
}
  