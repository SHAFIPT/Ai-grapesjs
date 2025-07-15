
import React, { useCallback, useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Eye, Undo, Redo, Settings, Layers, Palette } from 'lucide-react';
import type { Editor } from 'grapesjs';

interface GrapesJSEditorProps {
  html: string;
  css: string;
  onBack: () => void;
}

const GrapesJSEditor: React.FC<GrapesJSEditorProps> = ({ html, css, onBack }) => {
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

  // Enhanced component mapping for AI-generated content
  const mapAIComponentsToGrapesJS = (htmlContent: string) => {
    const componentPatterns = {
      slider: /(?:slider|carousel|swiper)/i,
      accordion: /(?:accordion|collapse|toggle)/i,
      tabs: /(?:tabs|tabbed)/i,
      modal: /(?:modal|popup|dialog)/i,
      countdown: /(?:countdown|timer)/i,
      testimonial: /(?:testimonial|review)/i,
      pricing: /(?:pricing|plan|package)/i,
      gallery: /(?:gallery|lightbox)/i,
      form: /(?:form|contact|subscribe)/i,
      navbar: /(?:navbar|navigation|menu)/i,
      footer: /(?:footer|bottom)/i,
      hero: /(?:hero|banner|jumbotron)/i,
    };

    let mappedContent = htmlContent;

    Object.entries(componentPatterns).forEach(([componentType, pattern]) => {
      if (pattern.test(htmlContent)) {
        mappedContent = mappedContent.replace(
          new RegExp(`<(\\w+)([^>]*class="[^"]*${componentType}[^"]*"[^>]*)>`, 'gi'),
          `<$1$2 data-gjs-type="${componentType}" data-gjs-editable="true" data-gjs-droppable="true">`
        );
      }
    });

    mappedContent = mappedContent.replace(
      /<(section|div|article|aside|header|main|footer)([^>]*)>/gi,
      '<$1$2 data-gjs-editable="true" data-gjs-droppable="true">'
    );

    mappedContent = mappedContent.replace(
      /<(h[1-6]|p|span|a|button)([^>]*)>/gi,
      '<$1$2 data-gjs-editable="true">'
    );

    return mappedContent;
  };

  // Define custom components for special elements
  const defineCustomComponents = (editor: Editor) => {
    const componentManager = editor.Components;

    // Slider Component
    componentManager.addType('slider', {
      model: {
        defaults: {
          tagName: 'div',
          classes: ['custom-slider'],
          droppable: true,
          editable: true,
          attributes: { 'data-component': 'slider' },
          traits: [
            { name: 'autoplay', type: 'checkbox', value: false },
            { name: 'duration', type: 'number', value: 3000 },
            { name: 'arrows', type: 'checkbox', value: true },
            { name: 'dots', type: 'checkbox', value: true },
          ],
        }
      },
      view: {
        init() {
          this.listenTo(this.model, 'change:attributes', this.updateSlider);
        },
        updateSlider() {
          const attrs = this.model.getAttributes();
          console.log('Slider updated with attributes:', attrs);
        }
      }
    });

    // Accordion Component
    componentManager.addType('accordion', {
      model: {
        defaults: {
          tagName: 'div',
          classes: ['custom-accordion'],
          droppable: true,
          editable: true,
          attributes: { 'data-component': 'accordion' },
          traits: [
            { name: 'multiple', type: 'checkbox', value: false },
            { name: 'collapsible', type: 'checkbox', value: true },
          ],
        }
      }
    });

    // Countdown Component
    componentManager.addType('countdown', {
      model: {
        defaults: {
          tagName: 'div',
          classes: ['custom-countdown'],
          droppable: false,
          editable: true,
          attributes: { 'data-component': 'countdown' },
          traits: [
            { name: 'target-date', type: 'text', value: '2024-12-31' },
            { name: 'format', type: 'select', options: [
            { id: 'days', name: 'Days' },
            { id: 'hours', name: 'Hours' },
            { id: 'minutes', name: 'Minutes' },
            { id: 'seconds', name: 'Seconds' }
            ]},
          ],
        }
      }
    });

    // Testimonial Component
    componentManager.addType('testimonial', {
      model: {
        defaults: {
          tagName: 'div',
          classes: ['custom-testimonial'],
          droppable: true,
          editable: true,
          attributes: { 'data-component': 'testimonial' },
          traits: [
            { name: 'author', type: 'text', value: 'John Doe' },
            { name: 'position', type: 'text', value: 'CEO' },
            { name: 'company', type: 'text', value: 'Company Inc.' },
          ],
        }
      }
    });

    // Pricing Component
    componentManager.addType('pricing', {
      model: {
        defaults: {
          tagName: 'div',
          classes: ['custom-pricing'],
          droppable: true,
          editable: true,
          attributes: { 'data-component': 'pricing' },
          traits: [
            { name: 'price', type: 'text', value: '$99' },
            { name: 'period', type: 'text', value: 'month' },
            { name: 'featured', type: 'checkbox', value: false },
          ],
        }
      }
    });

    // Gallery Component
    componentManager.addType('gallery', {
      model: {
        defaults: {
          tagName: 'div',
          classes: ['custom-gallery'],
          droppable: true,
          editable: true,
          attributes: { 'data-component': 'gallery' },
          traits: [
            { name: 'columns', type: 'number', value: 3 },
            { name: 'lightbox', type: 'checkbox', value: true },
            { name: 'spacing', type: 'number', value: 10 },
          ],
        }
      }
    });
  };

  // Enhanced block definitions
  const defineEnhancedBlocks = (editor: Editor) => {
    const blockManager = editor.BlockManager;

    // Clear existing blocks
    blockManager.getAll().reset();

    // Basic blocks
    blockManager.add('section', {
      label: 'Section',
      category: 'Basic',
      attributes: { class: 'gjs-block-section' },
      content: '<section class="section" data-gjs-editable="true" data-gjs-droppable="true">This is a section</section>',
    });

    blockManager.add('text', {
      label: 'Text',
      category: 'Basic',
      content: '<div data-gjs-editable="true">Insert your text here</div>',
    });

    blockManager.add('image', {
      label: 'Image',
      category: 'Basic',
      content: '<img src="https://via.placeholder.com/300x200" alt="Image" data-gjs-editable="true">',
    });

    blockManager.add('button', {
      label: 'Button',
      category: 'Basic',
      content: '<button class="btn" data-gjs-editable="true">Click me</button>',
    });

    // Advanced blocks
    blockManager.add('hero', {
      label: 'Hero Section',
      category: 'Sections',
      content: `
        <section class="hero" data-gjs-type="hero" data-gjs-editable="true" data-gjs-droppable="true">
          <div class="hero-content">
            <h1 data-gjs-editable="true">Hero Title</h1>
            <p data-gjs-editable="true">Hero description text</p>
            <button class="btn" data-gjs-editable="true">Call to Action</button>
          </div>
        </section>
      `,
    });

    blockManager.add('slider', {
      label: 'Slider',
      category: 'Interactive',
      content: `
        <div class="slider" data-gjs-type="slider" data-gjs-editable="true" data-gjs-droppable="true">
          <div class="slide active">
            <img src="https://via.placeholder.com/800x400" alt="Slide 1">
            <div class="slide-content">
              <h3 data-gjs-editable="true">Slide 1 Title</h3>
              <p data-gjs-editable="true">Slide 1 description</p>
            </div>
          </div>
          <div class="slide">
            <img src="https://via.placeholder.com/800x400" alt="Slide 2">
            <div class="slide-content">
              <h3 data-gjs-editable="true">Slide 2 Title</h3>
              <p data-gjs-editable="true">Slide 2 description</p>
            </div>
          </div>
          <div class="slider-controls">
            <button class="prev">‹</button>
            <button class="next">›</button>
          </div>
        </div>
      `,
    });

    blockManager.add('accordion', {
      label: 'Accordion',
      category: 'Interactive',
      content: `
        <div class="accordion" data-gjs-type="accordion" data-gjs-editable="true" data-gjs-droppable="true">
          <div class="accordion-item">
            <button class="accordion-header" data-gjs-editable="true">Section 1</button>
            <div class="accordion-content">
              <p data-gjs-editable="true">Content for section 1</p>
            </div>
          </div>
          <div class="accordion-item">
            <button class="accordion-header" data-gjs-editable="true">Section 2</button>
            <div class="accordion-content">
              <p data-gjs-editable="true">Content for section 2</p>
            </div>
          </div>
        </div>
      `,
    });

    blockManager.add('countdown', {
      label: 'Countdown',
      category: 'Interactive',
      content: `
        <div class="countdown" data-gjs-type="countdown" data-gjs-editable="true">
          <div class="countdown-item">
            <span class="number" data-days>00</span>
            <span class="label">Days</span>
          </div>
          <div class="countdown-item">
            <span class="number" data-hours>00</span>
            <span class="label">Hours</span>
          </div>
          <div class="countdown-item">
            <span class="number" data-minutes>00</span>
            <span class="label">Minutes</span>
          </div>
          <div class="countdown-item">
            <span class="number" data-seconds>00</span>
            <span class="label">Seconds</span>
          </div>
        </div>
      `,
    });

    blockManager.add('testimonial', {
      label: 'Testimonial',
      category: 'Content',
      content: `
        <div class="testimonial" data-gjs-type="testimonial" data-gjs-editable="true" data-gjs-droppable="true">
          <div class="testimonial-content">
            <p data-gjs-editable="true">"This is a testimonial quote from a satisfied customer."</p>
          </div>
          <div class="testimonial-author">
            <img src="https://via.placeholder.com/60x60" alt="Author" class="author-image">
            <div class="author-info">
              <h4 data-gjs-editable="true">John Doe</h4>
              <p data-gjs-editable="true">CEO, Company Inc.</p>
            </div>
          </div>
        </div>
      `,
    });

    blockManager.add('pricing', {
      label: 'Pricing Card',
      category: 'Content',
      content: `
        <div class="pricing-card" data-gjs-type="pricing" data-gjs-editable="true" data-gjs-droppable="true">
          <div class="pricing-header">
            <h3 data-gjs-editable="true">Basic Plan</h3>
            <div class="price">
              <span class="currency">$</span>
              <span class="amount" data-gjs-editable="true">99</span>
              <span class="period">/month</span>
            </div>
          </div>
          <div class="pricing-features">
            <ul>
              <li data-gjs-editable="true">Feature 1</li>
              <li data-gjs-editable="true">Feature 2</li>
              <li data-gjs-editable="true">Feature 3</li>
            </ul>
          </div>
          <button class="btn pricing-btn" data-gjs-editable="true">Get Started</button>
        </div>
      `,
    });

    blockManager.add('gallery', {
      label: 'Gallery',
      category: 'Media',
      content: `
        <div class="gallery" data-gjs-type="gallery" data-gjs-editable="true" data-gjs-droppable="true">
          <div class="gallery-item">
            <img src="https://via.placeholder.com/300x200" alt="Gallery 1">
          </div>
          <div class="gallery-item">
            <img src="https://via.placeholder.com/300x200" alt="Gallery 2">
          </div>
          <div class="gallery-item">
            <img src="https://via.placeholder.com/300x200" alt="Gallery 3">
          </div>
          <div class="gallery-item">
            <img src="https://via.placeholder.com/300x200" alt="Gallery 4">
          </div>
        </div>
      `,
    });
  };

  // Initialize editor with proper error handling
  const initializeEditor = useCallback(async () => {
    try {
      if (editorRef.current && !grapesEditor.current) {
        grapesEditor.current = grapesjs.init({
          container: editorRef.current,
          fromElement: false,
          height: '100%',
          width: 'auto',
          storageManager: false,
          components: '',
          style: '',
          // Remove default panels to avoid conflicts
          panels: { defaults: [] },
          deviceManager: {
            devices: [
              { name: 'Desktop', width: '' },
              { name: 'Tablet', width: '768px', widthMedia: '992px' },
              { name: 'Mobile', width: '320px', widthMedia: '768px' }
            ]
          },
          // Configure managers but don't render yet
          blockManager: {
            appendTo: blocksRef.current ?? undefined,
            blocks: []
          },
          layerManager: {
            appendTo: layersRef.current ?? undefined,
          },
          styleManager: {
            appendTo: stylesRef.current ?? undefined,
          },
        });

        // Initialize custom components and blocks
        defineCustomComponents(grapesEditor.current);
        defineEnhancedBlocks(grapesEditor.current);

        // Map and clean AI-generated content
        const mappedHtml = mapAIComponentsToGrapesJS(html);
        const cleanHtml = mappedHtml.replace(/data-gjs-type="[^"]*"/g, (match) => {
          const type = match.match(/data-gjs-type="([^"]*)"/)?.[1];
          return ['slider', 'accordion', 'countdown', 'testimonial', 'pricing', 'gallery', 'hero'].includes(type || '') 
            ? match : '';
        });

        // Enhanced CSS with component styles
        const enhancedCss = `
          ${css}
          
          /* Enhanced component styles */
          .custom-slider {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
          }
          
          .slide {
            display: none;
            position: relative;
          }
          
          .slide.active {
            display: block;
          }
          
          .slider-controls {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
          }
          
          .slider-controls button {
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 50%;
          }
          
          .custom-accordion .accordion-item {
            border: 1px solid #e2e8f0;
            margin-bottom: 8px;
            border-radius: 8px;
            overflow: hidden;
          }
          
          .accordion-header {
            width: 100%;
            padding: 16px;
            background: #f8fafc;
            border: none;
            text-align: left;
            cursor: pointer;
            font-weight: 500;
          }
          
          .accordion-content {
            padding: 16px;
            display: none;
          }
          
          .accordion-content.active {
            display: block;
          }
          
          .custom-countdown {
            display: flex;
            gap: 20px;
            justify-content: center;
            padding: 20px;
          }
          
          .countdown-item {
            text-align: center;
            padding: 16px;
            background: #f8fafc;
            border-radius: 8px;
            min-width: 80px;
          }
          
          .countdown-item .number {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: #2563eb;
          }
          
          .countdown-item .label {
            font-size: 0.875rem;
            color: #64748b;
          }
          
          .custom-testimonial {
            text-align: center;
            padding: 30px;
            background: #f8fafc;
            border-radius: 12px;
            margin: 20px 0;
          }
          
          .testimonial-content {
            margin-bottom: 20px;
          }
          
          .testimonial-author {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }
          
          .author-image {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
          }
          
          .custom-pricing {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          }
          
          .pricing-header {
            margin-bottom: 20px;
          }
          
          .price {
            font-size: 2.5rem;
            font-weight: bold;
            color: #2563eb;
            margin: 10px 0;
          }
          
          .pricing-features ul {
            list-style: none;
            padding: 0;
            margin: 20px 0;
          }
          
          .pricing-features li {
            padding: 8px 0;
            border-bottom: 1px solid #f1f5f9;
          }
          
          .custom-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            padding: 20px;
          }
          
          .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            aspect-ratio: 3/2;
          }
          
          .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }
          
          .gallery-item:hover img {
            transform: scale(1.05);
          }
          
          /* Custom GrapesJS panel styles */
          .gjs-blocks-cs {
            background: white;
            border: none;
          }
          
          .gjs-layers-cs {
            background: white;
            border: none;
          }
          
          .gjs-sm-sectors {
            background: white;
            border: none;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .custom-countdown {
              flex-wrap: wrap;
              gap: 10px;
            }
            
            .countdown-item {
              min-width: 60px;
              padding: 12px;
            }
            
            .testimonial-author {
              flex-direction: column;
            }
            
            .custom-gallery {
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 12px;
              padding: 12px;
            }
          }
        `;

        // Set content with enhanced error handling
        try {
          grapesEditor.current.setComponents(cleanHtml);
          grapesEditor.current.setStyle(enhancedCss);
          
          // Wait for the editor to be ready before rendering managers
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Now render the managers safely
          if (blocksRef.current && grapesEditor.current) {
            try {
              grapesEditor.current.BlockManager.render();
            } catch (error) {
              console.warn('BlockManager render error:', error);
            }
          }
          
          if (layersRef.current && grapesEditor.current) {
            try {
              // Check if there are components before rendering layers
              const components = grapesEditor.current.getComponents();
              if (components && components.length > 0) {
                grapesEditor.current.LayerManager.render();
              }
            } catch (error) {
              console.warn('LayerManager render error:', error);
            }
          }
          
          if (stylesRef.current && grapesEditor.current) {
            try {
              grapesEditor.current.StyleManager.render();
            } catch (error) {
              console.warn('StyleManager render error:', error);
            }
          }
          
          setEditorReady(true);
        } catch (error) {
          console.warn('Error setting components:', error);
          grapesEditor.current.setComponents('<div data-gjs-editable="true">Content loaded successfully</div>');
          setEditorReady(true);
        }
      }
    } catch (error) {
      console.error('Failed to initialize editor:', error);
      setEditorReady(false);
    }
  }, [html, css])

  useEffect(() => {
    initializeEditor();

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
  }, [initializeEditor]);

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
      {/* Enhanced Toolbar */}
      <div className="relative bg-white/90 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative flex items-center justify-between p-4 lg:px-6">
          {/* Left Section */}
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
              <Button variant="ghost" onClick={handleUndo}>
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="ghost" onClick={handleRedo}>
                <Redo className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => setDevice('Desktop')}>
              Desktop
            </Button>
            <Button variant="ghost" onClick={() => setDevice('Tablet')}>
              Tablet
            </Button>
            <Button variant="ghost" onClick={() => setDevice('Mobile')}>
              Mobile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Layout */}
        
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-16 bg-white/80 backdrop-blur-lg border-r border-white/20 shadow-lg flex flex-col items-center py-4 space-y-4">
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

        {/* Panels */}
        <div className="w-72 bg-white overflow-y-auto transition-all duration-300" style={{ display: activePanel === 'blocks' ? 'block' : 'none' }}>
          <div ref={blocksRef} className="gjs-blocks-cs p-4"></div>
        </div>
        <div className="w-72 bg-white overflow-y-auto transition-all duration-300" style={{ display: activePanel === 'layers' ? 'block' : 'none' }}>
          <div ref={layersRef} className="gjs-layers-cs p-4"></div>
        </div>
        <div className="w-72 bg-white overflow-y-auto transition-all duration-300" style={{ display: activePanel === 'styles' ? 'block' : 'none' }}>
          <div ref={stylesRef} className="gjs-sm-sectors p-4"></div>
        </div>

        {/* Editor Canvas */}
        <div className="flex-1 overflow-hidden">
          <div ref={editorRef} className="h-full w-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default GrapesJSEditor;
