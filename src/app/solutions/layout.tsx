import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Solutions & Services | BigTopSocial - Digital Marketing Expertise",
    description: "Comprehensive digital solutions tailored to your brand. Photography & videography, performance marketing, SEO, social media marketing, branding, and content production services.",
    keywords: [
        "digital marketing services",
        "photography services",
        "videography services",
        "performance marketing",
        "SEO services",
        "social media marketing services",
        "brand strategy services",
        "content production",
        "marketing solutions",
        "creative services"
    ],
    openGraph: {
        title: "Solutions & Services | BigTopSocial",
        description: "Everything you need to build, grow, and scale your brand.",
        url: "https://bigtopsocial.com/solutions",
        type: "website",
    },
};

export default function SolutionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
