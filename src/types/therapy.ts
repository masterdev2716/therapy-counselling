import type { ReactNode } from "react";

export interface Problem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  keywords: string[];
}

export interface TherapyRecommendation {
  type: string;
  title: string;
  description: string;
  benefits: string[];
  suitableFor: string[];
}

export interface AssessmentQuestionOption {
  id: string;
  text: string;
  weight: Record<string, number>;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: AssessmentQuestionOption[];
} 