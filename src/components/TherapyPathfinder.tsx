import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Brain, Heart, Shield, Lightbulb } from "lucide-react";

interface Problem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  keywords: string[];
}

interface TherapyRecommendation {
  type: string;
  title: string;
  description: string;
  benefits: string[];
  suitableFor: string[];
}

interface AssessmentQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    weight: Record<string, number>;
  }[];
}

const problems: Problem[] = [
  {
    id: "anxiety-stress",
    title: "Anxiety & Stress",
    description: "Feeling overwhelmed, worried, or experiencing panic attacks",
    icon: <Shield className="w-6 h-6" />,
    keywords: ["anxiety", "stress", "panic", "worry", "overwhelmed", "nervous"]
  },
  {
    id: "depression-mood",
    title: "Depression & Low Mood",
    description: "Feeling sad, hopeless, or losing interest in activities",
    icon: <Heart className="w-6 h-6" />,
    keywords: ["depression", "sad", "hopeless", "low mood", "unmotivated"]
  },
  {
    id: "trauma-ptsd",
    title: "Trauma & PTSD",
    description: "Processing past traumatic experiences or difficult memories",
    icon: <Brain className="w-6 h-6" />,
    keywords: ["trauma", "ptsd", "flashbacks", "nightmares", "past events"]
  },
  {
    id: "relationships",
    title: "Relationship Issues",
    description: "Difficulties with partner, family, or communication problems",
    icon: <Users className="w-6 h-6" />,
    keywords: ["relationship", "couple", "marriage", "communication", "conflict"]
  },
  {
    id: "habits-phobias",
    title: "Habits & Phobias",
    description: "Breaking unwanted habits, overcoming fears or phobias",
    icon: <Lightbulb className="w-6 h-6" />,
    keywords: ["habits", "phobia", "fear", "smoking", "addiction", "compulsive"]
  },
  {
    id: "self-esteem",
    title: "Self-Esteem & Confidence",
    description: "Building confidence and improving self-worth",
    icon: <CheckCircle className="w-6 h-6" />,
    keywords: ["confidence", "self-esteem", "self-worth", "insecure"]
  }
];

