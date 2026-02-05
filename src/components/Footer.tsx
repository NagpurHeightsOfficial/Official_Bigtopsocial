"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white text-black pt-20 pb-0 border-t border-gray-100 overflow-hidden h-[100vh]">
            <div className="container mx-auto px-6">

                {/* Top Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-4">
                        <h4 className="font-bold text-lg mb-4">Big Top Social</h4>
                        <p className="text-gray-500 text-sm max-w-xs">
                            Experience liftoff with the next-generation social agency.
                        </p>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-4" />

                    {/* Links Column 1 */}
                    <div className="col-span-1 lg:col-span-2">
                        <h5 className="font-bold mb-4">Company</h5>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-blue-600">About</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Careers</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Contact</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="col-span-1 lg:col-span-2">
                        <h5 className="font-bold mb-4">Legal</h5>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-blue-600">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Terms</Link></li>
                            <li><Link href="#" className="hover:text-blue-600">Security</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section: MASSIVE LOGO */}
                <div className="w-full flex justify-center border-t border-gray-100 pt-10 pb-4">
                    <h1 className="text-[12vw] md:text-[15vw] font-display font-medium tracking-tighter leading-none select-none text-black/90">
                        BigTopSocial
                    </h1>
                </div>

                {/* Copyright Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center py-6 text-xs text-gray-400 border-t border-gray-100 mt-5">
                    <div className="flex items-center gap-4">
                        <span>© 202X Big Top Social</span>
                        <a href="#" className="hover:text-black">Privacy</a>
                        <a href="#" className="hover:text-black">Terms</a>
                    </div>
                    <div className="mt-2 md:mt-0 flex gap-4">
                        {/* Social Icons Placeholder */}

                        <Link href="https://www.linkedin.com/company/bigtopsocial" className="hover:text-black">LinkedIn</Link>
                        <Link href="https://www.instagram.com/bigtopsocial" className="hover:text-black">Instagram</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
