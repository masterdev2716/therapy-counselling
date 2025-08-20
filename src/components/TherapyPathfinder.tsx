import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Brain, Heart, Shield, Lightbulb } from "lucide-react";
import { getWebsiteUrl, getCountryFlag, navigateToUrl } from "@/components/therapy/utils";
import { problems, therapyRecommendations, assessmentQuestions, demographicsQuestions } from "@/components/therapy/constants";
import { countries } from "@/components/therapy/countries";
import type { TherapyRecommendation } from "@/types/therapy";

export default function TherapyPathfinder() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'demographics' | 'problems' | 'questions' | 'results'>('welcome');
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendation, setRecommendation] = useState<TherapyRecommendation | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

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

  const calculateRecommendation = () => {
    const therapyScores: Record<string, number> = {
      "CBT": 0,
      "Counselling": 0,
      "EMDR": 0,
      "Hypnotherapy": 0,
      "Couples Counselling": 0
    };

    selectedProblems.forEach(problemId => {
      const problemRec = therapyRecommendations[problemId];
      if (problemRec) {
        therapyScores[problemRec.type] += 3;
      }
    });

    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = assessmentQuestions.find(q => q.id === questionId);
      const selectedOption = question?.options.find(o => o.id === answerId);
      if (selectedOption) {
        Object.entries(selectedOption.weight).forEach(([therapy, weight]) => {
          therapyScores[therapy] += weight;
        });
      }
    });

    const relationshipStatus = answers.relationship_status;
    const wantsToWorkTogether = answers.preference === 'together';
    const hasRelationshipProblems = selectedProblems.includes('relationships');
    if (!hasRelationshipProblems && (relationshipStatus === 'single' || !wantsToWorkTogether)) {
      therapyScores["Couples Counselling"] = 0;
    }

    const recommendedTherapy = Object.entries(therapyScores).reduce((max, [therapy, score]) => 
      score > max.score ? { therapy, score } : max, 
      { therapy: "CBT", score: 0 }
    );

    const rec = Object.values(therapyRecommendations).find(r => r.type === recommendedTherapy.therapy);
    if (rec) {
      setRecommendation(rec);
      setCurrentStep('results');
    }
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

  const handleVisitWebsite = () => {
    if (recommendation) {
      const url = getWebsiteUrl(recommendation.type);
      navigateToUrl(url);
    }
  };

  const handleContactUs = () => {
    const url = "https://www.oliptherapy.co.uk/contact";
    navigateToUrl(url);
  };

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
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-card/60 backdrop-blur-sm hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <Users className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">Counselling</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Talk Therapy</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-card/60 backdrop-blur-sm hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <Heart className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">Couples Therapy</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Relationship Healing</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-card/60 backdrop-blur-sm hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <Brain className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">EMDR</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Trauma Processing</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-card/60 backdrop-blur-sm hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <Lightbulb className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary">Hypnotherapy</span>
                <span className="text-xs text-muted-foreground text-center mt-1">Subconscious Healing</span>
              </div>
              <div className="flex flex-col items-center p-4 border-2 border-primary/30 rounded-xl bg-card/60 backdrop-blur-sm hover:border-primary hover:shadow-lg transition-all duration-300 group">
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
            <div className="flex items:center justify-center space-x-4 mt-6 text-sm text-muted-foreground">
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
                      : 'hover:ring-2 hover:ring-primary/30 bg-card/80 backdrop-blur-sm'
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
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-300 font-medium">
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

          <Card className="shadow-xl mb-12 bg-gradient-to-br from-card to-primary/5 border-primary/20">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-primary">
                {recommendation.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-xl p-6 border border-primary/20">
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
            <div className="bg-gradient-to-br from-card to-primary/5 rounded-2xl p-8 shadow-xl border border-primary/20">
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