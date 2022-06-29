figma.showUI(__html__);

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'create-color-palette') {
    const nodes = [];

    // create a text
    const text = figma.createText();
    // Move to (50, 50)
    text.y = -50;

    // Load the font in the text node before setting the characters
    await figma.loadFontAsync(text.fontName);
    text.characters = 'Hubspot Color Palette';

    // Set bigger font size and red color
    text.fontSize = 64;
    text.fills = [{type: 'SOLID', color: {r: 0, g: 0, b: 0}}];

    for (let i = 0; i < msg.colorPalette.length; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: msg.colorPalette[i]}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-color-palette',
      message: `Created ${msg.count} Rectangles`,
    });
  }

  figma.closePlugin();
};
