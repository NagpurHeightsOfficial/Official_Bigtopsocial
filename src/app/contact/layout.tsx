import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | BigTopSocial - Let's Create Together",
    description: "Ready to elevate your brand? Get in touch with BigTopSocial. Let's make something happen together. Contact us for creative and digital marketing solutions.",
    keywords: [
        "contact us",
        "get in touch",
        "request quote",
        "marketing consultation",
        "project inquiry",
        "contact agency",
        "business inquiry",
        "partnership opportunities"
    ],
    openGraph: {
        title: "Contact BigTopSocial - Let's Create Together",
        description: "Ready to elevate your brand? Drop us a line and let's start the conversation.",
        url: "https://bigtopsocial.com/contact",
        type: "website",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
