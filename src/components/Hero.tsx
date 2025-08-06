import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

interface HeroProps {
  onStartAssessment: () => void
}

export function Hero({ onStartAssessment }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-background/20" />
      
      <div className="container relative z-10 text-center text-primary-foreground">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Should I Pursue
            <span className="block bg-gradient-to-r from-primary-foreground to-accent-foreground bg-clip-text text-transparent">
              Packaging Design?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Discover if packaging design is the perfect career path for you with our comprehensive AI-powered assessment
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Psychometric Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Technical Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>WISCAR Framework</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span>Career Guidance</span>
            </div>
          </div>
          
          <div className="pt-8">
            <Button
              onClick={onStartAssessment}
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-glow transition-all duration-300 hover:scale-105"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="pt-12 text-primary-foreground/70">
            <p className="text-sm">
              ⏱️ Takes 20-30 minutes • 📊 Instant results • 🎯 Personalized recommendations
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}