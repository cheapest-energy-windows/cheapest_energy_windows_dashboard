const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

// Read the YAML dashboard file
const yamlPath = path.join(__dirname, '..', 'cheapest_energy_windows_dashboard_yaml', 'dashboard.yaml');
const yamlContent = fs.readFileSync(yamlPath, 'utf8');

// Parse YAML to JavaScript object
const dashboardConfig = yaml.load(yamlContent);

// Function to recursively clean up card_mod style strings
// Converts multi-line CSS with \n to single-line CSS
function cleanCardModStyles(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cleanCardModStyles(item));
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === 'card_mod' && value && typeof value === 'object' && typeof value.style === 'string') {
      // Clean up the CSS: remove newlines and extra spaces, convert to single line
      const cleanStyle = value.style
        .replace(/\n/g, ' ')        // Replace newlines with spaces
        .replace(/\s+/g, ' ')        // Collapse multiple spaces to single space
        .trim();                     // Remove leading/trailing whitespace
      cleaned[key] = { style: cleanStyle };
    } else if (typeof value === 'object') {
      cleaned[key] = cleanCardModStyles(value);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

// Clean up card_mod styles in the config
const cleanedConfig = cleanCardModStyles(dashboardConfig);

// Read the existing JS strategy file template (the original clean file)
const jsPath = path.join(__dirname, 'cew-dashboard-strategy.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Convert the dashboard config to a formatted JS string with proper indentation
// Add 6 spaces of base indentation to align with the return statement
const configString = JSON.stringify(cleanedConfig, null, 2)
  .split('\n')
  .map((line, index) => index === 0 ? line : '      ' + line)
  .join('\n');

// Find the start "return {"
const returnStart = jsContent.indexOf('return {');
if (returnStart === -1) {
  throw new Error('Could not find "return {" in JS file');
}

// Find "} catch (error) {"
const catchStart = jsContent.indexOf('} catch (error) {');
if (catchStart === -1) {
  throw new Error('Could not find "} catch (error) {" in JS file');
}

// The return statement should end right before the catch
// We need to replace everything between "return" and the closing }; before catch
const before = jsContent.substring(0, returnStart);
const after = jsContent.substring(catchStart); // Start from the } catch

const newJsContent = before + 'return ' + configString + ';\n    ' + after;

// Write the updated JS file
fs.writeFileSync(jsPath, newJsContent, 'utf8');

console.log('✅ Successfully converted YAML dashboard to JS strategy file!');
console.log(`📄 Updated: ${jsPath}`);
console.log(`📊 Dashboard config extracted from: ${yamlPath}`);
