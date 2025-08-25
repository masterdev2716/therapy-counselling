import { AssessmentQuestion, Problem, TherapyRecommendation } from "@/types/therapy";
import { ArrowRight, CheckCircle, Users, Brain, Heart, Shield, Lightbulb } from "lucide-react";
import React from "react";

export const problems: Problem[] = [
	{
		id: "anxiety-stress",
		title: "Anxiety & Stress",
		description: "Feeling overwhelmed, worried, or experiencing panic attacks",
		icon: <Shield className="w-6 h-6" />,
		keywords: ["anxiety", "stress", "panic", "worry", "overwhelmed", "nervous"],
	},
	{
		id: "depression-mood",
		title: "Depression & Low Mood",
		description: "Feeling sad, hopeless, or losing interest in activities",
		icon: <Heart className="w-6 h-6" />,
		keywords: ["depression", "sad", "hopeless", "low mood", "unmotivated"],
	},
	{
		id: "trauma-ptsd",
		title: "Trauma & PTSD",
		description: "Processing past traumatic experiences or difficult memories",
		icon: <Brain className="w-6 h-6" />,
		keywords: ["trauma", "ptsd", "flashbacks", "nightmares", "past events"],
	},
	{
		id: "relationships",
		title: "Relationship Issues",
		description: "Difficulties with partner, family, or communication problems",
		icon: <Users className="w-6 h-6" />,
		keywords: ["relationship", "couple", "marriage", "communication", "conflict"],
	},
	{
		id: "habits-phobias",
		title: "Habits & Phobias",
		description: "Breaking unwanted habits, overcoming fears or phobias",
		icon: <Lightbulb className="w-6 h-6" />,
		keywords: ["habits", "phobia", "fear", "smoking", "addiction", "compulsive"],
	},
	{
		id: "self-esteem",
		title: "Self-Esteem & Confidence",
		description: "Building confidence and improving self-worth",
		icon: <CheckCircle className="w-6 h-6" />,
		keywords: ["confidence", "self-esteem", "self-worth", "insecure"],
	},
];

export const therapyRecommendations: Record<string, TherapyRecommendation> = {
	"anxiety-stress": {
		type: "CBT",
		title: "Cognitive Behavioural Therapy (CBT)",
		description:
			"CBT is highly effective for anxiety and stress, helping you identify and change negative thought patterns that contribute to your symptoms.",
		benefits: [
			"Learn practical coping strategies",
			"Identify triggers and thought patterns",
			"Develop long-term management tools",
			"Evidence-based approach",
		],
		suitableFor: [
			"Anxiety disorders",
			"Stress management",
			"Panic attacks",
			"Social anxiety",
		],
	},
	"depression-mood": {
		type: "Counselling",
		title: "Counselling",
		description:
			"Talk therapy provides a safe space to explore your feelings and develop strategies to improve your mood and outlook on life.",
		benefits: [
			"Safe, non-judgmental environment",
			"Explore underlying causes",
			"Develop coping strategies",
			"Improve emotional regulation",
		],
		suitableFor: ["Depression", "Grief", "Life transitions", "Emotional difficulties"],
	},
	"trauma-ptsd": {
		type: "EMDR",
		title: "Eye Movement Desensitization and Reprocessing (EMDR)",
		description:
			"EMDR is specifically designed to help process traumatic memories and reduce their emotional impact on your daily life.",
		benefits: [
			"Process traumatic memories safely",
			"Reduce emotional charge of memories",
			"No need to discuss details extensively",
			"Proven effective for PTSD",
		],
		suitableFor: ["PTSD", "Trauma", "Disturbing memories", "Flashbacks"],
	},
	relationships: {
		type: "Couples Counselling",
		title: "Couples Counselling",
		description:
			"Work together with your partner to improve communication, resolve conflicts, and strengthen your relationship.",
		benefits: [
			"Improve communication skills",
			"Resolve ongoing conflicts",
			"Strengthen emotional connection",
			"Learn healthy relationship patterns",
		],
		suitableFor: [
			"Relationship conflicts",
			"Communication issues",
			"Trust problems",
			"Life transitions",
		],
	},
	"habits-phobias": {
		type: "Hypnotherapy",
		title: "Hypnotherapy",
		description:
			"Use the power of your subconscious mind to break unwanted habits and overcome phobias through deep relaxation and suggestion.",
		benefits: [
			"Access subconscious patterns",
			"Deep relaxation techniques",
			"Break automatic behaviors",
			"Overcome limiting beliefs",
		],
		suitableFor: [
			"Smoking cessation",
			"Weight management",
			"Phobias",
			"Unwanted habits",
		],
	},
	"self-esteem": {
		type: "CBT",
		title: "Cognitive Behavioural Therapy (CBT)",
		description:
			"CBT helps identify negative self-talk and limiting beliefs, replacing them with more balanced and positive thought patterns.",
		benefits: [
			"Challenge negative self-talk",
			"Build self-confidence",
			"Develop positive coping strategies",
			"Improve self-awareness",
		],
		suitableFor: [
			"Low self-esteem",
			"Confidence issues",
			"Self-criticism",
			"Social anxiety",
		],
	},
};

