export const enhancedCss = (css: string) => `
  ${css}
  
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