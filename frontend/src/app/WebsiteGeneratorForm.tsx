import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wand2, Sparkles, Globe, Palette, Type, Languages, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateWebsiteHTML } from '@/lib/api/api';
import GrapesJSEditor from './GrapesJSEditor';

interface WebsitePrompt {
  purpose: string;
  sections: string[];
  colorScheme: string;
  fontStyle: string;
  language: string;
  additionalInfo: string;
}

const predefinedSections = [
  'Hero', 'About', 'Services', 'Portfolio', 'Testimonials', 'Pricing', 
  'FAQ', 'Contact', 'Footer', 'Blog', 'Team', 'Curriculum', 'Features'
];

const colorSchemes = [
  'Modern Blue & White', 'Elegant Purple & Gold', 'Minimalist Black & White',
  'Vibrant Orange & Blue', 'Professional Green & Gray', 'Creative Pink & Purple',
  'Tech Dark Theme', 'Warm Earth Tones', 'Ocean Blue & Teal', 'Sunset Orange & Red'
];

const fontStyles = [
  'Modern Sans-serif', 'Classic Serif', 'Elegant Script', 'Tech Monospace',
  'Friendly Rounded', 'Bold Display', 'Clean Minimal', 'Professional Corporate'
];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
  'Dutch', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic'
];

export function WebsiteGeneratorForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<WebsitePrompt>({
    purpose: '',
    sections: [],
    colorScheme: '',
    fontStyle: '',
    language: 'English',
    additionalInfo: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('')
  const [generatedCss, setGeneratedCss] = useState('')
  const [showEditor, setShowEditor] = useState(false)
  const handleSectionToggle = (section: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };


const handleGenerate = async () => {
  if (!formData.purpose.trim()) {
    toast({
      title: "Missing Information",
      description: "Please provide the website purpose.",
      variant: "destructive"
    });
    return;
  }

  if (formData.sections.length === 0) {
    toast({
      title: "Missing Sections",
      description: "Please select at least one section for your website.",
      variant: "destructive"
    });
    return;
  }

  setIsGenerating(true);

  try {
    const prompt = `
Website Purpose: ${formData.purpose}

Sections to include:
${formData.sections.map(section => `- ${section}`).join('\n')}

Design Preferences:
- Color Scheme: ${formData.colorScheme || 'Modern and professional'}
- Font Style: ${formData.fontStyle || 'Clean and readable'}
- Language: ${formData.language}

Additional Information:
${formData.additionalInfo || 'No additional requirements specified.'}

Please generate a complete, responsive website with modern design principles.
    `.trim();

    const result = await generateWebsiteHTML(prompt);
    console.log('This isthe responce form backeid : result')
    toast({
      title: "Website Generated Successfully!",
      description: "Your website has been created based on your specifications.",
    });

    const html = extractSection(result, 'HTML')
    const css = extractSection(result, 'CSS')
    setGeneratedHtml(html)
    setGeneratedCss(css)
    setShowEditor(true)
    console.log('Generated website:', result);
  } catch (error) {
    toast({
      title: "Generation Failed",
      description: "There was an error generating your website. Please try again.",
      variant: "destructive"
    });
    console.error('Error:', error);
  } finally {
    setIsGenerating(false);
  }
  };
  
  function extractSection(text: string, label: string): string {
    const regex = new RegExp(`\\b${label}:\\s*\`\`\`(?:\\w+)?\\n([\\s\\S]*?)\`\`\``, 'i');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  }


  return (
    <>
      {showEditor ? (
        <GrapesJSEditor
          html={generatedHtml}
          css={generatedCss}
          onBack={() => setShowEditor(false)}
        />
      ) : (  
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow">
              <Wand2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Website Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning websites with AI. Just describe what you need, and we'll build it for you.
          </p>
        </div>

        <Card className="shadow-premium border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Describe Your Perfect Website
            </CardTitle>
            <CardDescription className="text-base">
              Fill in the details below to generate your custom website
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Website Purpose */}
            <div className="space-y-3">
              <Label htmlFor="purpose" className="text-lg font-semibold flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Website Purpose
              </Label>
              <Input
                id="purpose"
                placeholder="e.g., Online course selling platform, Portfolio website, Business landing page..."
                value={formData.purpose}
                onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                className="text-base h-12 border-0 bg-background/60 shadow-card"
              />
            </div>

            {/* Sections */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Website Sections</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {predefinedSections.map((section) => (
                  <Badge
                    key={section}
                    variant={formData.sections.includes(section) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-sm justify-center transition-all duration-200 hover:scale-105 ${
                      formData.sections.includes(section)
                        ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => handleSectionToggle(section)}
                  >
                    {section}
                    {formData.sections.includes(section) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Design Preferences */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Color Scheme
                </Label>
                <Select value={formData.colorScheme} onValueChange={(value) => setFormData(prev => ({ ...prev, colorScheme: value }))}>
                  <SelectTrigger className="h-12 border-0 bg-background/60 shadow-card">
                    <SelectValue placeholder="Choose a color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorSchemes.map((scheme) => (
                      <SelectItem key={scheme} value={scheme}>{scheme}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Type className="h-5 w-5 text-primary" />
                  Font Style
                </Label>
                <Select value={formData.fontStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, fontStyle: value }))}>
                  <SelectTrigger className="h-12 border-0 bg-background/60 shadow-card">
                    <SelectValue placeholder="Choose a font style" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontStyles.map((font) => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Languages className="h-5 w-5 text-primary" />
                Language
              </Label>
              <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                <SelectTrigger className="h-12 border-0 bg-background/60 shadow-card w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional Information */}
            <div className="space-y-3">
              <Label htmlFor="additional" className="text-lg font-semibold">
                Additional Requirements (Optional)
              </Label>
              <Textarea
                id="additional"
                placeholder="Any specific features, content, or design elements you'd like to include..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                className="min-h-24 border-0 bg-background/60 shadow-card resize-none"
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-12 py-6 text-lg font-semibold shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-3"></div>
                    Generating Website...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 mr-3" />
                    Generate My Website
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    )}
    </>
  );
}