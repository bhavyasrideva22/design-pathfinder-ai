import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, Users, TrendingUp, ArrowRight } from "lucide-react"

interface TestIntroductionProps {
  onContinue: () => void
}

export function TestIntroduction({ onContinue }: TestIntroductionProps) {
  const careers = [
    "Packaging Designer",
    "Structural Packaging Engineer", 
    "Graphic Packaging Designer",
    "Brand Packaging Specialist",
    "Sustainable Packaging Consultant"
  ]

  const traits = [
    "Creativity & visual-spatial skills",
    "Attention to detail and problem-solving",
    "Knowledge of materials and production processes", 
    "Curiosity about consumer behavior and marketing",
    "Patience & persistence for iterative design"
  ]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Assessment Introduction
          </h1>
          <p className="text-xl text-muted-foreground">
            Understanding Packaging Design as a Career Path
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-primary" />
                What is Packaging Design?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                Packaging design is the process of creating the exterior of a product, including choices in materials, structure, graphics, and user interaction with the package.
              </p>
              <p className="text-muted-foreground">
                It involves creativity, engineering, marketing insights, and consumer psychology to create functional and appealing product packaging.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-accent" />
                Typical Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {careers.map((career) => (
                  <Badge key={career} variant="secondary" className="text-sm py-1">
                    {career}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                Traits That Lead to Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {traits.map((trait) => (
                  <li key={trait} className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground">{trait}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl shadow-soft hover:shadow-glow transition-all duration-300"
          >
            Begin Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}