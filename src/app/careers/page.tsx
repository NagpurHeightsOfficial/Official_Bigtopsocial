"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CareersPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-6">
                            Careers
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl">
                            Join our team of creative innovators and help shape the future of social media.
                        </p>
                    </div>
                </section>

                {/* Open Positions */}
                <section className="py-20 px-6 bg-neutral-50">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-4xl font-display font-bold mb-12">Open Positions</h2>
                        <div className="space-y-6">
                            {["Creative Director", "Social Media Strategist", "Content Creator", "Account Manager"].map((position) => (
                                <div key={position} className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-neutral-400 transition-colors">
                                    <h3 className="text-2xl font-display font-bold mb-2">{position}</h3>
                                    <p className="text-neutral-600">Full-time • Remote</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