const therapyRecommendations: Record<string, TherapyRecommendation> = {
  "anxiety-stress": {
    type: "CBT",
    title: "Cognitive Behavioural Therapy (CBT)",
    description: "CBT is highly effective for anxiety and stress, helping you identify and change negative thought patterns that contribute to your symptoms.",
    benefits: [
      "Learn practical coping strategies",
      "Identify triggers and thought patterns",
      "Develop long-term management tools",
      "Evidence-based approach"
    ],
    suitableFor: ["Anxiety disorders", "Stress management", "Panic attacks", "Social anxiety"]
  },
  "depression-mood": {
    type: "Counselling",
    title: "Counselling",
    description: "Talk therapy provides a safe space to explore your feelings and develop strategies to improve your mood and outlook on life.",
    benefits: [
      "Safe, non-judgmental environment",
      "Explore underlying causes",
      "Develop coping strategies",
      "Improve emotional regulation"
    ],
    suitableFor: ["Depression", "Grief", "Life transitions", "Emotional difficulties"]
  },
  "trauma-ptsd": {
    type: "EMDR",
    title: "Eye Movement Desensitization and Reprocessing (EMDR)",
    description: "EMDR is specifically designed to help process traumatic memories and reduce their emotional impact on your daily life.",
    benefits: [
      "Process traumatic memories safely",
      "Reduce emotional charge of memories",
      "No need to discuss details extensively",
      "Proven effective for PTSD"
    ],
    suitableFor: ["PTSD", "Trauma", "Disturbing memories", "Flashbacks"]
  },
  "relationships": {
    type: "Couples Counselling",
    title: "Couples Counselling",
    description: "Work together with your partner to improve communication, resolve conflicts, and strengthen your relationship.",
    benefits: [
      "Improve communication skills",
      "Resolve ongoing conflicts",
      "Strengthen emotional connection",
      "Learn healthy relationship patterns"
    ],
    suitableFor: ["Relationship conflicts", "Communication issues", "Trust problems", "Life transitions"]
  },
  "habits-phobias": {
    type: "Hypnotherapy",
    title: "Hypnotherapy",
    description: "Use the power of your subconscious mind to break unwanted habits and overcome phobias through deep relaxation and suggestion.",
    benefits: [
      "Access subconscious patterns",
      "Deep relaxation techniques",
      "Break automatic behaviors",
      "Overcome limiting beliefs"
    ],
    suitableFor: ["Smoking cessation", "Weight management", "Phobias", "Unwanted habits"]
  },
  "self-esteem": {
    type: "CBT",
    title: "Cognitive Behavioural Therapy (CBT)",
    description: "CBT helps identify negative self-talk and limiting beliefs, replacing them with more balanced and positive thought patterns.",
    benefits: [
      "Challenge negative self-talk",
      "Build self-confidence",
      "Develop positive coping strategies",
      "Improve self-awareness"
    ],
    suitableFor: ["Low self-esteem", "Confidence issues", "Self-criticism", "Social anxiety"]
  }
};

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "relationship_status",
    question: "What is your current relationship status?",
    options: [
      { 
        id: "single", 
        text: "Single", 
        weight: { "CBT": 1, "Counselling": 1, "EMDR": 1, "Hypnotherapy": 1, "Couples Counselling": 0 }
      },
      { 
        id: "relationship", 
        text: "In a relationship/married", 
        weight: { "CBT": 1, "Counselling": 1, "EMDR": 1, "Hypnotherapy": 1, "Couples Counselling": 2 }
      },
      { 
        id: "complicated", 
        text: "It's complicated", 
        weight: { "CBT": 1, "Counselling": 1, "EMDR": 1, "Hypnotherapy": 1, "Couples Counselling": 3 }
      }
    ]
  },
  {
    id: "severity",
    question: "How would you describe the impact of your concerns on your daily life?",
    options: [
      { 
        id: "mild", 
        text: "Mild - Occasional difficulty, but I can usually manage", 
        weight: { "CBT": 2, "Counselling": 3, "EMDR": 1, "Hypnotherapy": 2, "Couples Counselling": 0 }
      },
      { 
        id: "moderate", 
        text: "Moderate - Regular challenges that affect my work or relationships", 
        weight: { "CBT": 3, "Counselling": 3, "EMDR": 2, "Hypnotherapy": 2, "Couples Counselling": 1 }
      },
      { 
        id: "severe", 
        text: "Severe - Significant disruption to most areas of my life", 
        weight: { "CBT": 2, "Counselling": 4, "EMDR": 3, "Hypnotherapy": 1, "Couples Counselling": 0 }
      }
    ]
  },
  {
    id: "duration",
    question: "How long have you been experiencing these concerns?",
    options: [
      { 
        id: "recent", 
        text: "Recent - A few weeks to a few months", 
        weight: { "CBT": 3, "Counselling": 3, "EMDR": 1, "Hypnotherapy": 2, "Couples Counselling": 2 }
      },
      { 
        id: "ongoing", 
        text: "Ongoing - Several months to a year", 
        weight: { "CBT": 3, "Counselling": 2, "EMDR": 2, "Hypnotherapy": 3, "Couples Counselling": 2 }
      },
      { 
        id: "longterm", 
        text: "Long-term - More than a year", 
        weight: { "CBT": 2, "Counselling": 3, "EMDR": 3, "Hypnotherapy": 2, "Couples Counselling": 3 }
      }
    ]
  },
  {
    id: "preference",
    question: "What type of approach appeals to you most?",
    options: [
      { 
        id: "talking", 
        text: "Talking through my thoughts and feelings", 
        weight: { "CBT": 2, "Counselling": 4, "EMDR": 1, "Hypnotherapy": 1, "Couples Counselling": 0 }
      },
      { 
        id: "practical", 
        text: "Learning practical techniques and strategies", 
        weight: { "CBT": 4, "Counselling": 2, "EMDR": 2, "Hypnotherapy": 3, "Couples Counselling": 0 }
      },
      { 
        id: "body-mind", 
        text: "Working with the mind-body connection", 
        weight: { "CBT": 1, "Counselling": 1, "EMDR": 4, "Hypnotherapy": 4, "Couples Counselling": 0 }
      },
      { 
        id: "together", 
        text: "Working with my partner to improve our relationship", 
        weight: { "CBT": 1, "Counselling": 1, "EMDR": 1, "Hypnotherapy": 1, "Couples Counselling": 4 }
      }
    ]
  },
  {
    id: "past_trauma",
    question: "Do you have specific traumatic memories or past events that still affect you?",
    options: [
      { 
        id: "yes_specific", 
        text: "Yes, specific traumatic events that I can identify", 
        weight: { "CBT": 1, "Counselling": 2, "EMDR": 4, "Hypnotherapy": 2, "Couples Counselling": 0 }
      },
      { 
        id: "yes_unclear", 
        text: "Yes, but I'm not sure exactly what or when", 
        weight: { "CBT": 2, "Counselling": 3, "EMDR": 3, "Hypnotherapy": 2, "Couples Counselling": 0 }
      },
      { 
        id: "no", 
        text: "No, my concerns are not related to past trauma", 
        weight: { "CBT": 3, "Counselling": 2, "EMDR": 1, "Hypnotherapy": 3, "Couples Counselling": 0 }
      }
    ]
  }
];

