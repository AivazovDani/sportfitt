import type { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { prisma } from "./prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url }) {
        await resend.emails.send({
          from: "SportFit <noreply@sportfit.bg>",
          to: email,
          subject: "Влезте в SportFit",
          html: `
            <h2>Влезте в SportFit</h2>
            <p>Кликнете на линка за да влезете:</p>
            <a href="${url}">Влезте тук</a>
          `,
        })
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        })
        session.user.role = user?.role || "CLIENT"
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
}
