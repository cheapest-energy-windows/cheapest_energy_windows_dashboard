## Cheapest Energy Windows Dashboard

Beautiful, comprehensive dashboard for visualizing and managing your energy windows.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=cheapest-energy-windows&repository=cheapest_energy_windows_dashboard&category=dashboard)

### ⚠️ Prerequisites

**This dashboard requires the main integration!**

Make sure you have installed:
- [Cheapest Energy Windows Integration](https://github.com/cheapest-energy-windows/cheapest_energy_windows)

### Required Custom Cards

Install these from HACS → Frontend:
- Mushroom Cards
- ApexCharts Card
- Card Mod
- Fold Entity Row

### Quick Start

> ✨ Click the badge above for one-click HACS installation, or follow these manual steps:

1. Open HACS in Home Assistant
2. Click on "Frontend"
3. Search for "Cheapest Energy Windows Dashboard"
4. Click "Download"
5. Add to `/config/configuration.yaml`:

```yaml
lovelace:
  mode: storage
  dashboards:
    lovelace-energy-windows:
      mode: yaml
      title: Energy Windows
      icon: mdi:lightning-bolt
      show_in_sidebar: true
      filename: dashboards/energy_windows.yaml
```

6. Create `/config/dashboards/energy_windows.yaml`:

```yaml
strategy:
  type: custom:dashboard-cheapest-energy-windows
```

7. Restart Home Assistant - your dashboard appears automatically! ✨

### What You Get

- 📊 Visual charts for today and tomorrow
- ⚡ Charge/discharge window displays
- ⚙️ Full configuration panel
- 💰 Cost tracking and projections
- 🔋 Battery management (if enabled)

## Support

- [Integration Documentation](https://github.com/cheapest-energy-windows/cheapest_energy_windows)
- [Report Issues](https://github.com/cheapest-energy-windows/cheapest_energy_windows_dashboard/issues)
- [Community Discussion](https://community.home-assistant.io/)

{% if installed %}
## Installed Version: {{ version }}

Thank you for using Cheapest Energy Windows Dashboard!

### Next Steps
- Configure your integration settings through the dashboard
- Set up battery operations linking if you have a battery system
- Check the integration's sensors for detailed energy data
{% endif %}
