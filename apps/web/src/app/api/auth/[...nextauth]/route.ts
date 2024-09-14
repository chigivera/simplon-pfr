import NextAuth from "next-auth";
import { authOptions } from "@ntla9aw/network/src/authOptions";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
