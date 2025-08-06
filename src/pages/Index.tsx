import { useState } from "react"
import { Hero } from "@/components/Hero"
import { TestIntroduction } from "@/components/TestIntroduction"
import { AssessmentStep } from "@/components/AssessmentStep"
import { Results } from "@/components/Results"
import { psychometricQuestions, technicalQuestions } from "@/data/questions"
import { 
  calculatePsychometricScore, 
  calculateTechnicalScore, 
  calculateWISCARScores, 
  calculateOverallScore, 
  getRecommendation 
} from "@/utils/scoring"

type Step = "hero" | "introduction" | "psychometric" | "technical" | "results"

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("hero")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentStep === "psychometric") {
      if (currentQuestionIndex < psychometricQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        setCurrentStep("technical")
        setCurrentQuestionIndex(0)
      }
    } else if (currentStep === "technical") {
      if (currentQuestionIndex < technicalQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else {
        setCurrentStep("results")
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (currentStep === "technical") {
      setCurrentStep("psychometric")
      setCurrentQuestionIndex(psychometricQuestions.length - 1)
    } else if (currentStep === "psychometric") {
      setCurrentStep("introduction")
    }
  }

  const handleRestart = () => {
    setCurrentStep("hero")
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const getStepProgress = () => {
    const totalQuestions = psychometricQuestions.length + technicalQuestions.length
    let completedQuestions = 0
    
    if (currentStep === "psychometric") {
      completedQuestions = currentQuestionIndex
    } else if (currentStep === "technical") {
      completedQuestions = psychometricQuestions.length + currentQuestionIndex
    } else if (currentStep === "results") {
      completedQuestions = totalQuestions
    }
    
    return (completedQuestions / totalQuestions) * 100
  }

  const getCurrentQuestion = () => {
    if (currentStep === "psychometric") {
      return psychometricQuestions[currentQuestionIndex]
    } else if (currentStep === "technical") {
      return technicalQuestions[currentQuestionIndex]
    }
    return null
  }

  const canGoNext = () => {
    const currentQuestion = getCurrentQuestion()
    if (!currentQuestion) return false
    return answers[currentQuestion.id] !== undefined
  }

  const canGoPrevious = () => {
    return currentQuestionIndex > 0 || currentStep === "technical"
  }

  if (currentStep === "hero") {
    return <Hero onStartAssessment={() => setCurrentStep("introduction")} />
  }

  if (currentStep === "introduction") {
    return <TestIntroduction onContinue={() => setCurrentStep("psychometric")} />
  }

  if (currentStep === "psychometric") {
    return (
      <AssessmentStep
        title="Psychometric Assessment"
        description="Evaluating your personality, interests, and motivation for packaging design"
        questions={psychometricQuestions}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={psychometricQuestions.length}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext()}
        canGoPrevious={canGoPrevious()}
        stepProgress={getStepProgress()}
      />
    )
  }

  if (currentStep === "technical") {
    return (
      <AssessmentStep
        title="Technical Assessment"
        description="Testing your logical reasoning, domain knowledge, and technical readiness"
        questions={technicalQuestions}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={technicalQuestions.length}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext()}
        canGoPrevious={canGoPrevious()}
        stepProgress={getStepProgress()}
      />
    )
  }

  if (currentStep === "results") {
    const psychometricScore = calculatePsychometricScore(answers)
    const technicalScore = calculateTechnicalScore(answers)
    const wiscarScores = calculateWISCARScores(psychometricScore, technicalScore, answers)
    const overallScore = calculateOverallScore(psychometricScore, technicalScore, wiscarScores)
    const recommendation = getRecommendation(overallScore)

    return (
      <Results
        psychometricScore={psychometricScore}
        technicalScore={technicalScore}
        wiscarScores={wiscarScores}
        overallScore={overallScore}
        recommendation={recommendation}
        onRestart={handleRestart}
      />
    )
  }

  return null
};

export default Index;
