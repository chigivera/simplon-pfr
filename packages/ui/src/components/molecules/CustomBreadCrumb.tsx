// components/CustomBreadCrumb.tsx
'use client'; // Ensure this is a client component

import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation"; // Use usePathname from next/navigation
import Link from "next/link";

const CustomBreadCrumb = () => {
    const pathname = usePathname(); // Get the current pathname
    const pathSegments = pathname.split('/').filter(segment => segment);

    const breadcrumbItems = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return {
            title: (
                <Link href={href}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)} {/* Capitalize first letter */}
                </Link>
            ),
        };
    });

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link href="/">Home</Link>
            </Breadcrumb.Item>
            {breadcrumbItems.map((item, index) => (
                <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default CustomBreadCrumb;