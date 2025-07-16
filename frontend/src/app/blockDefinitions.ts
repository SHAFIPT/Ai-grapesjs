// components/grapesjs/blockDefinitions.ts
import type { Editor } from 'grapesjs';

export const defineEnhancedBlocks = (editor: Editor) => {
  const blockManager = editor.BlockManager;

  blockManager.getAll().reset();

  blockManager.add('section', {
    label: 'Section',
    category: 'Basic',
    attributes: { class: 'gjs-block-section' },
    content: `<section class="section" data-gjs-editable="true" data-gjs-droppable="true">
                This is a section
              </section>`,
  });

  blockManager.add('text', {
    label: 'Text',
    category: 'Basic',
    attributes: { class: 'gjs-fonts gjs-f-text' },
    content: `<div data-gjs-editable="true">Insert your text here</div>`,
  });

  blockManager.add('image', {
    label: 'Image',
    category: 'Basic',
    attributes: { class: 'gjs-fonts gjs-f-image' },
    content: `<img src="https://via.placeholder.com/300x200" alt="Image" data-gjs-editable="true">`,
  });

  blockManager.add('button', {
    label: 'Button',
    category: 'Basic',
    attributes: { class: 'gjs-fonts gjs-f-button' },
    content: `<button class="btn" data-gjs-editable="true">Click me</button>`,
  });

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
