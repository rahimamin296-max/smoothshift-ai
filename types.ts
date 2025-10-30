export interface Plan {
  name: string;
  price: string;
  annualPrice?: string;
  priceType?: 'monthly' | 'annually';
  audience: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