export default function TherapyPathfinder() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'demographics' | 'problems' | 'questions' | 'results'>('welcome');
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<TherapyRecommendation | null>(null);

  const handleProblemToggle = (problemId: string) => {
    setSelectedProblems(prev => 
      prev.includes(problemId) 
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      calculateRecommendation();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setCurrentStep('problems');
    }
  };

  const calculateRecommendation = () => {
    const therapyScores: Record<string, number> = {
      "CBT": 0,
      "Counselling": 0,
      "EMDR": 0,
      "Hypnotherapy": 0,
      "Couples Counselling": 0
    };

    // Add points based on selected problems
    selectedProblems.forEach(problemId => {
      const problemRec = therapyRecommendations[problemId];
      if (problemRec) {
        therapyScores[problemRec.type] += 3;
      }
    });

    // Add points based on assessment answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = assessmentQuestions.find(q => q.id === questionId);
      const selectedOption = question?.options.find(o => o.id === answerId);
      
      if (selectedOption) {
        Object.entries(selectedOption.weight).forEach(([therapy, weight]) => {
          therapyScores[therapy] += weight;
        });
      }
    });

    // Special logic for couples counselling - only recommend if:
    // 1. User selected relationship problems OR
    // 2. User is in a relationship AND wants to work together
    const relationshipStatus = answers.relationship_status;
    const wantsToWorkTogether = answers.preference === 'together';
    const hasRelationshipProblems = selectedProblems.includes('relationships');
    
    if (!hasRelationshipProblems && (relationshipStatus === 'single' || !wantsToWorkTogether)) {
      therapyScores["Couples Counselling"] = 0; // Exclude couples counselling
    }

    // Find the therapy with the highest score
    const recommendedTherapy = Object.entries(therapyScores).reduce((max, [therapy, score]) => 
      score > max.score ? { therapy, score } : max, 
      { therapy: "CBT", score: 0 }
    );

    // Create recommendation based on highest scoring therapy
    const rec = Object.values(therapyRecommendations).find(r => r.type === recommendedTherapy.therapy);
    
    if (rec) {
      setRecommendation(rec);
      setCurrentStep('results');
    }
  };

  const demographicsQuestions = [
    {
      id: "country",
      question: "Which country are you currently in?",
      options: [
        { id: "uk", text: "🇬🇧 England" },
        { id: "us", text: "🇺🇸 US" },
        { id: "canada", text: "🇨🇦 Canada" },
        { id: "australia", text: "🇦🇺 Australia" },
        { id: "other", text: "🌍 Other" }
      ]
    },
    {
      id: "gender",
      question: "What is your gender identity?",
      options: [
        { id: "woman", text: "Woman" },
        { id: "man", text: "Man" },
        // { id: "non-binary", text: "Non-binary" },
        // { id: "transgender", text: "Transgender" },
        // { id: "prefer-not", text: "Prefer not to say" }
      ]
    },
    {
      id: "age",
      question: "How old are you?",
      options: [
        { id: "-18", text: "-18 years" },
        { id: "18-24", text: "18-24 years" },
        { id: "25-34", text: "25-34 years" },
        { id: "35-44", text: "35-44 years" },
        { id: "45-54", text: "45-54 years" },
        { id: "55-64", text: "55-64 years" },
        { id: "65+", text: "65+ years" }
      ]
    }
  ];

  const getWebsiteUrl = (therapyType: string) => {
    const urlMap: Record<string, string> = {
      "Counselling": "https://www.oliptherapy.co.uk/counselling",
      "Couples Counselling": "https://www.oliptherapy.co.uk/couples-counselling",
      "EMDR": "https://www.oliptherapy.co.uk/emdr",
      "Hypnotherapy": "https://www.oliptherapy.co.uk/hypnotherapy",
      "CBT": "https://www.oliptherapy.co.uk/cbtpage"
    };
    return urlMap[therapyType] || "https://www.oliptherapy.co.uk";
  };

  const handleVisitWebsite = () => {
    if (recommendation) {
      const url = getWebsiteUrl(recommendation.type);
      window.open(url, '_self');
    }
  };

  const handleContactUs = () => {
    const url = "https://www.oliptherapy.co.uk/contact"
    window.open(url, '_self');
  }

  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-card">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground mb-4">
              Therapy Counselling
            </CardTitle>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Not sure which therapy approach is right for you? Our quick assessment will help match you 
              with the most suitable therapy based on your specific needs and concerns.
            </p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center p-4 border-2 border-primary rounded-lg">
                <Users className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">Counselling</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary rounded-lg">
                <Heart className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">Couples Therapy</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary rounded-lg">
                <Brain className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">EMDR</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary rounded-lg">
                <Lightbulb className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">Hypnotherapy</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary rounded-lg">
                <CheckCircle className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium">CBT</span>
              </div>
            </div>
            <Button 
              onClick={() => setCurrentStep('demographics')}
              className="bg-gradient-primary hover:bg-primary-hover text-white px-8 py-3 text-lg font-semibold shadow-soft"
            >
              Start Assessment
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Takes less than 2 minutes • Completely confidential
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentStep === 'demographics') {
    const currentDemoQuestion = demographicsQuestions[currentDemoIndex];
    const currentDemoAnswer = answers[currentDemoQuestion.id];
    const progress = ((currentDemoIndex + 1) / demographicsQuestions.length) * 100;

    const handleDemoAnswerSelect = (questionId: string, answerId: string) => {
      setAnswers(prev => ({ ...prev, [questionId]: answerId }));
    };

    const nextDemoQuestion = () => {
      if (currentDemoIndex < demographicsQuestions.length - 1) {
        setCurrentDemoIndex(prev => prev + 1);
      } else {
        setCurrentStep('problems');
      }
    };

    const prevDemoQuestion = () => {
      if (currentDemoIndex > 0) {
        setCurrentDemoIndex(prev => prev - 1);
      } else {
        setCurrentStep('welcome');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-soft p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentDemoIndex + 1} of {demographicsQuestions.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-accent rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                {currentDemoQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentDemoQuestion.options.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-soft ${
                    currentDemoAnswer === option.id
                      ? 'ring-2 ring-primary bg-accent/50' 
                      : 'hover:ring-2 hover:ring-primary/50'
                  }`}
                  onClick={() => handleDemoAnswerSelect(currentDemoQuestion.id, option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full border-2 ${
                        currentDemoAnswer === option.id 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`}>
                        {currentDemoAnswer === option.id && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <p className="text-foreground flex-1">{option.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevDemoQuestion}
              className="px-6 py-3"
            >
              {currentDemoIndex === 0 ? 'Back to Start' : 'Previous'}
            </Button>
            <Button 
              onClick={nextDemoQuestion}
              disabled={!currentDemoAnswer}
              className="bg-gradient-primary hover:bg-primary-hover text-white px-6 py-3 font-semibold shadow-soft disabled:opacity-50"
            >
              {currentDemoIndex === demographicsQuestions.length - 1 ? 'Continue' : 'Next'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'problems') {
    return (
      <div className="min-h-screen bg-gradient-soft p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What brings you here today?
            </h2>
            <p className="text-lg text-muted-foreground">
              Select all the areas you'd like support with. Choose as many as apply to you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {problems.map((problem) => {
              const isSelected = selectedProblems.includes(problem.id);
              return (
                <Card 
                  key={problem.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-soft ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-accent/50' 
                      : 'hover:ring-2 hover:ring-primary/50'
                  }`}
                  onClick={() => handleProblemToggle(problem.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-white' : 'bg-accent text-primary'}`}>
                        {problem.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">
                          {problem.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {problem.description}
                        </p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setCurrentStep('questions')}
              disabled={selectedProblems.length === 0}
              className="bg-gradient-primary hover:bg-primary-hover text-white px-8 py-3 text-lg font-semibold shadow-soft disabled:opacity-50"
            >
              Continue to Questions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('demographics')}
              className="ml-4"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'questions') {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const currentAnswer = answers[currentQuestion.id];
    const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-soft p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-accent rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-soft ${
                    currentAnswer === option.id
                      ? 'ring-2 ring-primary bg-accent/50' 
                      : 'hover:ring-2 hover:ring-primary/50'
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full border-2 ${
                        currentAnswer === option.id 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`}>
                        {currentAnswer === option.id && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <p className="text-foreground flex-1">{option.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevQuestion}
              className="px-6 py-3"
            >
              {currentQuestionIndex === 0 ? 'Back to Problems' : 'Previous'}
            </Button>
            <Button 
              onClick={nextQuestion}
              disabled={!currentAnswer}
              className="bg-gradient-primary hover:bg-primary-hover text-white px-6 py-3 font-semibold shadow-soft disabled:opacity-50"
            >
              {currentQuestionIndex === assessmentQuestions.length - 1 ? 'Get Results' : 'Next'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results' && recommendation) {
    return (
      <div className="min-h-screen bg-gradient-soft p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Recommended Therapy
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              {recommendation.type}
            </Badge>
          </div>

          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-primary">
                {recommendation.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {recommendation.description}
              </p>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Key Benefits:</h3>
                <ul className="space-y-2">
                  {recommendation.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Particularly Suitable For:</h3>
                <div className="flex flex-wrap gap-2">
                  {recommendation.suitableFor.map((item, index) => (
                    <Badge key={index} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-card">
              <h3 className="font-semibold text-foreground mb-3">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-4">
                Contact OLIP Therapy to book your {recommendation.type} session today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-gradient-primary hover:bg-primary-hover text-white px-6 py-3 font-semibold shadow-soft" onClick={handleContactUs}>
                  Contact Us
                </Button>
                <Button variant="outline" className="px-6 py-3" onClick={handleVisitWebsite}>
                  Visit Website
                </Button>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              onClick={() => setCurrentStep('problems')}
              className="text-primary"
            >
              Take Assessment Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}