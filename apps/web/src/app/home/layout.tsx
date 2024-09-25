import { Layout, Spin } from "antd";
import CustomBreadCrumb from "@ntla9aw/ui/src/components/molecules/CustomBreadCrumb";
import CustomLayout from "@ntla9aw/ui/src/components/molecules/CustomLayout";
import { Suspense } from "react";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomLayout>
<Suspense fallback={<Spin />}>
      <Layout style={{ padding: "2em 8em" }}>
        <CustomBreadCrumb />
        {children}
      </Layout>
</Suspense>
    </CustomLayout>
  );
}
