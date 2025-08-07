"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { usePathname } from "next/navigation"

export function MainNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo1.png"
               alt="South Ethiopia Revenue Bureau Logo" 
               width={70} height={50} />
              <span className="text-lg font-bold text-gray-900 hidden md:block">
                South Ethiopia Region Revenue Bureau
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className={isActive("/") ? "font-bold text-blue-600" : "text-md  text-blue-800"}>
                Home
              </Button>
            </Link>
            <Link href="/about-us">
              <Button variant="ghost" className={isActive("/about") ? "font-bold text-blue-600" : "text-md  text-blue-800"}>
                About Us
              </Button>
            </Link>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex text-md text-blue-800 items-center gap-1">
                  Services
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
               {/*  <DropdownMenuItem asChild>
                  <Link href="/taxPayer">Taxpayer Registration</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem asChild>
                  <Link href="/business-license">Business License</Link>
                </DropdownMenuItem> 
                 <DropdownMenuItem asChild>
                  <Link href="/receipt-generator">Receipt Generators</Link>
                </DropdownMenuItem>    
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-md text-blue-800">
                  News and Events
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Announcements</DropdownMenuItem>
                <DropdownMenuItem>Press Releases</DropdownMenuItem>
                <DropdownMenuItem>Upcoming Events</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
           
            <Link href="/forms">
              <Button variant="ghost" className={isActive("/forms") ? "font-bold text-blue-600" : "text-md  text-blue-800"}>
                Forms
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className={isActive("/contact") ? "font-bold text-blue-600" : "text-md  text-blue-800"}>
                Contact
              </Button>
            </Link>
              <Link href="/login" className="pr-6 mr-3 items-end justify-end">
              <Button className={"font-bold bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer " }>
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
