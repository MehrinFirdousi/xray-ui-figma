# X-ray UI

**X-ray UI** is a Figma plugin that counts specific UI elements, such as input fields, buttons, and screens, in a selected set of frames. The plugin analyzes layers by a customizable naming convention, allowing easy adaptation for various UI components, such as checkboxes, radio buttons, and text areas. 

## Purpose
The idea is to automate the process of obtaining user interaction metrics for a specific feature, and help benchmark a user journey of a feature in comparison to competitors who offer the same feature.

![image](https://github.com/user-attachments/assets/3b4d2eb3-7193-4ea3-9ab6-dcc0cabbc554)

## Features
- **Screen Count**: Determines the number of screens in a selected set.
- **UI Element Count**: Detects and counts input fields, buttons, and any other specified UI elements.
- **Customizable Analysis**: Easily adapts to new elements by updating the `uiElementKeywords` object.

## How It Works
The plugin analyzes the selected frames in Figma based on a naming convention. UI elements are identified by specific keywords in layer names. For example, layers named with "input," "field," or "button" will be counted as input fields or buttons, respectively.

## Installation & Usage
1. **Clone or Download the Repository**: 
   Clone or download this project and unzip it.

2. **Load the Plugin in Figma**:
   - Open Figma, go to **Plugins > Development**.
   - Choose **Import plugin from manifest**.
   - Select the plugin folder where `manifest.json` is located.

3. **Run the Plugin**:
   - Select the frames you want to analyze in your Figma document.
   - Go to **Plugins > Development > X-ray UI**.
     ![image](https://github.com/user-attachments/assets/7b4d8b5d-057f-4f14-b2e5-778588931ef0)

   - The plugin will analyze the selected frames and display the number of each UI element.
   - You can change your frame selection and rerun the analyzer by clicking `Analyze Selected Frames` in the plugin window.

## Customizing the Plugin for Different UI Elements
The `uiElementKeywords` object in `code.js` defines the keywords used to detect different UI components. You can update this object to adapt the plugin for additional UI elements.

### Example
The following code snippet from `code.js` demonstrates how `uiElementKeywords` is set up:

```javascript
// Define keywords to identify various UI elements
const uiElementKeywords = {
  input: ["input", "field", "textarea"],
  button: ["button"],
  checkbox: ["checkbox"],
  radio: ["radio"]
};
```

### Naming Convention
This plugin relies on layer naming conventions in Figma. For accurate analysis, ensure that layer names include the keywords defined in `uiElementKeywords`. For instance, any input field layer should include "input" or "field" or "textarea" in its name. 

If you want to add a new element to track, like `dropdown` for example, you would append the following to `uiElementKeywords`.
```javascript
  dropdown: ["dropdown", "chevron-down"]
```
Where you're expecting the dropdown elements in your Figma file to contain the words "dropdown" or "chevron-down" in their layers.

## License
This project is licensed under the MIT License.
