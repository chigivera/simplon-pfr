import { Layout } from "antd";
import CustomBreadCrumb from "@ntla9aw/ui/src/components/molecules/CustomBreadCrumb";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ padding: "2em 8em" }}>
      <CustomBreadCrumb />
      {children}
    </Layout>
  );
}
