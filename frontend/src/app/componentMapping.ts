export const mapAIComponentsToGrapesJS = (htmlContent: string) => {
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