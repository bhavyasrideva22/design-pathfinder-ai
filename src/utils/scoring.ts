interface AssessmentAnswers {
  [key: string]: any
}

export function calculatePsychometricScore(answers: AssessmentAnswers): number {
  const interestQuestions = ['interest_1', 'interest_2', 'interest_3']
  const personalityQuestions = ['personality_1', 'personality_2', 'personality_3']
  const motivationQuestions = ['motivation_1', 'motivation_2']
  const workingStyleQuestions = ['working_style_1', 'working_style_2']

  let totalScore = 0
  let totalQuestions = 0

  // Interest scores (0-7 scale, convert to 0-100)
  interestQuestions.forEach(q => {
    if (answers[q]) {
      totalScore += (answers[q] / 7) * 100
      totalQuestions++
    }
  })

  // Personality scores (0-7 scale, convert to 0-100)
  personalityQuestions.forEach(q => {
    if (answers[q]) {
      totalScore += (answers[q] / 7) * 100
      totalQuestions++
    }
  })

  // Motivation scores (0-7 scale, convert to 0-100)
  motivationQuestions.forEach(q => {
    if (answers[q]) {
      totalScore += (answers[q] / 7) * 100
      totalQuestions++
    }
  })

  // Working style - award points based on packaging-aligned choices
  if (answers.working_style_1) {
    const workEnvScore = answers.working_style_1 === "Mix of creative and technical environments" ? 100 :
                        answers.working_style_1 === "Creative studio with collaborative brainstorming" ? 80 :
                        answers.working_style_1 === "Technical workspace with prototyping equipment" ? 75 : 60
    totalScore += workEnvScore
    totalQuestions++
  }

  if (answers.working_style_2) {
    const problemSolvingScore = answers.working_style_2 === "Brainstorm creative solutions first, then refine" ? 100 :
                               answers.working_style_2 === "Break it down systematically step by step" ? 90 :
                               answers.working_style_2 === "Collaborate with others to find the best approach" ? 85 : 70
    totalScore += problemSolvingScore
    totalQuestions++
  }

  return totalQuestions > 0 ? Math.round(totalScore / totalQuestions) : 0
}

export function calculateTechnicalScore(answers: AssessmentAnswers): number {
  let score = 0
  let totalQuestions = 0

  // Logical reasoning questions
  if (answers.logical_1 === "Material cushioning and shock absorption") {
    score += 100
  } else if (answers.logical_1 === "Structural integrity and box strength") {
    score += 85
  } else {
    score += 50
  }
  totalQuestions++

  if (answers.logical_2 === "Optimize package dimensions to reduce material use") {
    score += 100
  } else if (answers.logical_2 === "Switch to cheaper materials") {
    score += 70
  } else {
    score += 40
  }
  totalQuestions++

  // Numerical ability
  if (answers.numerical_1 === "603 cm³") {
    score += 100
  } else {
    score += 30
  }
  totalQuestions++

  // Domain knowledge
  if (answers.domain_1 === "Recyclable cardboard") {
    score += 100
  } else {
    score += 40
  }
  totalQuestions++

  if (answers.domain_2 === "The cutting and folding template for the package") {
    score += 100
  } else {
    score += 30
  }
  totalQuestions++

  if (answers.domain_3 === "Flexographic printing") {
    score += 100
  } else if (answers.domain_3 === "Offset lithography") {
    score += 80
  } else {
    score += 50
  }
  totalQuestions++

  // Technical tools familiarity
  if (answers.tools_1 !== undefined) {
    score += answers.tools_1
    totalQuestions++
  }

  if (answers.tools_2 !== undefined) {
    score += answers.tools_2
    totalQuestions++
  }

  if (answers.tools_3) {
    score += answers.tools_3 === "yes" ? 100 : 30
    totalQuestions++
  }

  return totalQuestions > 0 ? Math.round(score / totalQuestions) : 0
}

export function calculateWISCARScores(psychometricScore: number, technicalScore: number, answers: AssessmentAnswers) {
  // Will - based on motivation and persistence indicators
  const will = Math.round((
    (answers.motivation_1 || 0) / 7 * 100 +
    (answers.motivation_2 || 0) / 7 * 100 +
    (answers.personality_3 || 0) / 7 * 100
  ) / 3)

  // Interest - based on genuine curiosity and engagement
  const interest = Math.round((
    (answers.interest_1 || 0) / 7 * 100 +
    (answers.interest_2 || 0) / 7 * 100 +
    (answers.interest_3 || 0) / 7 * 100
  ) / 3)

  // Skill - current technical abilities
  const skill = technicalScore

  // Cognitive Readiness - problem-solving and analytical thinking
  const cognitiveReadiness = Math.round((
    (answers.personality_1 || 0) / 7 * 100 +
    (answers.personality_2 || 0) / 7 * 100 +
    (answers.logical_1 ? 90 : 60) +
    (answers.logical_2 ? 90 : 60)
  ) / 4)

  // Ability to Learn - openness and adaptability
  const abilityToLearn = Math.round((
    (answers.personality_3 || 0) / 7 * 100 +
    psychometricScore * 0.3
  ) / 2)

  // Real-World Alignment - fit with actual job requirements
  const realWorldAlignment = Math.round((psychometricScore + technicalScore) / 2)

  return {
    will,
    interest,
    skill,
    cognitiveReadiness,
    abilityToLearn,
    realWorldAlignment
  }
}

interface WISCARScores {
  will: number
  interest: number
  skill: number
  cognitiveReadiness: number
  abilityToLearn: number
  realWorldAlignment: number
}

export function calculateOverallScore(psychometricScore: number, technicalScore: number, wiscarScores: WISCARScores): number {
  const wiscarAverage = (wiscarScores.will + wiscarScores.interest + wiscarScores.skill + wiscarScores.cognitiveReadiness + wiscarScores.abilityToLearn + wiscarScores.realWorldAlignment) / 6
  return Math.round((psychometricScore * 0.3 + technicalScore * 0.3 + wiscarAverage * 0.4))
}

export function getRecommendation(overallScore: number): "yes" | "maybe" | "no" {
  if (overallScore >= 75) return "yes"
  if (overallScore >= 50) return "maybe"
  return "no"
}