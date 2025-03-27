import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

function Navbar() {
  return (
    <nav className="bg-gray-700 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Poppins'] tracking-wide">
            AGRO-ML
          </h1>
        </div>
        <NavigationMenu className="w-full sm:w-auto">
          <NavigationMenuList className="flex flex-col sm:flex-row gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-white/10 hover:bg-white/20 text-white font-['Inter']">
                Crop Prediction
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/Form" className="font-['Inter']">
                  Get Started
                </NavigationMenuLink>
                <NavigationMenuLink href="/" className="font-['Inter']">
                  Home
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

export default Navbar