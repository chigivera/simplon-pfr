import { Layout } from "antd";
import CustomBreadCrumb from "@ntla9aw/ui/src/components/molecules/CustomBreadCrumb";
import CustomLayout from "@ntla9aw/ui/src/components/molecules/CustomLayout";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomLayout>
      <Layout style={{ padding: "2em 8em" }}>
        <CustomBreadCrumb />
        {children}
      </Layout>
    </CustomLayout>
  );
}
