import { authOptions } from "../../../lib/auth";
// there is alsow another way of import authOptions 
//import { authOptions } from "../../../lib/auth";
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 
