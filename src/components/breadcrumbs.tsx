'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const convertBreadcrumb = (string: string) => {
  return string.toUpperCase();
};

export function Breadcrumbs({ currentPageName }: { currentPageName?: string }){
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState(new Array());

  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        let pathname = (currentPageName&&i==linkPath.length-1)?currentPageName:path;
        
        return { breadcrumb: pathname, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [pathname]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label="breadcrumbs">
      <ul className="flex max-md:flex-col max-md:text-center">
        <li className='max-md:border-b-2 max-md:py-2'>
            <Link href="/">HOME</Link>
        </li>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li key={breadcrumb.href} className='max-md:border-b-2 last:border-0 max-md:py-2'>
                <span className="inline-block max-md:invisible max-md:w-0">&nbsp;&gt;&nbsp;</span>
                <Link href={breadcrumb.href}>
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};