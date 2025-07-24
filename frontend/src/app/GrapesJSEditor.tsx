import React, { useEffect, useRef, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Eye, Undo, Redo, Settings, Layers, Palette } from 'lucide-react';
import type { Editor } from 'grapesjs';
import { mapAIComponentsToGrapesJS } from './componentMapping';
import { defineCustomComponents } from './customComponents';
import { defineEnhancedBlocks } from './blockDefinitions';
import { initializeEditor } from './editorInitialization';
import { enhancedCss } from './styles';

interface GrapesJSEditorProps {
  html: string;
  css: string;
  js: string;
  onBack: () => void;
}

const GrapesJSEditor: React.FC<GrapesJSEditorProps> = ({ html, css, js, onBack }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const stylesRef = useRef<HTMLDivElement>(null);
  const grapesEditor = useRef<Editor | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [, setIsMobile] = useState(false);
  const [activePanel, setActivePanel] = useState<string>('blocks');
  const [, setEditorReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    initializeEditor({
      editorRef,
      blocksRef,
      layersRef,
      stylesRef,
      grapesEditor,
      html,
      css,
      js,
      mapAIComponentsToGrapesJS,
      defineCustomComponents,
      defineEnhancedBlocks,
      enhancedCss,
      setEditorReady
    });

    return () => {
      if (grapesEditor.current) {
        try {
          grapesEditor.current.destroy();
        } catch (error) {
          console.warn('Error destroying editor:', error);
        }
        grapesEditor.current = null;
      }
    };
  }, [html, css,js]);

  const handleExport = () => {
    const editor = grapesEditor.current;
    if (!editor) return;

    const htmlContent = editor.getHtml();
    const cssContent = editor.getCss();

    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
    <style>
        ${cssContent}
        
        /* Enhanced component interactions */
        .slider { position: relative; overflow: hidden; }
        .slide { display: none; }
        .slide.active { display: block; }
        
        .accordion-content { display: none; }
        .accordion-content.active { display: block; }
        
        /* Responsive utilities */
        * { box-sizing: border-box; }
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        
        @media (max-width: 768px) {
            .container { padding: 1rem; }
            .responsive-text { font-size: 0.9rem; }
        }
    </style>
    <script>
        // Enhanced component interactions
        document.addEventListener('DOMContentLoaded', function() {
            // Accordion functionality
            document.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', function() {
                    const content = this.nextElementSibling;
                    const isActive = content.classList.contains('active');
                    
                    // Close all accordion items
                    document.querySelectorAll('.accordion-content').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Toggle current item
                    if (!isActive) {
                        content.classList.add('active');
                    }
                });
            });
            
            // Slider functionality
            document.querySelectorAll('.slider').forEach(slider => {
                const slides = slider.querySelectorAll('.slide');
                const prevBtn = slider.querySelector('.prev');
                const nextBtn = slider.querySelector('.next');
                let currentSlide = 0;
                
                function showSlide(index) {
                    slides.forEach(slide => slide.classList.remove('active'));
                    slides[index].classList.add('active');
                }
                
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        currentSlide = (currentSlide + 1) % slides.length;
                        showSlide(currentSlide);
                    });
                }
                
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                        showSlide(currentSlide);
                    });
                }
                
                // Auto-play functionality
                setInterval(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    showSlide(currentSlide);
                }, 5000);
            });
            
            // Countdown functionality
            document.querySelectorAll('.countdown').forEach(countdown => {
                const targetDate = new Date(countdown.dataset.targetDate || '2024-12-31').getTime();
                
                function updateCountdown() {
                    const now = new Date().getTime();
                    const distance = targetDate - now;
                    
                    if (distance > 0) {
                        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        
                        const daysEl = countdown.querySelector('[data-days]');
                        const hoursEl = countdown.querySelector('[data-hours]');
                        const minutesEl = countdown.querySelector('[data-minutes]');
                        const secondsEl = countdown.querySelector('[data-seconds]');
                        
                        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
                        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
                        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
                        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
                    }
                }
                
                updateCountdown();
                setInterval(updateCountdown, 1000);
            });
        });
    </script>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'generated-website.html';
    link.click();
  };

  const togglePreview = () => {
    const editor = grapesEditor.current;
    if (!editor) return;
    
    const newPreviewMode = !isPreviewMode;
    setIsPreviewMode(newPreviewMode);
    
    if (newPreviewMode) {
      editor.runCommand('preview');
    } else {
      editor.stopCommand('preview');
    }
  };

  const handleUndo = () => {
    grapesEditor.current?.runCommand('core:undo');
  };

  const handleRedo = () => {
    grapesEditor.current?.runCommand('core:redo');
  };

  const setDevice = (device: string) => {
    grapesEditor.current?.setDevice(device);
  };

  const togglePanel = (panelId: string) => {
    setActivePanel(activePanel === panelId ? 'blocks' : panelId);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      <div className="relative bg-gray-600 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative flex items-center justify-between p-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button variant="outline" onClick={togglePreview}>
                <Eye className="w-4 h-4 mr-1" />
                {isPreviewMode ? 'Exit Preview' : 'Preview'}
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="outline" onClick={handleUndo}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={handleRedo}>
                <Redo className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button className='bg-gray-700' onClick={() => setDevice('Desktop')}>
              Desktop
            </Button>
            <Button className='bg-gray-700' onClick={() => setDevice('Tablet')}>
              Tablet
            </Button>
            <Button className='bg-gray-700' onClick={() => setDevice('Mobile')}>
              Mobile
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-16 bg-gray-600 backdrop-blur-lg border-r border-white/20 shadow-lg flex flex-col items-center py-4 space-y-4">
          <Button variant="ghost" onClick={() => togglePanel('blocks')}>
            <Layers className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={() => togglePanel('layers')}>
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={() => togglePanel('styles')}>
            <Palette className="w-5 h-5" />
          </Button>
        </div>
        <div className="w-72 bg-gray-700 overflow-y-auto transition-all duration-300" style={{ display: activePanel === 'blocks' ? 'block' : 'none' }}>
          <div ref={blocksRef} className="gjs-blocks-cs p-4"></div>
        </div>
        <div className="w-72 bg-gray-700 overflow-y-auto transition-all duration-300" style={{ display: activePanel === 'layers' ? 'block' : 'none' }}>
          <div ref={layersRef} className="gjs-layers-cs p-4"></div>
        </div>
        <div className="w-72 bg-gray-700 overflow-y-auto transition-all duration-300" style={{ display: activePanel === 'styles' ? 'block' : 'none' }}>
          <div ref={stylesRef} className="gjs-sm-sectors p-4"></div>
        </div>
        <div className="flex-1 overflow-hidden">
          <div ref={editorRef} className="h-full w-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default GrapesJSEditor;