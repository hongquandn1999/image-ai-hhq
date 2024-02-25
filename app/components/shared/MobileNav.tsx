'use client';
import { navLinks } from '@/app/constants';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:p-2">
        <Image
          src={'/assets/images/logo-text.svg'}
          alt="logo hhq"
          width={180}
          height={28}
        />
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/"></UserButton>
          <Sheet>
            <SheetTrigger>
              <Image
                src={'/assets/icons/menu.svg'}
                alt="menu"
                width={24}
                height={24}
              />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src={'/assets/images/logo-text.svg'}
                    alt="logo hhq"
                    width={180}
                    height={28}
                  />
                </SheetTitle>
                <SheetDescription>
                  <ul className="header-nav_elements">
                    {navLinks.slice(0, 6).map((link) => {
                      const isActive = pathname === link.route;
                      return (
                        <li
                          key={link.route}
                          className={`sidebar-nav_element group ${
                            isActive
                              ? 'bg-purple-gradient text-white'
                              : 'text-gray-700'
                          }`}
                        >
                          <Link
                            href={link.route}
                            className="sidebar-link cursor-pointer"
                          >
                            <Image
                              src={link.icon}
                              alt={link.label}
                              width={24}
                              height={24}
                              className={`${isActive ?? 'brightness-200'}`}
                            />
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
