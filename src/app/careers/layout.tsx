import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Careers | BigTopSocial - Join Our Creative Team",
    description: "Join the BigTopSocial team. Explore career opportunities in digital marketing, creative design, content creation, and technology. Be part of our creative cult.",
    keywords: [
        "careers",
        "jobs",
        "employment opportunities",
        "creative jobs",
        "marketing careers",
        "digital marketing jobs",
        "agency careers",
        "join our team",
        "work with us"
    ],
    openGraph: {
        title: "Careers at BigTopSocial",
        description: "Join our creative cult. Explore career opportunities at BigTopSocial.",
        url: "https://bigtopsocial.com/careers",
        type: "website",
    },
};

export default function CareersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
