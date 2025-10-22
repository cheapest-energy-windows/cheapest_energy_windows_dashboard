## Cheapest Energy Windows Dashboard

Beautiful, comprehensive dashboard for visualizing and managing your energy windows.

### ⚠️ Prerequisites

**This dashboard requires the main integration!**

Make sure you have installed:
- [Cheapest Energy Windows Integration](https://github.com/cew-hacs/cheapest_energy_windows)

### Required Custom Cards

Install these from HACS → Frontend:
- Mushroom Cards
- ApexCharts Card
- Card Mod
- Fold Entity Row

### Quick Start

After installation, add to `/config/configuration.yaml`:

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

Create `/config/dashboards/energy_windows.yaml`:

```yaml
strategy:
  type: custom:dashboard-cheapest-energy-windows
```

Restart HA - your dashboard appears automatically! ✨

### What You Get

- 📊 Visual charts for today and tomorrow
- ⚡ Charge/discharge window displays
- ⚙️ Full configuration panel
- 💰 Cost tracking and projections
- 🔋 Battery management (if enabled)

---

For detailed documentation, see the README.
