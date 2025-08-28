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

// Section mapping for the 40 questions
export const questionSections = [
  { start: 0, end: 5, title: "General Wellbeing & Motivation", description: "Understanding your current situation and readiness for change" },
  { start: 6, end: 11, title: "Stress, Worry & Overthinking", description: "Exploring patterns of anxiety and cognitive processes" },
  { start: 12, end: 16, title: "Habits & Behaviour Change", description: "Identifying areas where you want to make lasting changes" },
  { start: 17, end: 22, title: "Exploring Feelings & Relationships", description: "Understanding emotional patterns and interpersonal dynamics" },
  { start: 23, end: 28, title: "Trauma & Past Experiences", description: "Addressing difficult memories and their current impact" },
  { start: 29, end: 33, title: "Coping Tools & Structure", description: "Finding practical approaches that work for you" },
  { start: 34, end: 39, title: "Personal Preferences & Style", description: "Determining your preferred therapy approach" }
];

export const assessmentQuestions: AssessmentQuestion[] = [
	{
		id: "q01_general_not_working",
		question: "Do you feel something in your life isn’t working right now, and you’re not sure how to fix it?",
		options: [
			{ id: "yes", text: "Yes — this is a current concern and I want help", weight: { CBT: 2, Counselling: 3, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes — it affects me at times but not constantly", weight: { CBT: 1, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No — this doesn’t feel like an issue for me right now", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q02_feel_stuck_patterns",
		question: "Do you sometimes feel “stuck” in repeating the same patterns?",
		options: [
			{ id: "yes", text: "Yes — I often feel stuck in repeating patterns", weight: { CBT: 3, Counselling: 3, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes — I notice this occasionally or in certain areas", weight: { CBT: 2, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No — I don’t feel stuck in patterns", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q03_more_control_thoughts_emotions",
		question: "Do you wish you had more control over your thoughts or emotions?",
		options: [
			{ id: "yes", text: "Yes — I frequently want more control over thoughts/emotions", weight: { CBT: 3, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes — it comes up at times, not always", weight: { CBT: 2, Counselling: 1, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No — I generally feel in control", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q04_confidence_dipped",
		question: "Have you noticed your confidence has dipped in recent months?",
		options: [
			{ id: "yes", text: "Yes — I’ve clearly noticed a drop in confidence recently", weight: { CBT: 2, Counselling: 3, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes — some ups and downs with confidence", weight: { CBT: 1, Counselling: 2, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No — I haven’t noticed a dip", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q05_avoid_due_to_worry",
		question: "Do you find yourself avoiding situations because of worry or stress?",
		options: [
			{ id: "yes", text: "Yes — I regularly avoid things due to worry/stress", weight: { CBT: 3, Counselling: 2, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes — I occasionally avoid certain things", weight: { CBT: 2, Counselling: 1, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No — I don’t avoid situations because of worry", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q06_want_change_not_sure_start",
		question: "Are you looking for change but not sure where to start?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 2, Counselling: 3, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 1, Counselling: 2, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	// Section 2: Stress, Worry & Overthinking (CBT/Hypnotherapy)
	{
		id: "q07_racing_thoughts_night",
		question: "Do racing thoughts keep you awake at night?",
		options: [
			{ id: "yes", text: "Yes — this regularly disrupts my sleep", weight: { CBT: 4, Counselling: 1, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes — it happens occasionally", weight: { CBT: 2, Counselling: 1, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No — this doesn’t affect my sleep", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q08_replay_events_mind",
		question: "Do you replay conversations or events over and over in your mind?",
		options: [
			{ id: "yes", text: "Yes — this happens a lot and is hard to switch off", weight: { CBT: 4, Counselling: 1, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes — I dwell on things now and then", weight: { CBT: 2, Counselling: 1, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No — I generally move on from events", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q09_want_practical_tools",
		question: "Do you want practical tools to calm anxiety and challenge unhelpful thoughts?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 4, Counselling: 1, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 2, Counselling: 1, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q10_like_retraining_subconscious",
		question: "Do you like the idea of gently retraining your subconscious to feel calmer?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 1, Counselling: 0, EMDR: 1, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 0, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q11_paralysed_what_if",
		question: "Do you sometimes feel paralysed by “what if” thinking?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 4, Counselling: 1, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 2, Counselling: 1, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q12_guided_relaxation_hypnosis_ok",
		question: "Would guided relaxation or hypnosis feel comfortable to you?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 1, EMDR: 1, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 1, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	// Section 3: Habits & Behaviour Change (Hypnotherapy)
	{
		id: "q13_change_habit",
		question: "Do you want to change a habit such as smoking, overeating, or nail biting?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 1, Counselling: 0, EMDR: 0, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q14_tried_change_slipped_back",
		question: "Have you tried to change habits before but slipped back into old patterns?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 2, Counselling: 0, EMDR: 0, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 1, Counselling: 0, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q15_willpower_not_enough",
		question: "Do you feel your willpower isn’t always enough on its own?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 1, Counselling: 1, EMDR: 0, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 0, Counselling: 1, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q16_like_reset_automatic",
		question: "Do you like the idea of “resetting” your automatic behaviours?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 1, Counselling: 0, EMDR: 0, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q17_subconscious_not_just_logic",
		question: "Would it help to work with your subconscious mind rather than just logic?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 1, EMDR: 1, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 1, EMDR: 1, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	// Section 4: Exploring Feelings & Relationships (Counselling)
	{
		id: "q18_weighed_down_sadness",
		question: "Do you sometimes feel weighed down by sadness or unresolved issues?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 1, Counselling: 4, EMDR: 1, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 1, Counselling: 2, EMDR: 1, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q19_want_safe_space",
		question: "Do you want a safe, non-judgemental space to talk things through?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 4, EMDR: 1, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q20_feel_misunderstood",
		question: "Do you often feel misunderstood by those close to you?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 1, Counselling: 4, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q21_explore_reactions_relationships",
		question: "Do you want to explore why you react the way you do in relationships?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 4, EMDR: 1, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 2, EMDR: 1, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q22_make_sense_talking",
		question: "Do you find it easier to make sense of things when you talk them out loud?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 1, Counselling: 4, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q23_value_long_term_support",
		question: "Would you value long-term emotional support rather than quick fixes?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 4, EMDR: 1, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 1, Counselling: 0, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
		],
	},
	// Section 5: Trauma & Past Experiences (EMDR/Counselling)
	{
		id: "q24_experienced_trauma_affects",
		question: "Have you experienced a difficult or traumatic event that still affects you?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 2, EMDR: 4, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 1, EMDR: 2, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q25_memories_feel_recent",
		question: "Do painful memories sometimes come back as if they only happened yesterday?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 1, EMDR: 4, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 0, Counselling: 1, EMDR: 2, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q26_triggers_sights_sounds_smells",
		question: "Do certain sights, sounds, or smells trigger distressing feelings?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 1, EMDR: 4, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 0, Counselling: 1, EMDR: 2, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q27_nightmares_flashbacks",
		question: "Do you have nightmares or flashbacks about past experiences?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 1, EMDR: 4, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 0, Counselling: 1, EMDR: 2, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q28_reduce_emotional_charge",
		question: "Do you want to reduce the “emotional charge” around old memories?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 1, Counselling: 2, EMDR: 4, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 1, EMDR: 2, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q29_prefer_not_talk_detail",
		question: "Would you prefer a therapy that doesn’t require you to talk in detail about trauma?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 1, EMDR: 4, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 1, EMDR: 2, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	// Section 6: Coping Tools & Structure (CBT)
	{
		id: "q30_like_practical_strategies_daily",
		question: "Do you like the idea of learning practical strategies to use every day?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 4, Counselling: 1, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 2, Counselling: 1, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q31_enjoy_structured_sessions",
		question: "Do you enjoy structured sessions with steps, goals, or homework?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 4, Counselling: 0, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 2, Counselling: 0, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q32_spot_change_unhelpful_thinking",
		question: "Do you want to spot and change unhelpful thinking patterns?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 4, Counselling: 1, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 2, Counselling: 1, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q33_like_coaching_clear_results",
		question: "Would you like therapy to feel more like coaching with clear results?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 4, Counselling: 0, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 2, Counselling: 0, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q34_focus_present_future",
		question: "Do you prefer focusing on the present and future rather than the past?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 4, Counselling: 1, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Sometimes", weight: { CBT: 2, Counselling: 1, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 2, EMDR: 1, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	// Section 7: Personal Preferences & Style
	{
		id: "q35_prefer_relaxed_guided",
		question: "Do you prefer a relaxed, guided style of therapy (e.g., hypnosis, deep relaxation)?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 2, EMDR: 1, Hypnotherapy: 4, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 1, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 2, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q36_prefer_structured_problem_solving",
		question: "Do you prefer a structured, problem-solving style (worksheets, strategies)?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 4, Counselling: 0, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 2, Counselling: 0, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q37_prefer_open_conversation",
		question: "Do you prefer open conversation where you set the pace?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 0, Counselling: 4, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 0, Counselling: 2, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 2, Counselling: 0, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q38_talking_doing_mix",
		question: "Do you want therapy that’s mainly talking, mainly doing, or a mix of both?",
		options: [
			{ id: "talking", text: "Mostly talking — conversation-led sessions (counselling style)", weight: { CBT: 1, Counselling: 4, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
			{ id: "doing", text: "Mostly doing — practical tools, strategies, exercises (CBT style)", weight: { CBT: 4, Counselling: 0, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "mix", text: "A mix of both — balance conversation and practical strategies", weight: { CBT: 2, Counselling: 2, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q39_short_term_or_long_term",
		question: "Do you want short-term focused help, or longer-term support?",
		options: [
			{ id: "yes", text: "Yes (short-term)", weight: { CBT: 3, Counselling: 0, EMDR: 0, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe / not sure", weight: { CBT: 1, Counselling: 1, EMDR: 0, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No (prefer longer-term)", weight: { CBT: 0, Counselling: 3, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
		],
	},
	{
		id: "q40_combine_approaches",
		question: "Do you believe combining approaches (e.g., hypnotherapy + CBT, counselling + EMDR) could work best for you?",
		options: [
			{ id: "yes", text: "Yes", weight: { CBT: 2, Counselling: 2, EMDR: 2, Hypnotherapy: 2, "Couples Counselling": 0 } },
			{ id: "maybe", text: "Maybe", weight: { CBT: 1, Counselling: 1, EMDR: 1, Hypnotherapy: 1, "Couples Counselling": 0 } },
			{ id: "no", text: "No", weight: { CBT: 0, Counselling: 0, EMDR: 0, Hypnotherapy: 0, "Couples Counselling": 0 } },
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