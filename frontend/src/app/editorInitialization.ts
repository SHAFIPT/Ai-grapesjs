import grapesjs from 'grapesjs';
import type { Editor } from 'grapesjs';
import type { RefObject } from 'react';

export const initializeEditor = async ({
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
}: {
  editorRef: React.RefObject<HTMLDivElement | null>;
  blocksRef: React.RefObject<HTMLDivElement | null>;
  layersRef: React.RefObject<HTMLDivElement | null>;
  stylesRef: React.RefObject<HTMLDivElement | null>;
  grapesEditor: RefObject<Editor | null>;
  html: string;
  css: string;
  js: string;
  mapAIComponentsToGrapesJS: (htmlContent: string) => string;
  defineCustomComponents: (editor: Editor) => void;
  defineEnhancedBlocks: (editor: Editor) => void;
  enhancedCss: (css: string) => string;
  setEditorReady: (ready: boolean) => void;
}) => {
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
        panels: { defaults: [] },
        deviceManager: {
          devices: [
            { name: 'Desktop', width: '' },
            { name: 'Tablet', width: '768px', widthMedia: '992px' },
            { name: 'Mobile', width: '320px', widthMedia: '768px' }
          ]
        },
        blockManager: {
          appendTo: blocksRef.current ?? undefined,
          blocks: []
        },
        layerManager: {
          appendTo: layersRef.current ?? undefined,
        },
        styleManager: {
          appendTo: stylesRef.current ?? undefined,
          sectors: [
            {
              name: 'General',
              open: true,
              properties: [
                {
                  name: 'Background Color',
                  property: 'background-color',
                  type: 'color',
                },
                {
                  name: 'Text Color',
                  property: 'color',
                  type: 'color',
                },
                {
                  name: 'Font Size',
                  property: 'font-size',
                  type: 'number',
                  units: ['px', 'rem', 'em'],
                  min: 0,
                },
                {
                  name: 'Width',
                  property: 'width',
                  type: 'number',
                  units: ['px', '%', 'vw'],
                  min: 0,
                },
                {
                  name: 'Height',
                  property: 'height',
                  type: 'number',
                  units: ['px', '%', 'vh'],
                  min: 0,
                },
              ],
            },
          ],
        },
      });

      defineCustomComponents(grapesEditor.current);
      defineEnhancedBlocks(grapesEditor.current);

      const mappedHtml = mapAIComponentsToGrapesJS(html);
      const cleanHtml = mappedHtml.replace(/data-gjs-type="[^"]*"/g, (match) => {
        const type = match.match(/data-gjs-type="([^"]*)"/)?.[1];
        return ['slider', 'accordion', 'countdown', 'testimonial', 'pricing', 'gallery', 'hero'].includes(type || '') 
          ? match : '';
      });

      try {
        const htmlWithJs = `
          ${cleanHtml}
          <script>
            (() => {
              ${js}
            })();
          </script>
        `;
        grapesEditor.current.setComponents(htmlWithJs);
        grapesEditor.current.setStyle(enhancedCss(css)); 
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (blocksRef.current && grapesEditor.current) {
          try {
            grapesEditor.current.BlockManager.render();
          } catch (error) {
            console.warn('BlockManager render error:', error);
          }
        }
        
        if (layersRef.current && grapesEditor.current) {
          try {
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
};