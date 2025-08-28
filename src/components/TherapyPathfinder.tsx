import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Users, Brain, Heart, Shield, Lightbulb } from "lucide-react";
import { getWebsiteUrl, navigateToUrl } from "@/components/therapy/utils";
import { problems, therapyRecommendations, assessmentQuestions, questionSections } from "@/components/therapy/constants";
import type { TherapyRecommendation } from "@/types/therapy";

export default function TherapyPathfinder() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'problems' | 'questions' | 'results'>('problems');
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    
    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < assessmentQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        calculateRecommendation();
      }
    }, 300); // 300ms delay for smooth transition
  };

  const calculateRecommendation = () => {
    const therapyScores: Record<string, number> = {
      "CBT": 0,
      "Counselling": 0,
      "EMDR": 0,
      "Hypnotherapy": 0,
      "Couples Counselling": 0
    };

    // PRIORITY 1: Check for relationship problems FIRST - this should be definitive
    const hasRelationshipProblems = selectedProblems.includes('relationships');
    // Note: We removed the old relationship-specific questions, so we'll rely on problem selection and new questions
    const wantsToWorkTogether = false; // Will be determined by new questions if needed
    const wantsRelationshipGoal = false; // Will be determined by new questions if needed
    const relationshipTriggers = false; // Will be determined by new questions if needed
    const relationshipDynamics = 'good'; // Default value since old question was removed

    // CRITICAL: If they selected relationship problems, this should be the PRIMARY focus
    if (hasRelationshipProblems) {
      // Give MASSIVE boost for relationship problems
      therapyScores["Couples Counselling"] += 60; // Higher base score for relationships
      
      // Additional boosts for relationship-focused answers from new questions
      if (wantsToWorkTogether) {
        therapyScores["Couples Counselling"] += 35; // Working together is key
      }
      if (wantsRelationshipGoal) {
        therapyScores["Couples Counselling"] += 30;
      }
      if (relationshipTriggers) {
        therapyScores["Couples Counselling"] += 25;
      }
      
      // If they want to work together AND have relationship problems, this should be definitive
      if (wantsToWorkTogether) {
        therapyScores["Couples Counselling"] += 45; // Extra boost for explicit desire to work together
      }
    } else {
      // If they didn't select relationship problems, couples counselling should be very low priority
      therapyScores["Couples Counselling"] = 0;
    }

    // PRIORITY 2: Add scores from selected problems (reduced weight for other problems when relationship problems selected)
    selectedProblems.forEach(problemId => {
      const problemRec = therapyRecommendations[problemId];
      if (problemRec && problemId !== 'relationships') { // Skip relationships as we handled it above
        // If user selected relationship problems, heavily reduce other problem scores
        if (hasRelationshipProblems) {
          therapyScores[problemRec.type] += 3; // Very low weight for other problems when relationship problems selected
        } else {
          therapyScores[problemRec.type] += 10; // Standard weight for other problems
        }
      }
    });

    // PRIORITY 3: Enhanced scoring from the new 40 assessment questions
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = assessmentQuestions.find(q => q.id === questionId);
      const selectedOption = question?.options.find(o => o.id === answerId);
      if (selectedOption) {
        Object.entries(selectedOption.weight).forEach(([therapy, weight]) => {
          // Enhanced scoring logic for the new 40 questions
          if (hasRelationshipProblems && therapy !== "Couples Counselling") {
            // Reduce other therapy scores when relationship problems are selected
            therapyScores[therapy] += Math.floor(weight * 0.15); // 85% reduction for other therapies
          } else if (!hasRelationshipProblems) {
            // Normal scoring for non-relationship scenarios
            therapyScores[therapy] += Math.floor(weight * 0.8); // 20% reduction for general case
          }
        });
      }
    });

    // PRIORITY 4: Special logic for other therapies (heavily reduced when relationship problems selected)
    const boostMultiplier = hasRelationshipProblems ? 0.15 : 1; // 85% reduction for other therapies when relationship problems selected
    
    // Enhanced trauma detection using new questions
    const hasTraumaQuestions = answers.q24_experienced_trauma_affects === 'yes' || 
                              answers.q25_memories_feel_recent === 'yes' ||
                              answers.q26_triggers_sights_sounds_smells === 'yes' ||
                              answers.q27_nightmares_flashbacks === 'yes';
    
    if (hasTraumaQuestions) {
      therapyScores["EMDR"] += Math.floor(5 * boostMultiplier);
    }

    // Enhanced hypnotherapy detection using new questions
    const hasHypnoQuestions = answers.q10_like_retraining_subconscious === 'yes' ||
                             answers.q12_guided_relaxation_hypnosis_ok === 'yes' ||
                             answers.q13_change_habit === 'yes' ||
                             answers.q16_like_reset_automatic === 'yes' ||
                             answers.q17_subconscious_not_just_logic === 'yes';
    
    if (hasHypnoQuestions) {
      therapyScores["Hypnotherapy"] += Math.floor(5 * boostMultiplier);
    }

    // Enhanced counselling detection using new questions
    const hasCounsellingQuestions = answers.q18_weighed_down_sadness === 'yes' ||
                                   answers.q19_want_safe_space === 'yes' ||
                                   answers.q20_feel_misunderstood === 'yes' ||
                                   answers.q22_make_sense_talking === 'yes' ||
                                   answers.q23_value_long_term_support === 'yes';
    
    if (hasCounsellingQuestions) {
      therapyScores["Counselling"] += Math.floor(5 * boostMultiplier);
    }

    // Enhanced CBT detection using new questions
    const hasCBTQuestions = answers.q07_racing_thoughts_night === 'yes' ||
                           answers.q08_replay_events_mind === 'yes' ||
                           answers.q09_want_practical_tools === 'yes' ||
                           answers.q11_paralysed_what_if === 'yes' ||
                           answers.q30_like_practical_strategies_daily === 'yes' ||
                           answers.q32_spot_change_unhelpful_thinking === 'yes';
    
    if (hasCBTQuestions) {
      therapyScores["CBT"] += Math.floor(5 * boostMultiplier);
    }

    // Normalize scores to prevent any single factor from dominating
    Object.keys(therapyScores).forEach(therapy => {
      therapyScores[therapy] = Math.min(therapyScores[therapy], 120); // Increased cap to allow for higher scores
    });

    const recommendedTherapy = Object.entries(therapyScores).reduce((max, [therapy, score]) => 
      score > max.score ? { therapy, score } : max, 
      { therapy: "CBT", score: 0 }
    );

    // Enhanced debug logging
    console.log('Selected problems:', selectedProblems);
    console.log('Has relationship problems:', hasRelationshipProblems);
    console.log('Wants to work together:', wantsToWorkTogether);
    console.log('New question responses:', Object.entries(answers).filter(([key]) => key.startsWith('q')));
    console.log('Final therapy scores:', therapyScores);
    console.log('Recommended therapy:', recommendedTherapy);

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
      // Reload the entire app when going back from first assessment question
      window.location.reload();
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
      <div className="min-h-screen p-4">
        {/* Top Logo */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
          <div 
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="min-h-screen flex items-center justify-center pt-24">
          <Card className="max-w-2xl w-full shadow-card">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold text-foreground mb-4">
                Find Your Perfect Therapy Match
              </CardTitle>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Feeling overwhelmed by therapy options? Take our comprehensive 40-question assessment and discover 
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
                onClick={() => setCurrentStep('problems')}
                className="bg-primary hover:bg-primary/90 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Begin Here
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center space-x-4">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  40 questions
                </span>
                <span className="flex items-center">
                  <Shield className="w-4 h-4 text-blue-500 mr-1" />
                  Completely confidential
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }



  if (currentStep === 'problems') {
    return (
      <div className="min-h-screen p-4">
        {/* Top Logo */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
          <div 
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto pt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              What brings you here today?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              We're here to help you find the right support. Select all the areas that resonate with you - 
              there's no right or wrong answer. We'll then ask you detailed questions to find your perfect match. 💙
            </p>
            <div className="flex items:center justify-center space-x-4 mt-6 text-sm text-white/80">
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
                className="bg-primary hover:bg-primary/90 text-white px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none mb-12"
            >
              Continue to Questions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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
    
    // Get current section
    const currentSection = questionSections.find(section => 
      currentQuestionIndex >= section.start && currentQuestionIndex <= section.end
    );

    return (
      <div className="min-h-screen p-4">
        {/* Top Logo */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
          <div 
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto pt-24">
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

          {/* Section Header */}
          {currentSection && (
            <div className="mb-6 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 border border-primary/20 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-primary mb-1">
                  {currentSection.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentSection.description}
                </p>
              </div>
            </div>
          )}

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

          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={currentQuestionIndex > 0 ? prevQuestion : () => setCurrentStep('problems')}
              className="px-6 py-3"
            >
              Previous
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results' && recommendation) {
    return (
      <div className="min-h-screen p-4">
        {/* Top Logo */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
          <div 
            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all duration-200"
            onClick={() => window.location.reload()}
          >
            <Heart className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto pt-24">
          <div className="text-center mb-12">
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
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
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