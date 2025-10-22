# Cheapest Energy Windows Dashboard

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

A beautiful, comprehensive dashboard for the [Cheapest Energy Windows](https://github.com/cew-hacs/cheapest_energy_windows) Home Assistant integration.

![Dashboard Preview](CEW-Dashboard.jpg)

## 📋 Prerequisites

This dashboard **requires** the main Cheapest Energy Windows integration to be installed first:

1. Install the [Cheapest Energy Windows Integration](https://github.com/cew-hacs/cheapest_energy_windows) via HACS
2. Configure the integration with your Nord Pool sensor

## 🚀 Installation

### Via HACS

1. Open HACS in Home Assistant
2. Click on "Frontend"
3. Click the 3 dots menu (top right) → "Custom repositories"
4. Add this repository URL: `https://github.com/YOUR_USERNAME/cheapest_energy_windows_dashboard`
5. Select category: "Dashboard"
6. Click "Add"
7. Find "Cheapest Energy Windows Dashboard" in the list and click "Download"
8. The resource will be automatically added to your Home Assistant

## 📊 Usage

### Creating the Dashboard

1. Go to **Settings → Dashboards**
2. Click **"+ Add Dashboard"** (bottom right)
3. Fill in:
   - **Title**: `Energy Windows` (or any name you prefer)
   - **Icon**: `mdi:lightning-bolt` (optional)
   - **URL**: `energy-windows` (or your preference)
   - Toggle **"Show in sidebar"** ON
4. Click **"Create"**
5. After the dashboard is created, click the **⋮ menu** (three dots) → **"Edit Dashboard"**
6. Click **⋮ menu** again → **"Raw configuration editor"**
7. Replace all content with:

```yaml
strategy:
  type: custom:dashboard-cheapest-energy-windows
views: []
```

8. Click **"Save"**
9. The dashboard will automatically load with all cards configured! ✨

## ✨ Features

The dashboard includes:

- **📅 Today's Energy Windows** - View current charge/discharge periods with pricing
- **🌅 Tomorrow's Energy Windows** - Plan ahead with tomorrow's schedules (after 13:00 CET)
- **⚙️ Configuration Panel** - Adjust all settings directly from the dashboard
- **📊 Visual Charts** - ApexCharts showing energy periods throughout the day
- **⚡ Real-time Status** - See current mode and active overrides
- **🔋 Battery Management** - (If battery section enabled) Monitor SOC, charge/discharge rates
- **💰 Cost Tracking** - Financial summaries and projections

## 🎨 Required Custom Cards

This dashboard uses several custom Lovelace cards. Install these via HACS Frontend:

### Required
- [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom)
- [ApexCharts Card](https://github.com/RomRider/apexcharts-card)
- [Card Mod](https://github.com/thomasloven/lovelace-card-mod)

### Optional (for full functionality)
- [Fold Entity Row](https://github.com/thomasloven/lovelace-fold-entity-row)

## 🐛 Troubleshooting

### Dashboard shows "Custom element doesn't exist"
- Make sure all required custom cards are installed
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Verify the resource is loaded in Settings → Dashboards → Resources

### Dashboard is empty or shows errors
- Ensure the Cheapest Energy Windows integration is installed and configured
- Check that your Nord Pool sensor is working
- Verify all entities from the integration exist

### Strategy not appearing in dropdown
- Verify the resource is added as "JavaScript Module" type
- Clear browser cache and restart Home Assistant
- Check browser console for errors (F12)

## 🤝 Support

For issues specific to:
- **This dashboard**: Open an issue in this repository
- **The integration**: Visit the [main integration repository](https://github.com/cew-hacs/cheapest_energy_windows)

## 📝 License

MIT License - feel free to modify and share!

## ☕ Support the Project

If you find this dashboard useful, consider supporting the main integration developer:

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/cheapest_energy_windows)
