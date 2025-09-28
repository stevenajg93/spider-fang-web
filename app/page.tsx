import BackgroundFX from "@/components/BackgroundFX"
import Header from "@/components/layout/Header"
import FinalCTA from "@/components/sections/FinalCTA"
import FreeDesignForm from "@/components/sections/FreeDesignForm"
import Hero from "@/components/sections/Hero"
import Packages from "@/components/sections/Packages"
import Urgency from "@/components/sections/Urgency"
import WhoWeAre from "@/components/sections/WhoWeAre"
import WhyItWorks from "@/components/sections/WhyItWorks"

export default function Page() {
  return (
    <main className="relative scroll-smooth">
      <BackgroundFX />
      <Header />
      <Hero />
      <WhoWeAre />
      <FreeDesignForm />
      <WhyItWorks />
      <Urgency />
      <Packages />
      <FinalCTA />
    </main>
  )
}
