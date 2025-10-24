const fs = require('fs');
const yaml = require('js-yaml');

const yamlContent = fs.readFileSync('../cheapest_energy_windows_dashboard_yaml/dashboard.yaml', 'utf8');
const parsed = yaml.load(yamlContent);

// Find a card_mod example
function findCardMod(obj, depth = 0) {
  if (depth > 20) return false;
  if (typeof obj !== 'object' || obj === null) return false;

  if (obj.card_mod && obj.card_mod.style) {
    console.log('card_mod.style type:', typeof obj.card_mod.style);
    console.log('card_mod.style value (first 150 chars):', obj.card_mod.style.substring(0, 150));
    console.log('Stringified:', JSON.stringify(obj.card_mod).substring(0, 150));
    return true;
  }

  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (findCardMod(item, depth + 1)) return true;
      }
    } else if (findCardMod(value, depth + 1)) {
      return true;
    }
  }
  return false;
}

findCardMod(parsed);
