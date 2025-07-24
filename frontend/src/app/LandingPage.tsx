import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Wand2,
  Sparkles,
  Globe,
  Palette,
  Code,
  Rocket,
  Star,
  ArrowRight,
  Bot,
  Smartphone,
  Cpu,
  X,
} from "lucide-react";
import { features, testimonials } from "@/constants/data";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    setParticleCount(20);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-background overflow-hidden">
      {/* Animated Background Particles */}
      <div className="ai-particles">
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm bg-gradient-primary text-primary-foreground border-0 animate-pulse-glow"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Website Generation
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="gradient-text block">Generate Stunning</span>
              <span className="gradient-text-secondary block">
                Websites with AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your ideas into beautiful, professional websites in
              seconds. No coding required – just describe what you want and
              watch the magic happen.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-105 animate-bounce-slow"
              >
                <Wand2 className="w-6 h-6 mr-3" />
                Start Creating Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold glass-effect hover:bg-accent/20 transition-all duration-300"
                  >
                    <Rocket className="w-6 h-6 mr-3" />
                    Watch Demo
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                  {/* Optional close button */}
                  <DialogClose className="absolute top-4 right-4 rounded-full p-1 hover:bg-muted">
                    <X className="w-5 h-5" />
                  </DialogClose>

                  {/* YouTube iframe with real video */}
                  <iframe
                    src="https://www.youtube.com/embed/oCWbzgKWbHQ?autoplay=1&rel=0&modestbranding=1"
                    title="Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-[60vh] rounded-xl"
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-primary rounded-full opacity-20 blur-3xl animate-pulse-glow"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-secondary rounded-2xl animate-float shadow-glow flex items-center justify-center">
                  <Bot className="w-16 h-16 text-primary-foreground" />
                </div>
              </div>

              {/* Orbiting Icons */}
              <div
                className="absolute top-1/2 left-1/2 w-80 h-80 animate-spin"
                style={{ animationDuration: "20s" }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center shadow-card">
                    <Code className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center shadow-card">
                    <Palette className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center shadow-card">
                    <Globe className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center shadow-card">
                    <Smartphone className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 animate-fade-in-up">
            <Badge variant="outline" className="mb-6 px-4 py-2 glass-effect">
              <Cpu className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Everything You Need to Create Amazing Websites
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI understands your vision and transforms it into
              pixel-perfect websites with all the features you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="premium-card group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:animate-bounce-slow transition-all duration-300">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-secondary">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Creating your dream website is as easy as 1, 2, 3
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Describe Your Vision",
                description:
                  "Tell us about your website - its purpose, sections, and style preferences",
              },
              {
                step: "2",
                title: "AI Creates Magic",
                description:
                  "Our advanced AI generates a complete, professional website based on your description",
              },
              {
                step: "3",
                title: "Customize & Launch",
                description:
                  "Fine-tune your website with our editor and launch it to the world",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-3xl font-bold text-primary-foreground mx-auto shadow-glow animate-pulse-glow">
                    {step.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-primary transform -translate-y-1/2 -z-10"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Loved by Creators Worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their ideas
              into stunning websites
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="premium-card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-ai-orange fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glow-border p-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Create Your Dream Website?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of creators who are building amazing websites with
              AI. Start your journey today.
            </p>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-12 py-6 text-lg font-semibold shadow-premium hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Wand2 className="w-6 h-6 mr-3" />
              Start Building Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
