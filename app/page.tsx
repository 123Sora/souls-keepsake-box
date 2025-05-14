import { ThemeProvider } from "@/components/theme-provider"
import MessageApp from "@/components/message-app"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MessageApp />
    </ThemeProvider>
  )
}
