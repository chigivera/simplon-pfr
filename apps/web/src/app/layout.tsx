import "./globals.css";
import { Provider } from "@ntla9aw/trpc-client/src/Provider";
import CustomLayout from "@ntla9aw/ui/src/components/molecules/CustomLayout";
import SessionProvider from "@ntla9aw/ui/src/components/molecules/SessionProvider";
import { getServerSession } from "next-auth/next";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(); // Fetch the session on the server side

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Provider>
            <CustomLayout>{children}</CustomLayout>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
