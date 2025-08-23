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
]; 