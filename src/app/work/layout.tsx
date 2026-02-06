import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Work | BigTopSocial - Portfolio & Case Studies",
    description: "Explore our portfolio of creative work. From high-end product shoots to cinematic brand films, discover how we bring visions to life through stunning visuals and innovative digital solutions.",
    keywords: [
        "portfolio",
        "case studies",
        "creative work",
        "brand projects",
        "design portfolio",
        "marketing campaigns",
        "client work",
        "project showcase",
        "branding examples",
        "digital projects"
    ],
    openGraph: {
        title: "Our Work | BigTopSocial Portfolio",
        description: "Visuals that speak. Explore our portfolio of creative excellence.",
        url: "https://bigtopsocial.com/work",
        type: "website",
    },
};

export default function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
