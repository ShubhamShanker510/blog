"use client"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from './ui/button';

export default function NavBar() {
    const { data: session } = useSession();
    const user = session?.user;

    console.log("user=>", user)

    return (
        <nav className="w-full bg-[#010409] text-white px-6 py-4 shadow-sm flex items-center justify-between">
            {/* Left Side: Logo + Links */}
            <div className="flex items-center gap-10">
                <h1 className="text-2xl font-bold text-[#f5deb3]">POSTCRAFT</h1>
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-4">
                        <NavigationMenuItem>
                            <Link href="/" passHref>
                                <NavigationMenuLink className="hover:border-b-1 hover:border-[#f5deb3] font-bold  text-[#f5deb3]">HOME</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/myblogs" passHref>
                                <NavigationMenuLink className="hover:border-b hover:border-[#f5deb3] font-bold text-[#f5deb3]">MY BLOGS</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/create" passHref>
                                <NavigationMenuLink className="hover:border-b hover:border-[#f5deb3] font-bold text-[#f5deb3]">CREATE</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Right Side: Profile */}
            <div className="flex items-center gap-2">
                {user ? (
                    <Link href="/profile">
                        <Avatar className="cursor-pointer bg-[#f5deb3]">
                            <AvatarImage src="/profile.png" alt={user.name || "User"} />
                            <AvatarFallback>{user.name || "U"}</AvatarFallback>
                        </Avatar>
                    </Link>
                ) : (
                    <Link href="/signin">
                        <Button className="mt-6 w-full border border-[#f5deb3] text-[#f5deb3] hover:bg-[#f5deb3] hover:text-[#0c1117] transition cursor-pointer">Sign In</Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
