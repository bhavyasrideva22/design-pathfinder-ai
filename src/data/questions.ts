export const psychometricQuestions = [
  {
    id: "interest_1",
    type: "likert" as const,
    question: "I am genuinely excited about the idea of creating packaging that influences consumer behavior"
  },
  {
    id: "interest_2", 
    type: "likert" as const,
    question: "I often notice and analyze packaging design when shopping or browsing products"
  },
  {
    id: "interest_3",
    type: "likert" as const,
    question: "I enjoy combining artistic creativity with practical problem-solving"
  },
  {
    id: "personality_1",
    type: "likert" as const,
    question: "I pay close attention to small details and notice when things are 'off'"
  },
  {
    id: "personality_2",
    type: "likert" as const,
    question: "I enjoy working on projects that require both creative and analytical thinking"
  },
  {
    id: "personality_3",
    type: "likert" as const,
    question: "I am comfortable with iterative design processes and receiving feedback"
  },
  {
    id: "motivation_1",
    type: "likert" as const,
    question: "I am motivated by seeing my designs become real products that people use"
  },
  {
    id: "motivation_2",
    type: "likert" as const,
    question: "I enjoy learning about consumer psychology and market trends"
  },
  {
    id: "working_style_1",
    type: "multiple-choice" as const,
    question: "Which work environment appeals to you most?",
    options: [
      "Creative studio with collaborative brainstorming",
      "Technical workspace with prototyping equipment", 
      "Mix of creative and technical environments",
      "Client-facing role with presentations"
    ]
  },
  {
    id: "working_style_2",
    type: "multiple-choice" as const,
    question: "How do you prefer to approach complex problems?",
    options: [
      "Break it down systematically step by step",
      "Brainstorm creative solutions first, then refine",
      "Research similar solutions and adapt them",
      "Collaborate with others to find the best approach"
    ]
  }
]

export const technicalQuestions = [
  {
    id: "logical_1",
    type: "multiple-choice" as const,
    question: "If a package needs to protect a fragile item during shipping, what would be your PRIMARY consideration?",
    options: [
      "Material cushioning and shock absorption",
      "Structural integrity and box strength", 
      "Cost-effectiveness of materials",
      "Visual appeal and branding"
    ]
  },
  {
    id: "logical_2",
    type: "multiple-choice" as const,
    question: "A client wants to reduce packaging costs by 20%. Which approach would you recommend first?",
    options: [
      "Switch to cheaper materials",
      "Optimize package dimensions to reduce material use",
      "Simplify the graphic design",
      "Remove protective features"
    ]
  },
  {
    id: "numerical_1",
    type: "multiple-choice" as const,
    question: "If a cylindrical container has a diameter of 8cm and height of 12cm, what is its approximate volume?",
    options: [
      "96 cm³",
      "603 cm³", 
      "192 cm³",
      "302 cm³"
    ]
  },
  {
    id: "domain_1",
    type: "multiple-choice" as const,
    question: "Which material is most commonly used for sustainable food packaging?",
    options: [
      "PVC plastic",
      "Aluminum foil",
      "Recyclable cardboard",
      "Polystyrene foam"
    ]
  },
  {
    id: "domain_2",
    type: "multiple-choice" as const,
    question: "What does 'dieline' refer to in packaging design?",
    options: [
      "The cutting and folding template for the package",
      "The color guidelines for printing",
      "The shipping deadline for the project",
      "The product placement line on shelves"
    ]
  },
  {
    id: "domain_3",
    type: "multiple-choice" as const,
    question: "Which printing method is most cost-effective for high-volume packaging production?",
    options: [
      "Digital printing",
      "Screen printing",
      "Offset lithography",
      "Flexographic printing"
    ]
  },
  {
    id: "tools_1",
    type: "slider" as const,
    question: "Rate your familiarity with Adobe Illustrator (0 = Never used, 100 = Expert level)",
    min: 0,
    max: 100,
    step: 5
  },
  {
    id: "tools_2",
    type: "slider" as const,
    question: "Rate your familiarity with CAD software like SolidWorks or Fusion 360 (0 = Never used, 100 = Expert level)",
    min: 0,
    max: 100,
    step: 5
  },
  {
    id: "tools_3",
    type: "binary" as const,
    question: "Have you ever created a physical prototype or mock-up of a design?"
  }
]