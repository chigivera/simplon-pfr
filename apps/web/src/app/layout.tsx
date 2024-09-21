import "./globals.css";
import { Provider } from "@ntla9aw/trpc-client/src/Provider";
import { SessionProvider } from "@ntla9aw/ui/src/components/molecules/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Provider>{children}</Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
