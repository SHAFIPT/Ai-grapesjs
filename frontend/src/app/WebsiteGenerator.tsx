import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Wand2, 
  Sparkles, 
  Globe, 
  Palette, 
  Type, 
  Languages, 
  X, 
  ArrowLeft,
  Brain,
  Zap,
  Code2,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateWebsiteHTML } from '@/lib/api/api';
import GrapesJSEditor from './GrapesJSEditor';
import { colorSchemes, fontStyles, languages, predefinedSections } from '@/constants/data';
import type { EnhancedWebsiteGeneratorProps, WebsitePrompt } from '@/types/IwebsitePromt';

export function WebsiteGenerator({ onBack }: EnhancedWebsiteGeneratorProps) {
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
  const [currentStep, setCurrentStep] = useState(1);
  const [generatedHtml, setGeneratedHtml] = useState('')
  const [generatedCss, setGeneratedCss] = useState('')
  const [generatedJs, setGeneratedJs] = useState('')
  const [showEditor, setShowEditor] = useState(false)

  const handleSectionToggle = (section: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
    }));
  };

  const isStep1Valid = () => {
    return formData.purpose.trim().length > 0;
  };

  const isStep2Valid = () => {
    return formData.sections.length >= 3;
  };

  const isStep3Valid = () => {
    return formData.colorScheme !== '' && formData.fontStyle !== '' && formData.language !== '';
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return isStep3Valid();
      case 4:
        return true; 
      default:
        return false;
    }
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
      
      toast({
        title: "Website Generated Successfully!",
        description: "Your website has been created based on your specifications.",
      });
      const html = extractSection(result, 'HTML')
      const css = extractSection(result, 'CSS')
      const js = extractSection(result, 'JavaScript')
      setGeneratedHtml(html)
      setGeneratedCss(css)
      setGeneratedJs(js) 
      setShowEditor(true)
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

  const nextStep = () => {
    if (currentStep < 4 && isCurrentStepValid()) {
      setCurrentStep(currentStep + 1);
    } else if (!isCurrentStepValid()) {
      // Show validation message
      let message = '';
      switch (currentStep) {
        case 1:
          message = 'Please enter your website purpose to continue.';
          break;
        case 2:
          message = 'Please select at least 3 sections to continue.';
          break;
        case 3:
          message = 'Please select color scheme, font style, and language to continue.';
          break;
      }
      toast({
        title: "Incomplete Step",
        description: message,
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getStepProgress = () => (currentStep / 4) * 100;

  return (
    <>
    {showEditor ? (
        <GrapesJSEditor
          html={generatedHtml}
          css={generatedCss}
          js={generatedJs}
          onBack={() => setShowEditor(false)}
        />
      ) : ( 
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="glass-effect hover:bg-accent/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-primary rounded-full animate-pulse-glow"></div>
            <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-primary transition-all duration-500 ease-out"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Header Content */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow">
              <Brain className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            AI Website Generator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tell us about your vision and watch as our AI creates a stunning website tailored just for you
          </p>
        </div>

        {/* Main Form Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="premium-card border-0 animate-scale-in">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-ai-purple animate-bounce-slow" />
                <CardTitle className="text-3xl gradient-text-secondary">
                  {currentStep === 1 && "What's Your Website About?"}
                  {currentStep === 2 && "Choose Your Sections"}
                  {currentStep === 3 && "Design Preferences"}
                  {currentStep === 4 && "Final Details"}
                </CardTitle>
                <Sparkles className="h-6 w-6 text-ai-cyan animate-bounce-slow" />
              </div>
              <CardDescription className="text-lg">
                {currentStep === 1 && "Tell us about your website's purpose and goals"}
                {currentStep === 2 && "Select at least 3 sections you want to include"}
                {currentStep === 3 && "Customize the look and feel"}
                {currentStep === 4 && "Add any additional requirements"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 px-8 pb-8">
              {/* Step 1: Purpose */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-slide-up">
                  <div className="space-y-4">
                    <Label htmlFor="purpose" className="text-xl font-semibold flex items-center gap-3">
                      <Globe className="h-6 w-6 text-ai-blue" />
                      Website Purpose *
                    </Label>
                    <Input
                      id="purpose"
                      placeholder="e.g., Online course selling platform, Portfolio website, Business landing page..."
                      value={formData.purpose}
                      onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
                      className={`text-lg h-14 border-2 bg-background/60 shadow-card transition-all duration-300 ${
                        formData.purpose.trim() 
                          ? 'border-green-500/50 focus:border-green-500' 
                          : 'border-border/50 focus:border-ai-purple'
                      } focus:shadow-glow`}
                    />
                    {!isStep1Valid() && (
                      <p className="text-sm text-muted-foreground">Please enter your website purpose to continue</p>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {[
                      { icon: Code2, title: "Business", desc: "Professional websites for companies" },
                      { icon: Monitor, title: "Portfolio", desc: "Showcase your work and skills" },
                      { icon: Zap, title: "E-commerce", desc: "Online stores and marketplaces" }
                    ].map((type, index) => (
                      <Card 
                        key={index} 
                        className="premium-card cursor-pointer group hover:scale-105 transition-all duration-300"
                        onClick={() => setFormData(prev => ({ ...prev, purpose: `${type.title} website - ${type.desc}` }))}
                      >
                        <CardContent className="p-6 text-center">
                          <type.icon className="h-8 w-8 text-ai-purple mx-auto mb-3 group-hover:animate-bounce-slow" />
                          <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                          <p className="text-sm text-muted-foreground">{type.desc}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Sections */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-slide-up">
                  <div className="text-center mb-8">
                    <p className="text-muted-foreground">Select at least 3 sections you want to include in your website</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Selected: {formData.sections.length}/3 minimum
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {predefinedSections.map((section, index) => (
                      <Badge
                        key={section}
                        variant={formData.sections.includes(section) ? "default" : "outline"}
                        className={`cursor-pointer p-4 text-sm justify-center transition-all duration-300 hover:scale-105 animate-scale-in ${
                          formData.sections.includes(section)
                            ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                            : 'hover:bg-accent hover:text-accent-foreground glass-effect'
                        }`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        onClick={() => handleSectionToggle(section)}
                      >
                        {formData.sections.includes(section) ? (
                          <CheckCircle className="h-4 w-4 mr-2" />
                        ) : (
                          <Plus className="h-4 w-4 mr-2" />
                        )}
                        {section}
                      </Badge>
                    ))}
                  </div>

                  {formData.sections.length > 0 && (
                    <div className="mt-8 p-4 glass-effect rounded-lg animate-fade-in-up">
                      <p className="text-sm text-muted-foreground mb-2">Selected sections ({formData.sections.length}):</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.sections.map((section) => (
                          <Badge key={section} className="bg-gradient-secondary text-primary-foreground">
                            {section}
                            <X 
                              className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                              onClick={() => handleSectionToggle(section)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isStep2Valid() && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Please select at least 3 sections to continue to the next step
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Design */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-slide-up">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label className="text-xl font-semibold flex items-center gap-3">
                        <Palette className="h-6 w-6 text-ai-pink" />
                        Color Scheme *
                      </Label>
                      <Select value={formData.colorScheme} onValueChange={(value) => setFormData(prev => ({ ...prev, colorScheme: value }))}>
                        <SelectTrigger className={`h-14 border-2 bg-background/60 shadow-card ${
                          formData.colorScheme ? 'border-green-500/50' : 'border-border/50'
                        }`}>
                          <SelectValue placeholder="Choose a color scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          {colorSchemes.map((scheme) => (
                            <SelectItem key={scheme} value={scheme}>{scheme}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-xl font-semibold flex items-center gap-3">
                        <Type className="h-6 w-6 text-ai-orange" />
                        Font Style *
                      </Label>
                      <Select value={formData.fontStyle} onValueChange={(value) => setFormData(prev => ({ ...prev, fontStyle: value }))}>
                        <SelectTrigger className={`h-14 border-2 bg-background/60 shadow-card ${
                          formData.fontStyle ? 'border-green-500/50' : 'border-border/50'
                        }`}>
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

                  <div className="space-y-4">
                    <Label className="text-xl font-semibold flex items-center gap-3">
                      <Languages className="h-6 w-6 text-ai-cyan" />
                      Language *
                    </Label>
                    <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger className={`h-14 border-2 bg-background/60 shadow-card w-full md:w-80 ${
                        formData.language ? 'border-green-500/50' : 'border-border/50'
                      }`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {!isStep3Valid() && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">
                        Please select color scheme, font style, and language to continue
                      </p>
                    </div>
                  )}

                  {/* Device Preview */}
                  <div className="mt-8 p-6 glass-effect rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Your website will look great on all devices
                    </h3>
                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <Monitor className="h-8 w-8 mx-auto mb-2 text-ai-blue" />
                        <p className="text-sm text-muted-foreground">Desktop</p>
                      </div>
                      <div className="text-center">
                        <Tablet className="h-8 w-8 mx-auto mb-2 text-ai-purple" />
                        <p className="text-sm text-muted-foreground">Tablet</p>
                      </div>
                      <div className="text-center">
                        <Smartphone className="h-8 w-8 mx-auto mb-2 text-ai-cyan" />
                        <p className="text-sm text-muted-foreground">Mobile</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Info */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-slide-up">
                  <div className="space-y-4">
                    <Label htmlFor="additional" className="text-xl font-semibold">
                      Additional Requirements (Optional)
                    </Label>
                    <Textarea
                      id="additional"
                      placeholder="Any specific features, content, or design elements you'd like to include..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      className="min-h-32 border-2 border-border/50 bg-background/60 shadow-card resize-none focus:border-ai-purple focus:shadow-glow transition-all duration-300"
                    />
                  </div>

                  {/* Summary */}
                  <div className="mt-8 p-6 glass-effect rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Summary</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Purpose:</span> {formData.purpose || 'Not specified'}</p>
                      <p><span className="font-medium">Sections:</span> {formData.sections.length} selected</p>
                      <p><span className="font-medium">Color Scheme:</span> {formData.colorScheme || 'Not selected'}</p>
                      <p><span className="font-medium">Font Style:</span> {formData.fontStyle || 'Not selected'}</p>
                      <p><span className="font-medium">Language:</span> {formData.language}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 mt-8 border-t border-border/50">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className={`px-8 py-3 glass-effect hover:bg-accent/20 ${currentStep === 1 ? 'invisible' : ''}`}
                >
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!isCurrentStepValid()}
                    className={`px-8 py-3 shadow-glow transition-all duration-300 ${
                      isCurrentStepValid() 
                        ? 'bg-gradient-primary hover:opacity-90 text-primary-foreground hover:scale-105' 
                        : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                    }`}
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-12 py-3 shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-105"
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
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    )}
    </>
  );
}