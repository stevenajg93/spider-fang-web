import Hero from "@/components/sections/Hero"
import FreeDesignForm from "@/components/sections/FreeDesignForm"
import WhyItWorks from "@/components/sections/WhyItWorks"
import Packages from "@/components/sections/Packages"
import Header from "@/components/layout/Header"

export default function Page() {
  return (
    <main className="scroll-smooth">
      <Header />
      <Hero />
      <FreeDesignForm />
      <WhyItWorks />
      <Packages />
    </main>
  )
}
