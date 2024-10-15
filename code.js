// Display the UI
figma.showUI(__html__, { width: 300, height: 350 });

// Define a type for the element keywords and their mapping
const uiElementKeywords = {
  input: ["input", "field", "text", "textarea"],
  button: ["button"],
  radio: ["radio"],
  checkbox: ["checkbox"],
  slider: ["slider"]
};

// Listen for messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg.type === 'analyze-frames') {
    // Get the current selection
    const selection = figma.currentPage.selection;
    let frameCount = 0;

    // Initialize elementCounts dynamically based on uiElementKeywords keys
    const elementCounts = {};
    for (const key in uiElementKeywords) {
      elementCounts[key] = 0;
    }

    // Loop through selected nodes and analyze them
    selection.forEach(node => {
      if (node.type === 'FRAME') {
        frameCount++;
        for (const elementType in uiElementKeywords) {
          elementCounts[elementType] += countElements(node, uiElementKeywords[elementType]);
        }
      }
    });

    // Prepare the result object dynamically from elementCounts
    const result = { type: 'analysis-result', screens: frameCount };
    for (const key in elementCounts) {
      result[key] = elementCounts[key];
    }

    // Send the result back to the UI
    figma.ui.postMessage(result);
  }
};

// Generic function to count elements based on keywords
function countElements(node, keywords) {
  let count = 0;

  if ("children" in node) {
    node.children.forEach(child => {
      // Check if the layer name contains any of the keywords
      for (const keyword of keywords) {
        if (child.name.toLowerCase().includes(keyword)) {
          count++;
          break;
        }
      }
      
      // Recursively check for nested components
      if ("children" in child) {
        count += countElements(child, keywords);
      }
    });
  }
  return count;
}
