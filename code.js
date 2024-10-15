// Display the UI
figma.showUI(__html__, { width: 300, height: 220 });

// Listen for messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg.type === 'analyze-frames') {
    // Get the current selection
    const selection = figma.currentPage.selection;
    let frameCount = 0;
    let inputFieldCount = 0;
    let buttonFieldCount = 0;

    // Loop through selected nodes and analyze them
    selection.forEach(node => {
      if (node.type === 'FRAME') {
        frameCount++;
        inputFieldCount += countInputFields(node);
        buttonFieldCount += countButtonFields(node);
      }
    });

    // Send the result back to the UI
    figma.ui.postMessage({ type: 'analysis-result', frames: frameCount, inputs: inputFieldCount, buttons: buttonFieldCount });
  }
};

// Helper function to count input fields in a frame by name
function countInputFields(node) {
  let count = 0;

  if ("children" in node) {
    node.children.forEach(child => {
      // Check if the layer name contains keywords related to input fields
      if (child.name.toLowerCase().includes("input") || 
          child.name.toLowerCase().includes("field") || 
          child.name.toLowerCase().includes("text")) {
        count++;
      }
      
      // Recursively check for nested components
      if ("children" in child) {
        count += countInputFields(child);
      }
    });
  }
  return count;
}

function countButtonFields(node) {
  let count = 0;

  if ("children" in node) {
    node.children.forEach(child => {
      // Check if the layer name contains keywords related to input fields
      if (child.name.toLowerCase().includes("button")) {
        count++;
      }
      
      // Recursively check for nested components
      if ("children" in child) {
        count += countButtonFields(child);
      }
    });
  }
  return count;
}

function countRadioFields(node) {
  let count = 0;

  if ("children" in node) {
    node.children.forEach(child => {
      // Check if the layer name contains keywords related to input fields
      if (child.name.toLowerCase().includes("radio")) {
        count++;
      }
      
      // Recursively check for nested components
      if ("children" in child) {
        count += countRadioFields(child);
      }
    });
  }
  return count;
}
