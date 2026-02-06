import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | BigTopSocial - Creative Cult & Digital Innovators",
    description: "Bigtop isn&apos;t an agency. It&apos;s a cult of creativity. We operate in the shadows of convention to shed light on what&apos;s possible. Discover our digital alchemy, chaos theory, and future-crafted approach.",
    keywords: [
        "creative agency about",
        "digital innovation",
        "creative cult",
        "brand transformation",
        "digital alchemy",
        "creative philosophy",
        "agency culture",
        "innovation team",
        "creative manifesto"
    ],
    openGraph: {
        title: "About BigTopSocial - Creative Cult & Digital Innovators",
        description: "We don&apos;t just design. We engineer emotions, curate chaos, and build digital cathedrals for the bold.",
        url: "https://bigtopsocial.com/about",
        type: "website",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
