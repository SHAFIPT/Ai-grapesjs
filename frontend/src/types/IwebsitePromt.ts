export interface WebsitePrompt {
  purpose: string;
  sections: string[];
  colorScheme: string;
  fontStyle: string;
  language: string;
  additionalInfo: string;
}

export interface EnhancedWebsiteGeneratorProps {
  onBack: () => void;
}
