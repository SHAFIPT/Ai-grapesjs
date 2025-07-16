import type { Editor } from 'grapesjs';

export const defineCustomComponents = (editor: Editor) => {
  const componentManager = editor.Components;

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
    componentManager.addType('hero', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-hero'],
        droppable: true,
        attributes: { 'data-component': 'hero' },
        components: [{
          type: 'text',
          content: 'Hero Section'
        }]
      }
    }
  });

  componentManager.addType('about', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-about'],
        droppable: true,
        attributes: { 'data-component': 'about' },
        components: [{
          type: 'text',
          content: 'About Us'
        }]
      }
    }
  });

  componentManager.addType('services', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-services'],
        droppable: true,
        attributes: { 'data-component': 'services' },
        components: [{
          type: 'text',
          content: 'Our Services'
        }]
      }
    }
  });

  componentManager.addType('portfolio', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-portfolio'],
        droppable: true,
        attributes: { 'data-component': 'portfolio' },
        components: [{
          type: 'text',
          content: 'Portfolio Section'
        }]
      }
    }
  });

  componentManager.addType('faq', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-faq'],
        droppable: true,
        attributes: { 'data-component': 'faq' },
        components: [{
          type: 'text',
          content: 'Frequently Asked Questions'
        }]
      }
    }
  });

  componentManager.addType('team', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-team'],
        droppable: true,
        attributes: { 'data-component': 'team' },
        components: [{
          type: 'text',
          content: 'Our Team'
        }]
      }
    }
  });

  componentManager.addType('contact', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-contact'],
        droppable: true,
        attributes: { 'data-component': 'contact' },
        components: [{
          type: 'text',
          content: 'Contact Us'
        }]
      }
    }
  });

  componentManager.addType('blog', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-blog'],
        droppable: true,
        attributes: { 'data-component': 'blog' },
        components: [{
          type: 'text',
          content: 'Latest Blog Posts'
        }]
      }
    }
  });

  componentManager.addType('features', {
    model: {
      defaults: {
        tagName: 'section',
        classes: ['custom-features'],
        droppable: true,
        attributes: { 'data-component': 'features' },
        components: [{
          type: 'text',
          content: 'Key Features'
        }]
      }
    }
  });

  componentManager.addType('footer', {
    model: {
      defaults: {
        tagName: 'footer',
        classes: ['custom-footer'],
        droppable: true,
        attributes: { 'data-component': 'footer' },
        components: [{
          type: 'text',
          content: 'Footer Content'
        }]
      }
    }
  });

};