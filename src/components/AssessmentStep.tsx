import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight } from "lucide-react"

export interface Question {
  id: string
  type: "likert" | "multiple-choice" | "slider" | "binary"
  question: string
  options?: string[]
  min?: number
  max?: number
  step?: number
}

interface AssessmentStepProps {
  title: string
  description: string
  questions: Question[]
  currentQuestionIndex: number
  totalQuestions: number
  answers: Record<string, any>
  onAnswer: (questionId: string, answer: any) => void
  onNext: () => void
  onPrevious: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  stepProgress: number
}

export function AssessmentStep({
  title,
  description,
  questions,
  currentQuestionIndex,
  totalQuestions,
  answers,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  stepProgress
}: AssessmentStepProps) {
  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestion?.id]

  const renderQuestion = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case "likert":
        return (
          <div className="space-y-4">
            <RadioGroup
              value={currentAnswer?.toString()}
              onValueChange={(value) => onAnswer(currentQuestion.id, parseInt(value))}
            >
              {Array.from({ length: 7 }, (_, i) => i + 1).map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value.toString()} id={`q${currentQuestion.id}-${value}`} />
                  <Label htmlFor={`q${currentQuestion.id}-${value}`} className="flex-1">
                    <span className="font-medium">{value}</span>
                    <span className="text-muted-foreground ml-2">
                      {value === 1 && "Strongly Disagree"}
                      {value === 4 && "Neutral"}
                      {value === 7 && "Strongly Agree"}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case "multiple-choice":
        return (
          <RadioGroup
            value={currentAnswer}
            onValueChange={(value) => onAnswer(currentQuestion.id, value)}
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`q${currentQuestion.id}-${index}`} />
                <Label htmlFor={`q${currentQuestion.id}-${index}`} className="flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "slider":
        return (
          <div className="space-y-4">
            <Slider
              value={[currentAnswer || currentQuestion.min || 0]}
              onValueChange={(value) => onAnswer(currentQuestion.id, value[0])}
              min={currentQuestion.min || 0}
              max={currentQuestion.max || 100}
              step={currentQuestion.step || 1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{currentQuestion.min || 0}</span>
              <span className="font-medium">{currentAnswer || currentQuestion.min || 0}</span>
              <span>{currentQuestion.max || 100}</span>
            </div>
          </div>
        )

      case "binary":
        return (
          <RadioGroup
            value={currentAnswer}
            onValueChange={(value) => onAnswer(currentQuestion.id, value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`q${currentQuestion.id}-yes`} />
              <Label htmlFor={`q${currentQuestion.id}-yes`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`q${currentQuestion.id}-no`} />
              <Label htmlFor={`q${currentQuestion.id}-no`}>No</Label>
            </div>
          </RadioGroup>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-3xl">
        <div className="mb-8">
          <Progress value={stepProgress} className="mb-4" />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
          </div>
        </div>

        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{currentQuestion?.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderQuestion()}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 bg-gradient-primary"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}