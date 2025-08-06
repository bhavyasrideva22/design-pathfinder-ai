import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ProgressRing } from "@/components/ui/progress-ring"
import { RadarChart } from "@/components/ui/radar-chart"
import { Download, RefreshCw, TrendingUp, BookOpen, Users, Target } from "lucide-react"

interface ResultsProps {
  psychometricScore: number
  technicalScore: number
  wiscarScores: {
    will: number
    interest: number
    skill: number
    cognitiveReadiness: number
    abilityToLearn: number
    realWorldAlignment: number
  }
  overallScore: number
  recommendation: "yes" | "maybe" | "no"
  onRestart: () => void
}

export function Results({
  psychometricScore,
  technicalScore,
  wiscarScores,
  overallScore,
  recommendation,
  onRestart
}: ResultsProps) {
  const wiscarData = [
    { label: "Will", value: wiscarScores.will },
    { label: "Interest", value: wiscarScores.interest },
    { label: "Skill", value: wiscarScores.skill },
    { label: "Cognitive", value: wiscarScores.cognitiveReadiness },
    { label: "Learning", value: wiscarScores.abilityToLearn },
    { label: "Alignment", value: wiscarScores.realWorldAlignment }
  ]

  const getRecommendationConfig = () => {
    switch (recommendation) {
      case "yes":
        return {
          title: "Highly Recommended",
          message: "You show excellent potential for a career in packaging design!",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200"
        }
      case "maybe":
        return {
          title: "Moderate Fit",
          message: "You have some potential, but may want to develop certain skills first.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200"
        }
      case "no":
        return {
          title: "Consider Alternatives",
          message: "Packaging design may not be the best fit. Consider related fields.",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200"
        }
    }
  }

  const config = getRecommendationConfig()

  const suggestedRoles = [
    "Packaging Designer",
    "Structural Packaging Engineer",
    "Brand Packaging Specialist",
    "Sustainable Packaging Consultant",
    "Production Coordinator"
  ]

  const skillGaps = [
    { skill: "Creativity & Design", current: 75, required: 85 },
    { skill: "Software Tools", current: 60, required: 80 },
    { skill: "Material Knowledge", current: 45, required: 70 },
    { skill: "Consumer Psychology", current: 70, required: 75 }
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your packaging design career potential
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          {/* Overall Score */}
          <Card className={`shadow-card border-2 ${config.borderColor} ${config.bgColor}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-2xl ${config.color}`}>
                {config.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <ProgressRing value={overallScore} size={150} />
              <p className={`text-lg ${config.color} font-medium`}>
                {config.message}
              </p>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Psychological Fit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Score</span>
                    <span className="font-bold">{psychometricScore}/100</span>
                  </div>
                  <Progress value={psychometricScore} />
                  <p className="text-sm text-muted-foreground">
                    Your personality and interests align well with packaging design requirements.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Technical Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Score</span>
                    <span className="font-bold">{technicalScore}/100</span>
                  </div>
                  <Progress value={technicalScore} />
                  <p className="text-sm text-muted-foreground">
                    Your technical skills and domain knowledge level.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WISCAR Analysis */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <RadarChart data={wiscarData} size={300} />
                </div>
                <div className="space-y-4 flex-1">
                  {wiscarData.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-primary font-bold">{item.value}/100</span>
                      </div>
                      <Progress value={item.value} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Guidance */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Suggested Roles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestedRoles.map((role) => (
                    <Badge key={role} variant="outline" className="block text-center py-2">
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Skill Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillGaps.map((gap) => (
                    <div key={gap.skill} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{gap.skill}</span>
                        <span>{gap.current}/{gap.required}</span>
                      </div>
                      <div className="relative">
                        <Progress value={(gap.current / gap.required) * 100} />
                        <div
                          className="absolute top-0 h-full w-1 bg-primary"
                          style={{ left: `${(gap.required / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Path */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recommended Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Beginner</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Packaging fundamentals</li>
                    <li>• Design principles</li>
                    <li>• Basic software skills</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-accent">Intermediate</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Structural design</li>
                    <li>• Material science</li>
                    <li>• Prototyping skills</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">Job-Ready</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Portfolio development</li>
                    <li>• Industry internships</li>
                    <li>• Sustainability focus</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retake Assessment
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-primary">
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  )
}