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
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // List of countries for the dropdown
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
    "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
    "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
    "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

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
              <CardTitle className="text-4xl font-bold text-foreground mb-4">
                Find Your Perfect Therapy Match
              </CardTitle>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Feeling overwhelmed by therapy options? Take our gentle 2-minute assessment and discover 
                the therapy approach that's right for you. Your journey to healing starts here. ✨
              </p>
            </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <Users className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">Counselling</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Talk Therapy</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100/50 hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <Heart className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">Couples Therapy</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Relationship Healing</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <Brain className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">EMDR</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Trauma Processing</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100/50 hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <Lightbulb className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">Hypnotherapy</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Subconscious Healing</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <CheckCircle className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">CBT</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Thought Patterns</span>
              </div>
            </div>
            <Button 
              onClick={() => setCurrentStep('demographics')}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Begin Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center space-x-4">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                Takes less than 2 minutes
              </span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 text-blue-500 mr-1" />
                Completely confidential
              </span>
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
      
      // Show country dropdown if "Other" is selected
      if (questionId === "country" && answerId === "other") {
        setShowCountryDropdown(true);
      } else if (questionId === "country") {
        setShowCountryDropdown(false);
      }
    };

    const handleCountrySelect = (country: string) => {
      setAnswers(prev => ({ ...prev, country: country }));
      setShowCountryDropdown(false);
    };

    // Function to get country flag emoji
    const getCountryFlag = (countryName: string) => {
      const flagMap: Record<string, string> = {
        "Ukraine": "🇺🇦",
        "United States": "🇺🇸",
        "United Kingdom": "🇬🇧",
        "Canada": "🇨🇦",
        "Australia": "🇦🇺",
        "Germany": "🇩🇪",
        "France": "🇫🇷",
        "Italy": "🇮🇹",
        "Spain": "🇪🇸",
        "Netherlands": "🇳🇱",
        "Belgium": "🇧🇪",
        "Switzerland": "🇨🇭",
        "Austria": "🇦🇹",
        "Sweden": "🇸🇪",
        "Norway": "🇳🇴",
        "Denmark": "🇩🇰",
        "Finland": "🇫🇮",
        "Poland": "🇵🇱",
        "Czech Republic": "🇨🇿",
        "Slovakia": "🇸🇰",
        "Hungary": "🇭🇺",
        "Romania": "🇷🇴",
        "Bulgaria": "🇧🇬",
        "Croatia": "🇭🇷",
        "Slovenia": "🇸🇮",
        "Estonia": "🇪🇪",
        "Latvia": "🇱🇻",
        "Lithuania": "🇱🇹",
        "Ireland": "🇮🇪",
        "Portugal": "🇵🇹",
        "Greece": "🇬🇷",
        "Cyprus": "🇨🇾",
        "Malta": "🇲🇹",
        "Luxembourg": "🇱🇺",
        "Iceland": "🇮🇸",
        "New Zealand": "🇳🇿",
        "Japan": "🇯🇵",
        "South Korea": "🇰🇷",
        "China": "🇨🇳",
        "India": "🇮🇳",
        "Brazil": "🇧🇷",
        "Argentina": "🇦🇷",
        "Mexico": "🇲🇽",
        "Chile": "🇨🇱",
        "Peru": "🇵🇪",
        "Colombia": "🇨🇴",
        "Venezuela": "🇻🇪",
        "Ecuador": "🇪🇨",
        "Uruguay": "🇺🇾",
        "Paraguay": "🇵🇾",
        "Bolivia": "🇧🇴",
        "Guyana": "🇬🇾",
        "Suriname": "🇸🇷",
        "French Guiana": "🇬🇫",
        "South Africa": "🇿🇦",
        "Egypt": "🇪🇬",
        "Nigeria": "🇳🇬",
        "Kenya": "🇰🇪",
        "Ethiopia": "🇪🇹",
        "Morocco": "🇲🇦",
        "Algeria": "🇩🇿",
        "Tunisia": "🇹🇳",
        "Libya": "🇱🇾",
        "Sudan": "🇸🇩",
        "Somalia": "🇸🇴",
        "Djibouti": "🇩🇯",
        "Eritrea": "🇪🇷",
        "Chad": "🇹🇩",
        "Niger": "🇳🇪",
        "Mali": "🇲🇱",
        "Burkina Faso": "🇧🇫",
        "Senegal": "🇸🇳",
        "Gambia": "🇬🇲",
        "Guinea-Bissau": "🇬🇼",
        "Guinea": "🇬🇳",
        "Sierra Leone": "🇸🇱",
        "Liberia": "🇱🇷",
        "Ivory Coast": "🇨🇮",
        "Ghana": "🇬🇭",
        "Togo": "🇹🇬",
        "Benin": "🇧🇯",
        "Cameroon": "🇨🇲",
        "Central African Republic": "🇨🇫",
        "Gabon": "🇬🇦",
        "Congo": "🇨🇬",
        "Democratic Republic of the Congo": "🇨🇩",
        "Angola": "🇦🇴",
        "Zambia": "🇿🇲",
        "Zimbabwe": "🇿🇼",
        "Botswana": "🇧🇼",
        "Namibia": "🇳🇦",
        "Lesotho": "🇱🇸",
        "Eswatini": "🇸🇿",
        "Madagascar": "🇲🇬",
        "Mauritius": "🇲🇺",
        "Seychelles": "🇸🇨",
        "Comoros": "🇰🇲",
        "Cape Verde": "🇨🇻",
        "Sao Tome and Principe": "🇸🇹",
        "Equatorial Guinea": "🇬🇶",
        "Rwanda": "🇷🇼",
        "Burundi": "🇧🇮",
        "Tanzania": "🇹🇿",
        "Uganda": "🇺🇬",
        "Malawi": "🇲🇼",
        "Mozambique": "🇲🇿",
        "Russia": "🇷🇺",
        "Belarus": "🇧🇾",
        "Moldova": "🇲🇩",
        "Georgia": "🇬🇪",
        "Armenia": "🇦🇲",
        "Azerbaijan": "🇦🇿",
        "Kazakhstan": "🇰🇿",
        "Uzbekistan": "🇺🇿",
        "Turkmenistan": "🇹🇲",
        "Kyrgyzstan": "🇰🇬",
        "Tajikistan": "🇹🇯",
        "Afghanistan": "🇦🇫",
        "Pakistan": "🇵🇰",
        "Nepal": "🇳🇵",
        "Bhutan": "🇧🇹",
        "Bangladesh": "🇧🇩",
        "Sri Lanka": "🇱🇰",
        "Maldives": "🇲🇻",
        "Myanmar": "🇲🇲",
        "Thailand": "🇹🇭",
        "Laos": "🇱🇦",
        "Cambodia": "🇰🇭",
        "Vietnam": "🇻🇳",
        "Malaysia": "🇲🇾",
        "Singapore": "🇸🇬",
        "Brunei": "🇧🇳",
        "Philippines": "🇵🇭",
        "Indonesia": "🇮🇩",
        "East Timor": "🇹🇱",
        "Papua New Guinea": "🇵🇬",
        "Fiji": "🇫🇯",
        "Vanuatu": "🇻🇺",
        "New Caledonia": "🇳🇨",
        "Solomon Islands": "🇸🇧",
        "Kiribati": "🇰🇮",
        "Tuvalu": "🇹🇻",
        "Nauru": "🇳🇷",
        "Palau": "🇵🇼",
        "Marshall Islands": "🇲🇭",
        "Micronesia": "🇫🇲",
        "Samoa": "🇼🇸",
        "Tonga": "🇹🇴",
        "Cook Islands": "🇨🇰",
        "Niue": "🇳🇺",
        "Tokelau": "🇹🇰",
        "Israel": "🇮🇱",
        "Palestine": "🇵🇸",
        "Jordan": "🇯🇴",
        "Lebanon": "🇱🇧",
        "Syria": "🇸🇾",
        "Iraq": "🇮🇶",
        "Iran": "🇮🇷",
        "Kuwait": "🇰🇼",
        "Saudi Arabia": "🇸🇦",
        "Yemen": "🇾🇪",
        "Oman": "🇴🇲",
        "United Arab Emirates": "🇦🇪",
        "Qatar": "🇶🇦",
        "Bahrain": "🇧🇭",
        "Turkey": "🇹🇷",
        "Albania": "🇦🇱",
        "North Macedonia": "🇲🇰",
        "Kosovo": "🇽🇰",
        "Serbia": "🇷🇸",
        "Montenegro": "🇲🇪",
        "Bosnia and Herzegovina": "🇧🇦",
        "Liechtenstein": "🇱🇮",
        "Monaco": "🇲🇨",
        "Andorra": "🇦🇩",
        "San Marino": "🇸🇲",
        "Vatican City": "🇻🇦"
      };
      return flagMap[countryName] || "🌍";
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
              {currentDemoQuestion.options.map((option) => {
                // For country question, show selected country with flag if "other" was selected
                let displayText = option.text;
                if (currentDemoQuestion.id === "country" && option.id === "other" && answers.country && answers.country !== "other") {
                  const flag = getCountryFlag(answers.country);
                  displayText = `${flag} ${answers.country}`;
                }
                
                return (
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
                        <p className="text-foreground flex-1">{displayText}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {/* Country Dropdown for "Other" selection */}
              {currentDemoQuestion.id === "country" && showCountryDropdown && (
                <div className="mt-4 p-4 border border-primary/20 rounded-lg bg-accent/30">
                  <h4 className="font-medium text-foreground mb-3">Please select your country:</h4>
                  <div className="max-h-60 overflow-y-auto space-y-2">
                    {countries.map((country) => (
                      <div
                        key={country}
                        className="p-2 hover:bg-primary/10 rounded cursor-pointer transition-colors"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className="text-foreground">{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              disabled={!currentDemoAnswer || (currentDemoAnswer === "other" && !answers.country)}
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
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What brings you here today?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're here to help you find the right support. Select all the areas that resonate with you - 
              there's no right or wrong answer. Your journey to healing is unique. 💙
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                Choose multiple options
              </span>
              <span className="flex items-center">
                <Shield className="w-4 h-4 text-blue-500 mr-1" />
                Completely confidential
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {problems.map((problem, index) => {
              const isSelected = selectedProblems.includes(problem.id);
              return (
                <Card 
                  key={problem.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group ${
                    isSelected 
                      ? 'ring-2 ring-primary bg-gradient-to-br from-primary/5 to-purple-500/5 shadow-lg' 
                      : 'hover:ring-2 hover:ring-primary/30 bg-white/80 backdrop-blur-sm'
                  }`}
                  onClick={() => handleProblemToggle(problem.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg scale-110' 
                          : 'bg-gradient-to-br from-accent to-accent/50 text-primary group-hover:scale-110'
                      }`}>
                        <div className="transition-transform duration-300 group-hover:rotate-12">
                          {problem.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg mb-2 transition-colors duration-300 ${
                          isSelected ? 'text-primary' : 'text-foreground'
                        }`}>
                          {problem.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {problem.description}
                        </p>
                      </div>
                      <div className={`transition-all duration-300 ${
                        isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                      }`}>
                        {isSelected && (
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center space-y-6">
            {selectedProblems.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">
                    {selectedProblems.length} area{selectedProblems.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <Button 
                onClick={() => setCurrentStep('questions')}
                disabled={selectedProblems.length === 0}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                Continue to Questions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <div>
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentStep('demographics')}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  ← Back to Demographics
                </Button>
              </div>
            </div>
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
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative group animate-pulse">
              <CheckCircle 
                className="w-10 h-10 text-white cursor-pointer hover:scale-110 transition-all duration-200 hover:rotate-12" 
                onClick={() => window.location.reload()}
              />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                ↻
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Click to restart
              </div>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Your Perfect Therapy Match
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6">
              Based on your unique needs and preferences, we've found the therapy approach that's right for you. 
              Your journey to healing starts here! ✨
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/20 text-primary font-semibold">
              {recommendation.type}
            </Badge>
          </div>

          <Card className="shadow-xl mb-12 bg-gradient-to-br from-white to-primary/5 border-primary/20">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-primary">
                {recommendation.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200/50">
                <p className="text-lg text-muted-foreground leading-relaxed text-center">
                  {recommendation.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span>Key Benefits</span>
                  </h3>
                  <ul className="space-y-3">
                    {recommendation.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3 group">
                        <div className="w-6 h-6 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <span>Suitable For</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.suitableFor.map((item, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-gradient-to-r from-primary/10 to-purple-600/10 border-primary/30 text-primary hover:bg-primary/20 transition-colors duration-200"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-8">
            <div className="bg-gradient-to-br from-white to-primary/5 rounded-2xl p-8 shadow-xl border border-primary/20">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Begin Your Healing Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Contact OLIP Therapy today to book your personalized {recommendation.type} session and take the first step towards positive change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                  onClick={handleContactUs}
                >
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-semibold border-primary/30 hover:bg-primary/5 transition-all duration-300" 
                  onClick={handleVisitWebsite}
                >
                  Visit Website
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep('problems')}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                ← Take Assessment Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}