export const assessmentQuestions: AssessmentQuestion[] = [
	{
		id: "relationship_status",
		question: "What is your current relationship status?",
		options: [
			{ id: "single", text: "Single", weight: { CBT: 1, Counselling: 1, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "relationship", text: "In a relationship/married", weight: { CBT: 1, Counselling: 1, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 2 } },
			{ id: "complicated", text: "It's complicated", weight: { CBT: 1, Counselling: 1, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 3 } },
		],
	},
	{
		id: "severity",
		question: "How would you describe the impact of your concerns on your daily life?",
		options: [
			{ id: "mild", text: "Mild - Occasional difficulty, but I can usually manage", weight: { CBT: 2, Counselling: 3, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "moderate", text: "Moderate - Regular challenges that affect my work or relationships", weight: { CBT: 3, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 1 } },
			{ id: "severe", text: "Severe - Significant disruption to most areas of my life", weight: { CBT: 2, Counselling: 4, EMDR: 3, Hypnotherapy: 1, "Couples Counselling": 0 } },
		],
	},
	{
		id: "duration",
		question: "How long have you been experiencing these concerns?",
		options: [
			{ id: "recent", text: "Recent - A few weeks to a few months", weight: { CBT: 3, Counselling: 3, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 2 } },
			{ id: "ongoing", text: "Ongoing - Several months to a year", weight: { CBT: 3, Counselling: 2, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 2 } },
			{ id: "longterm", text: "Long-term - More than a year", weight: { CBT: 2, Counselling: 3, EMDR: 3, Hypnotherapy: 2, "Couples Counselling": 3 } },
		],
	},
	{
		id: "preference",
		question: "What type of approach appeals to you most?",
		options: [
			{ id: "talking", text: "Talking through my thoughts and feelings", weight: { CBT: 2, Counselling: 4, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "practical", text: "Learning practical techniques and strategies", weight: { CBT: 4, Counselling: 2, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 0 } },
			{ id: "body-mind", text: "Working with the mind-body connection", weight: { CBT: 1, Counselling: 1, EMDR: 4, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "together", text: "Working with my partner to improve our relationship", weight: { CBT: 1, Counselling: 1, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 4 } },
		],
	},
	{
		id: "past_trauma",
		question: "Do you have specific traumatic memories or past events that still affect you?",
		options: [
			{ id: "yes_specific", text: "Yes, specific traumatic events that I can identify", weight: { CBT: 1, Counselling: 2, EMDR: 4, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "yes_unclear", text: "Yes, but I'm not sure exactly what or when", weight: { CBT: 2, Counselling: 3, EMDR: 3, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No, my concerns are not related to past trauma", weight: { CBT: 3, Counselling: 2, EMDR: 1, Hypnotherapy: 3, "Couples Counselling": 0 } },
		],
	},
	{
		id: "thinking_patterns",
		question: "How would you describe your thinking patterns?",
		options: [
			{ id: "overthinking", text: "I tend to overthink and get stuck in negative thought loops", weight: { CBT: 4, Counselling: 2, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "emotional", text: "I'm very emotional and feel things deeply", weight: { CBT: 2, Counselling: 4, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 0 } },
			{ id: "avoidant", text: "I tend to avoid thinking about difficult things", weight: { CBT: 3, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "analytical", text: "I like to analyze and understand things logically", weight: { CBT: 4, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
		],
	},
	{
		id: "physical_symptoms",
		question: "Do you experience physical symptoms related to your emotional state?",
		options: [
			{ id: "yes_often", text: "Yes, often - tension, headaches, stomach issues", weight: { CBT: 2, Counselling: 2, EMDR: 3, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "yes_sometimes", text: "Yes, sometimes when very stressed", weight: { CBT: 3, Counselling: 2, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 0 } },
			{ id: "no", text: "No, my issues are purely emotional/mental", weight: { CBT: 3, Counselling: 3, EMDR: 2, Hypnotherapy: 1, "Couples Counselling": 0 } },
		],
	},
	{
		id: "coping_mechanisms",
		question: "What do you currently do to cope with difficult emotions?",
		options: [
			{ id: "avoidance", text: "I try to avoid or distract myself", weight: { CBT: 4, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "talking", text: "I talk to friends or family", weight: { CBT: 2, Counselling: 4, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "exercise", text: "I exercise or do physical activities", weight: { CBT: 3, Counselling: 2, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 0 } },
			{ id: "nothing", text: "I don't have effective coping strategies", weight: { CBT: 4, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
		],
	},
	{
		id: "relationship_dynamics",
		question: "How would you describe your current relationship dynamics?",
		options: [
			{ id: "conflict", text: "We have frequent arguments and conflicts", weight: { CBT: 2, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 4 } },
			{ id: "communication", text: "We struggle to communicate effectively", weight: { CBT: 2, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 4 } },
			{ id: "distance", text: "We feel emotionally distant from each other", weight: { CBT: 2, Counselling: 3, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 4 } },
			{ id: "good", text: "Our relationship is generally good", weight: { CBT: 3, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 1 } },
		],
	},
	{
		id: "therapy_goals",
		question: "What is your primary goal for therapy?",
		options: [
			{ id: "symptoms", text: "Reduce specific symptoms (anxiety, depression, etc.)", weight: { CBT: 4, Counselling: 3, EMDR: 3, Hypnotherapy: 3, "Couples Counselling": 0 } },
			{ id: "understanding", text: "Better understand myself and my patterns", weight: { CBT: 3, Counselling: 4, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "relationship", text: "Improve my relationship with my partner", weight: { CBT: 1, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 4 } },
			{ id: "change", text: "Make lasting behavioral changes", weight: { CBT: 4, Counselling: 2, EMDR: 2, Hypnotherapy: 4, "Couples Counselling": 0 } },
		],
	},
	{
		id: "past_therapy",
		question: "What was your experience with previous therapy?",
		options: [
			{ id: "helpful_cbt", text: "CBT was helpful but I need more", weight: { CBT: 4, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "helpful_talk", text: "Talk therapy was helpful but I need more", weight: { CBT: 2, Counselling: 4, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "not_helpful", text: "Previous therapy wasn't very helpful", weight: { CBT: 2, Counselling: 2, EMDR: 3, Hypnotherapy: 3, "Couples Counselling": 0 } },
			{ id: "none", text: "I haven't had therapy before", weight: { CBT: 3, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
		],
	},
	{
		id: "stress_triggers",
		question: "What typically triggers your stress or difficult emotions?",
		options: [
			{ id: "thoughts", text: "My own thoughts and worries", weight: { CBT: 4, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "relationships", text: "Relationship conflicts or misunderstandings", weight: { CBT: 2, Counselling: 3, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 4 } },
			{ id: "memories", text: "Past memories or traumatic events", weight: { CBT: 2, Counselling: 3, EMDR: 4, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "situations", text: "Specific situations or environments", weight: { CBT: 3, Counselling: 2, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 0 } },
		],
	},
	{
		id: "learning_style",
		question: "How do you prefer to learn new skills?",
		options: [
			{ id: "practical", text: "Through practical exercises and homework", weight: { CBT: 4, Counselling: 2, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "discussion", text: "Through discussion and exploration", weight: { CBT: 2, Counselling: 4, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "experience", text: "Through direct experience and practice", weight: { CBT: 3, Counselling: 2, EMDR: 3, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "visual", text: "Through visual aids and demonstrations", weight: { CBT: 3, Counselling: 2, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 0 } },
		],
	},
	{
		id: "emotional_regulation",
		question: "How do you typically handle intense emotions?",
		options: [
			{ id: "suppress", text: "I try to suppress or control them", weight: { CBT: 4, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "express", text: "I express them openly to others", weight: { CBT: 2, Counselling: 4, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "avoid", text: "I try to avoid feeling them", weight: { CBT: 3, Counselling: 3, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 0 } },
			{ id: "overwhelmed", text: "I get overwhelmed and can't function", weight: { CBT: 3, Counselling: 4, EMDR: 3, Hypnotherapy: 2, "Couples Counselling": 0 } },
		],
	},
	{
		id: "social_support",
		question: "How comfortable are you with group or social settings?",
		options: [
			{ id: "very_uncomfortable", text: "Very uncomfortable - I avoid social situations", weight: { CBT: 4, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "somewhat_uncomfortable", text: "Somewhat uncomfortable but I can manage", weight: { CBT: 3, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "comfortable", text: "Generally comfortable in social settings", weight: { CBT: 2, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "very_comfortable", text: "Very comfortable - I'm quite social", weight: { CBT: 2, Counselling: 3, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
		],
	},
	{
		id: "change_readiness",
		question: "How ready do you feel to make changes in your life?",
		options: [
			{ id: "very_ready", text: "Very ready - I'm motivated and committed", weight: { CBT: 4, Counselling: 3, EMDR: 3, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "somewhat_ready", text: "Somewhat ready - I want change but feel uncertain", weight: { CBT: 3, Counselling: 3, EMDR: 2, Hypnotherapy: 3, "Couples Counselling": 0 } },
			{ id: "not_ready", text: "Not very ready - I'm still figuring things out", weight: { CBT: 2, Counselling: 4, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "resistant", text: "I'm resistant to change - I want to understand first", weight: { CBT: 2, Counselling: 4, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
		],
	},
];

export const demographicsQuestions = [
	{
		id: "gender",
		question: "What is your gender identity?",
		options: [
			{ id: "woman", text: "Woman" },
			{ id: "man", text: "Man" },
			{ id: "prefer-not-to-say", text: "Prefer not to say" },
		],
	},
	{
		id: "therapy_experience",
		question: "Have you had therapy or counselling before?",
		options: [
			{ id: "never", text: "No, this would be my first time" },
			{ id: "some", text: "Yes, I've had some experience" },
			{ id: "extensive", text: "Yes, I've had extensive therapy" },
		],
	},
	{
		id: "support_system",
		question: "How would you describe your current support system?",
		options: [
			{ id: "strong", text: "Strong - I have family, friends, or community support" },
			{ id: "moderate", text: "Moderate - Some support, but could be better" },
			{ id: "limited", text: "Limited - I feel quite isolated" },
		],
	},
	{
		id: "life_changes",
		question: "Are you currently going through any major life changes?",
		options: [
			{ id: "yes_major", text: "Yes, major changes (job, relationship, loss, etc.)" },
			{ id: "yes_minor", text: "Yes, some smaller changes" },
			{ id: "no", text: "No, things are relatively stable" },
		],
	},
	{
		id: "cultural_background",
		question: "How important is cultural sensitivity in your therapy?",
		options: [
			{ id: "very_important", text: "Very important - I need someone who understands my background" },
			{ id: "somewhat_important", text: "Somewhat important - It would be helpful" },
			{ id: "not_important", text: "Not important - I'm flexible" },
		],
	},
	{
		id: "accessibility_needs",
		question: "Do you have any accessibility needs for therapy?",
		options: [
			{ id: "none", text: "No accessibility needs" },
			{ id: "physical", text: "Physical accessibility needs" },
			{ id: "sensory", text: "Sensory accessibility needs" },
			{ id: "cognitive", text: "Cognitive accessibility needs" },
		],
	},
	{
		id: "financial_considerations",
		question: "How important are financial considerations in choosing therapy?",
		options: [
			{ id: "very_important", text: "Very important - I need affordable options" },
			{ id: "somewhat_important", text: "Somewhat important - I have a budget" },
			{ id: "not_important", text: "Not important - I can afford what I need" },
		],
	},
]; 