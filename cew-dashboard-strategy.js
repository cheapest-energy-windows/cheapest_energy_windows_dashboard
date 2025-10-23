class CheapestEnergyWindowsStrategy extends HTMLElement {
  static async generate(info, entities) {
    // Dashboard configuration
    return {
      "views": [
            {
                  "title": "Cheapest Energy Windows",
                  "sections": [
                        {
                              "type": "grid",
                              "cards": [
                                    {
                                          "type": "vertical-stack",
                                          "cards": [
                                                {
                                                      "type": "custom:mushroom-title-card",
                                                      "title": "\ud83d\udcc5 Today's Energy Windows",
                                                      "subtitle": "{{ now().strftime('%A, %B %d') }}"
                                                },
                                                {
                                                      "type": "horizontal-stack",
                                                      "cards": [
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Average Price",
                                                                  "secondary": "{% set sensorName = states('text.cew_price_sensor_entity') or 'sensor.nordpool_kwh_nl_eur_3_10_0' %} {% set nordpool = states[sensorName] %} {% set add = states('number.cew_additional_cost') | float(0.02398) %} {% set tax = states('number.cew_tax') | float(0.12286) %} {% set vat = states('number.cew_vat') | float if states('number.cew_vat') not in ['unknown', 'unavailable', 'none'] else 0.21 %} {% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %} {% set ns = namespace(prices=[]) %} {% if nordpool.attributes.raw_today %} {% if pricing_mode == '1_hour' %} {% for hour in range(24) %} {% set hour_sum = namespace(value=0, count=0) %} {% set hour_str = '%02d' | format(hour) %} {% for item in nordpool.attributes.raw_today %} {% set timestamp = item.start | replace('\"', '') %} {% if timestamp[11:13] == hour_str %} {% set hour_sum.value = hour_sum.value + item.value %} {% set hour_sum.count = hour_sum.count + 1 %} {% endif %} {% endfor %} {% if hour_sum.count > 0 %} {% set avg_value = hour_sum.value / hour_sum.count %} {% set actual_price = avg_value * (1 + vat) + tax + add %} {% set ns.prices = ns.prices + [actual_price] %} {% endif %} {% endfor %} {% else %}\n  {% for item in nordpool.attributes.raw_today %}\n    {% set actual_price = (item.value | float(0)) * (1 + vat) + tax + add %}\n    {% set ns.prices = ns.prices + [actual_price] %}\n  {% endfor %} {% endif %}\n{% endif %} {% set avg_price = (ns.prices | sum / ns.prices | length) if ns.prices | length > 0 else 0 %} \u20ac{{ avg_price | round(3) }}/kWh",
                                                                  "icon": "mdi:chart-line-variant",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "blue",
                                                                  "features_position": "bottom",
                                                                  "multiline_secondary": false,
                                                                  "vertical": true
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Cheap Avg",
                                                                  "secondary": "\u20ac{{ state_attr('sensor.cew_today', 'avg_cheap_price') | float(0) | round(3) }}/kWh",
                                                                  "icon": "mdi:arrow-down-circle",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "green",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Expensive Avg",
                                                                  "secondary": "\u20ac{{ state_attr('sensor.cew_today', 'avg_expensive_price') | float(0) | round(3) }}/kWh",
                                                                  "icon": "mdi:arrow-up-circle",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "red",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:apexcharts-card",
                                                      "graph_span": "24h",
                                                      "span": {
                                                            "start": "day"
                                                      },
                                                      "now": {
                                                            "show": true,
                                                            "label": "Now",
                                                            "color": "#ffffff"
                                                      },
                                                      "header": {
                                                            "show": false
                                                      },
                                                      "update_interval": "5s",
                                                      "yaxis": [
                                                            {
                                                                  "id": "status",
                                                                  "show": false,
                                                                  "min": 0,
                                                                  "max": 1
                                                            }
                                                      ],
                                                      "apex_config": {
                                                            "chart": {
                                                                  "height": 160,
                                                                  "toolbar": {
                                                                        "show": false
                                                                  },
                                                                  "animations": {
                                                                        "enabled": true,
                                                                        "easing": "easeinout",
                                                                        "speed": 600,
                                                                        "animateGradually": {
                                                                              "enabled": true,
                                                                              "delay": 50
                                                                        }
                                                                  },
                                                                  "dropShadow": {
                                                                        "enabled": true,
                                                                        "top": 2,
                                                                        "left": 0,
                                                                        "blur": 6,
                                                                        "opacity": 0.25
                                                                  }
                                                            },
                                                            "plotOptions": {
                                                                  "bar": {
                                                                        "columnWidth": "100%",
                                                                        "borderRadius": 3,
                                                                        "borderRadiusApplication": "end"
                                                                  }
                                                            },
                                                            "stroke": {
                                                                  "show": true,
                                                                  "width": 1,
                                                                  "colors": [
                                                                        "rgba(255, 255, 255, 0.25)"
                                                                  ]
                                                            },
                                                            "dataLabels": {
                                                                  "enabled": false
                                                            },
                                                            "grid": {
                                                                  "show": true,
                                                                  "borderColor": "#e5e7eb",
                                                                  "strokeDashArray": 4,
                                                                  "position": "back",
                                                                  "xaxis": {
                                                                        "lines": {
                                                                              "show": false
                                                                        }
                                                                  },
                                                                  "yaxis": {
                                                                        "lines": {
                                                                              "show": false
                                                                        }
                                                                  },
                                                                  "padding": {
                                                                        "left": 20,
                                                                        "right": 20,
                                                                        "top": 0,
                                                                        "bottom": 0
                                                                  }
                                                            },
                                                            "tooltip": {
                                                                  "enabled": true,
                                                                  "custom": "EVAL:function({seriesIndex, dataPointIndex, w}) {\n  const data = w.config.series[0].data[dataPointIndex];\n  const baseStyle = 'padding: 10px 12px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;';\n  if (data.override && data.overrideMode === 'idle') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udca4 Time Override: Idle</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced idle/smart meter mode</div></div>';\n  if (data.override && data.overrideMode === 'charge') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%); color: #1a2e05;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\u26a1 Time Override: Charging</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced charging period</div></div>';\n  if (data.override && data.overrideMode === 'discharge') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udd0c Time Override: Discharging</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced discharging period</div></div>';\n  if (data.override && data.overrideMode === 'discharge_aggressive') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\u26a1 Time Override: Peak Discharge</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced aggressive discharge</div></div>';\n  if (data.cheap) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udd0b Charging Window</div><div style=\"font-size: 12px; opacity: 0.9;\">Cheap energy period</div></div>';\n  if (data.expensiveAggressive) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\u26a1 Peak Discharge</div><div style=\"font-size: 12px; opacity: 0.9;\">Maximum price opportunity</div></div>';\n  if (data.expensive) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udd0c Discharge Window</div><div style=\"font-size: 12px; opacity: 0.9;\">Elevated price period</div></div>';\n  return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udca1 Normal Period</div><div style=\"font-size: 12px; opacity: 0.9;\">Smart meter mode</div></div>';\n}\n"
                                                            }
                                                      },
                                                      "series": [
                                                            {
                                                                  "entity": "sensor.nordpool_kwh_nl_eur_3_10_0",
                                                                  "name": "Energy Periods",
                                                                  "type": "column",
                                                                  "data_generator": "const sensorName = hass.states['text.cew_price_sensor_entity']?.state || 'sensor.nordpool_kwh_nl_eur_3_10_0'; const nordpool = hass.states[sensorName]; const cheapest = hass.states['sensor.cew_today']; if (!nordpool?.attributes?.raw_today || !cheapest?.attributes) return [];\nconst pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes';\nconst cheapestTimes = cheapest.attributes.cheapest_times || []; const expensiveTimes = cheapest.attributes.expensive_times || []; const expensiveAggressiveTimes = cheapest.attributes.expensive_times_aggressive || []; const spreadMet = cheapest.attributes.spread_met; const dischargeSpreadMet = cheapest.attributes.discharge_spread_met;\nconst cheapestSet = new Set(cheapestTimes.map(t => new Date(t).getTime())); const expensiveSet = new Set(expensiveTimes.map(t => new Date(t).getTime())); const expensiveAggressiveSet = new Set(expensiveAggressiveTimes.map(t => new Date(t).getTime()));\nconst override1Enabled = hass.states['switch.cew_time_override_enabled']?.state === 'on'; const override1Start = hass.states['time.cew_time_override_start']?.state; const override1End = hass.states['time.cew_time_override_end']?.state; const override1Mode = hass.states['select.cew_time_override_mode']?.state;\nfunction isInTimeRange(timeMs, startTime, endTime) {\n  const date = new Date(timeMs);\n  const timeStr = date.toTimeString().substring(0, 8);\n  return startTime <= timeStr && timeStr < endTime;\n}\nlet rawData = nordpool.attributes.raw_today;\nconst cheapestHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(cheapestSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\nconst expensiveHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(expensiveSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\nconst expensiveAggressiveHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(expensiveAggressiveSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\n\nreturn rawData.map(item => {\n  const time = new Date(item.start).getTime();\n\n  let isCheap, isExpensive, isExpensiveAggressive;\n  if (pricingMode === '1_hour') {\n    const hourStart = Math.floor(time / 3600000) * 3600000;\n    isCheap = (cheapestTimes.length > 0) && cheapestHours.has(hourStart);\n    isExpensiveAggressive = expensiveAggressiveHours.has(hourStart);\n    isExpensive = (expensiveTimes.length > 0) && expensiveHours.has(hourStart);\n  } else {\n    isCheap = (cheapestTimes.length > 0) && cheapestSet.has(time);\n    isExpensiveAggressive = expensiveAggressiveSet.has(time);\n    isExpensive = (expensiveTimes.length > 0) && expensiveSet.has(time);\n  }\n\n  const isOverride = override1Enabled && override1Start && override1End && isInTimeRange(time, override1Start, override1End);\n  const overrideMode = isOverride ? override1Mode : null;\n\n  let color = 'transparent';\n  if (isOverride && overrideMode === 'idle') color = 'transparent';\n  else if (isOverride && overrideMode === 'charge') color = '#a3e635';\n  else if (isOverride && overrideMode === 'discharge') color = '#fb923c';\n  else if (isOverride && overrideMode === 'discharge_aggressive') color = '#dc2626';\n  else if (isCheap) color = '#22c55e';\n  else if (isExpensiveAggressive) color = '#dc2626';\n  else if (isExpensive) color = '#f97316';\n\n  return {\n    x: time,\n    y: 1,\n    fillColor: color,\n    cheap: isCheap,\n    expensive: isExpensive,\n    expensiveAggressive: isExpensiveAggressive,\n    override: isOverride,\n    overrideMode: overrideMode\n  };\n});\n",
                                                                  "stroke_width": 0
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:apexcharts-card",
                                                      "graph_span": "24h",
                                                      "span": {
                                                            "start": "day"
                                                      },
                                                      "now": {
                                                            "show": true,
                                                            "label": "Now",
                                                            "color": "#ffffff"
                                                      },
                                                      "header": {
                                                            "show": false
                                                      },
                                                      "update_interval": "12s",
                                                      "apex_config": {
                                                            "chart": {
                                                                  "height": 240,
                                                                  "toolbar": {
                                                                        "show": false
                                                                  },
                                                                  "animations": {
                                                                        "enabled": true,
                                                                        "easing": "easeinout",
                                                                        "speed": 800
                                                                  },
                                                                  "dropShadow": {
                                                                        "enabled": true,
                                                                        "top": 3,
                                                                        "left": 0,
                                                                        "blur": 6,
                                                                        "opacity": 0.2
                                                                  }
                                                            },
                                                            "stroke": {
                                                                  "curve": "smooth",
                                                                  "width": 2
                                                            },
                                                            "dataLabels": {
                                                                  "enabled": false
                                                            },
                                                            "fill": {
                                                                  "type": "gradient",
                                                                  "gradient": {
                                                                        "shadeIntensity": 1,
                                                                        "opacityFrom": 0.7,
                                                                        "opacityTo": 0.2,
                                                                        "stops": [
                                                                              0,
                                                                              90,
                                                                              100
                                                                        ]
                                                                  }
                                                            },
                                                            "grid": {
                                                                  "show": true,
                                                                  "borderColor": "#f0f0f0",
                                                                  "strokeDashArray": 3,
                                                                  "position": "back",
                                                                  "xaxis": {
                                                                        "lines": {
                                                                              "show": false
                                                                        }
                                                                  },
                                                                  "yaxis": {
                                                                        "lines": {
                                                                              "show": true
                                                                        }
                                                                  },
                                                                  "padding": {
                                                                        "left": 20,
                                                                        "right": 20,
                                                                        "top": 10,
                                                                        "bottom": 0
                                                                  }
                                                            },
                                                            "tooltip": {
                                                                  "enabled": true,
                                                                  "theme": "dark",
                                                                  "x": {
                                                                        "format": "HH:mm"
                                                                  },
                                                                  "y": {
                                                                        "formatter": "EVAL:function(value) {\n  return '\u20ac' + value.toFixed(3) + '/kWh';\n}\n"
                                                                  },
                                                                  "style": {
                                                                        "fontSize": "13px"
                                                                  }
                                                            },
                                                            "markers": {
                                                                  "size": 0,
                                                                  "hover": {
                                                                        "size": 6
                                                                  }
                                                            },
                                                            "yaxis": {
                                                                  "decimalsInFloat": 3,
                                                                  "labels": {
                                                                        "formatter": "EVAL:function(value) {\n  return '\u20ac' + value.toFixed(3);\n}\n",
                                                                        "style": {
                                                                              "fontSize": "11px"
                                                                        }
                                                                  }
                                                            }
                                                      },
                                                      "series": [
                                                            {
                                                                  "entity": "sensor.nordpool_kwh_nl_eur_3_10_0",
                                                                  "name": "Price",
                                                                  "type": "area",
                                                                  "stroke_width": 2,
                                                                  "color": "#3b82f6",
                                                                  "data_generator": "const sensorName = hass.states['text.cew_price_sensor_entity']?.state || 'sensor.nordpool_kwh_nl_eur_3_10_0'; const nordpool = hass.states[sensorName];\nif (!nordpool?.attributes?.raw_today) return [];\nconst pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes';\nconst add = parseFloat(hass.states['number.cew_additional_cost'].state) || 0.02398;\nconst tax = parseFloat(hass.states['number.cew_tax'].state) || 0.12286;\nconst vat = hass.states['number.cew_vat']?.state !== undefined ? parseFloat(hass.states['number.cew_vat'].state) : 0.21;\nlet rawData = nordpool.attributes.raw_today;\nif (pricingMode === '1_hour') {\n  const hourlyData = {};\n  rawData.forEach(item => {\n    const time = new Date(item.start).getTime();\n    const hourStart = Math.floor(time / 3600000) * 3600000;\n    if (!hourlyData[hourStart]) {\n      hourlyData[hourStart] = { values: [], count: 0 };\n    }\n    hourlyData[hourStart].values.push(item.value);\n    hourlyData[hourStart].count++;\n  });\n  rawData = Object.keys(hourlyData).map(h => {\n    const avgValue = hourlyData[h].values.reduce((a, b) => a + b, 0) / hourlyData[h].count;\n    return { start: new Date(parseInt(h)).toISOString(), value: avgValue };\n  });\n}\nreturn rawData.map(item => {\n  const price = (item.value * (1 + vat)) + tax + add;\n  return [new Date(item.start).getTime(), price];\n});\n"
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "horizontal-stack",
                                                      "cards": [
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Spread",
                                                                  "secondary": "{{ state_attr('sensor.cew_today', 'actual_spread_avg') | float(0) | round(1) }}%",
                                                                  "icon": "mdi:percent",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "{% if state_attr('sensor.cew_today', 'actual_spread_avg') | float(0) >= 30 %}green\n{% elif state_attr('sensor.cew_today', 'actual_spread_avg') | float(0) >= 15 %}orange\n{% else %}red\n{% endif %}\n",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Charge",
                                                                  "secondary": "{% set total = state_attr('sensor.cew_today', 'actual_charge_times') | default([]) | length %}{% set completed = state_attr('sensor.cew_today', 'completed_charge_windows') | int(0) %}{{ completed }}/{{ total }}",
                                                                  "icon": "mdi:battery-charging",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "{% if state_attr('sensor.cew_today', 'actual_charge_times') | length > 0 %}green\n{% else %}grey\n{% endif %}\n",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Discharge",
                                                                  "secondary": "{% set total = state_attr('sensor.cew_today', 'actual_discharge_times') | default([]) | length %}{% set completed = state_attr('sensor.cew_today', 'completed_discharge_windows') | int(0) %}{{ completed }}/{{ total }}",
                                                                  "icon": "mdi:battery-minus",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "{% set count = state_attr('sensor.cew_today', 'actual_discharge_times') | default([]) | length %}\n{% if count > 0 %}orange\n{% else %}grey\n{% endif %}\n",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Daily Net Cost",
                                                                  "secondary": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([]) | length %}\n{% set num_expensive = state_attr('sensor.cew_today', 'actual_discharge_times') | default([]) | length %}\n{% set actual_charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') or [] %}\n{% set avg_cheap = (actual_charge_prices | sum / actual_charge_prices | length) if actual_charge_prices | length > 0 else 0 %}\n{% set actual_discharge_prices = state_attr('sensor.cew_today', 'actual_discharge_prices') or [] %}\n{% set avg_expensive = (actual_discharge_prices | sum / actual_discharge_prices | length) if actual_discharge_prices | length > 0 else 0 %}\n{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}\n{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}\n{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}\n{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}\n{% set charged_kwh = num_cheap * window_duration * charge_power %}\n{% set usable_kwh = charged_kwh * rte %}\n{% set discharged_kwh = num_expensive * window_duration * discharge_power %}\n{% set actual_discharged = discharged_kwh %}\n{% set charge_cost = charged_kwh * avg_cheap %}\n{% set discharge_revenue = actual_discharged * avg_expensive %}\n{% set net_cost_total = charge_cost - discharge_revenue %}\n{{ '\u20ac' + (net_cost_total | round(2) | string) }}",
                                                                  "icon": "mdi:currency-eur",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([]) | length %}\n{% set num_expensive = state_attr('sensor.cew_today', 'actual_discharge_times') | default([]) | length %}\n{% set actual_charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') or [] %}\n{% set avg_cheap = (actual_charge_prices | sum / actual_charge_prices | length) if actual_charge_prices | length > 0 else 0 %}\n{% set actual_discharge_prices = state_attr('sensor.cew_today', 'actual_discharge_prices') or [] %}\n{% set avg_expensive = (actual_discharge_prices | sum / actual_discharge_prices | length) if actual_discharge_prices | length > 0 else 0 %}\n{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}\n{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}\n{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}\n{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}\n{% set charged_kwh = num_cheap * window_duration * charge_power %}\n{% set usable_kwh = charged_kwh * rte %}\n{% set discharged_kwh = num_expensive * window_duration * discharge_power %}\n{% set actual_discharged = discharged_kwh %}\n{% set charge_cost = charged_kwh * avg_cheap %}\n{% set discharge_revenue = actual_discharged * avg_expensive %}\n{% set net_cost = charge_cost - discharge_revenue %}\n{% if net_cost < 0 %}green\n{% elif net_cost > 0 %}red\n{% else %}grey\n{% endif %}\n",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:fold-entity-row",
                                                      "head": {
                                                            "type": "section",
                                                            "label": "\u2699\ufe0f Today's Settings (Active Now)"
                                                      },
                                                      "padding": 0,
                                                      "entities": [
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83e\ude9f Window Selection"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "number.cew_charging_windows",
                                                                              "name": "Charging Windows (max)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_expensive_windows",
                                                                              "name": "Expensive Windows (max)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_cheap_percentile",
                                                                              "name": "Cheap Percentile Threshold"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_expensive_percentile",
                                                                              "name": "Expensive Percentile Threshold"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83d\udcca Spread & Price Thresholds"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "number.cew_min_spread",
                                                                              "name": "Min Spread (Charging)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_min_spread_discharge",
                                                                              "name": "Min Spread (Discharging)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_aggressive_discharge_spread",
                                                                              "name": "Min Spread (Aggressive)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_min_price_difference",
                                                                              "name": "Min Absolute Price Difference"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83d\udcb0 Price Override (Always Charge Below)"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "switch.cew_price_override_enabled",
                                                                              "name": "Enable Price Override"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_price_override_threshold",
                                                                              "name": "Price Override Threshold"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\u23f0 Time Override (Force Action During Period)"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "switch.cew_time_override_enabled",
                                                                              "name": "Enable Time Override"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_time_override_start",
                                                                              "name": "Start Time"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_time_override_end",
                                                                              "name": "End Time"
                                                                        },
                                                                        {
                                                                              "entity": "select.cew_time_override_mode",
                                                                              "name": "Override Mode"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83e\ude9f Calculation Window (Restrict Price Analysis)"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "switch.cew_calculation_window_enabled",
                                                                              "name": "Enable Calculation Window"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_calculation_window_start",
                                                                              "name": "Window Start Time"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_calculation_window_end",
                                                                              "name": "Window End Time"
                                                                        }
                                                                  ]
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "markdown",
                                                      "entities": [
                                                            "sensor.cew_today"
                                                      ],
                                                      "card_mod": {
                                                            "style": "ha-card {\n  min-height: 200px;\n}\n"
                                                      },
                                                      "content": "**\u26a1 Charge Windows** ({{ state_attr('sensor.cew_today', 'cheapest_times') | default([]) | length }} periods){% set times = state_attr('sensor.cew_today', 'cheapest_times') %}{% set prices = state_attr('sensor.cew_today', 'cheapest_prices') %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %}{% set total_cost = (prices | sum) * window_duration * charge_power_kw if prices else 0 %}{% if prices and prices | length > 0 %} \u2022 Cost: \u20ac{{ total_cost | round(2) }}{% endif %}\n{% if times and times | length > 0 %} {% set window_seconds = 3600 if states('select.cew_pricing_window_duration') == '1_hour' else 900 %} {% set ns = namespace(items=[], groups=[]) %} {% for i in range(times | length) %} {% set ns.items = ns.items + [{'time': as_timestamp(times[i]), 'price': prices[i]}] %} {% endfor %} {% set sorted_items = ns.items | sort(attribute='time') %} {% set ns = namespace(current_group={'start': sorted_items[0].time, 'end': sorted_items[0].time + window_seconds, 'prices': [sorted_items[0].price]}, groups=[]) %} {% for item in sorted_items[1:] %} {% if item.time == ns.current_group.end %} {% set ns.current_group = {'start': ns.current_group.start, 'end': item.time + window_seconds, 'prices': ns.current_group.prices + [item.price]} %} {% else %} {% set ns.groups = ns.groups + [ns.current_group] %} {% set ns.current_group = {'start': item.time, 'end': item.time + window_seconds, 'prices': [item.price]} %} {% endif %} {% endfor %} {% set ns.groups = ns.groups + [ns.current_group] %} {% for group in ns.groups %} **{{ group.start | timestamp_custom('%H:%M') }}-{{ group.end | timestamp_custom('%H:%M') }}** \u2022 Avg: \u20ac{{ (group.prices | sum / group.prices | length) | round(3) }}{% if not loop.last %}\n{% endif %} {% endfor %} {% else %} *No charge windows scheduled* {% endif %}\n&nbsp;\n**\ud83d\udd0b Discharge Windows** ({{ state_attr('sensor.cew_today', 'expensive_times') | default([]) | length }} periods){% set times = state_attr('sensor.cew_today', 'expensive_times') %}{% set prices = state_attr('sensor.cew_today', 'expensive_prices') %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %}{% set total_revenue = (prices | sum) * window_duration * discharge_power_kw if prices else 0 %}{% if prices and prices | length > 0 %} \u2022 Revenue: \u20ac{{ total_revenue | round(2) }}{% endif %}\n{% if times and times | length > 0 %} {% set window_seconds = 3600 if states('select.cew_pricing_window_duration') == '1_hour' else 900 %} {% set ns = namespace(items=[], groups=[]) %} {% for i in range(times | length) %} {% set ns.items = ns.items + [{'time': as_timestamp(times[i]), 'price': prices[i]}] %} {% endfor %} {% set sorted_items = ns.items | sort(attribute='time') %} {% set ns = namespace(current_group={'start': sorted_items[0].time, 'end': sorted_items[0].time + window_seconds, 'prices': [sorted_items[0].price]}, groups=[]) %} {% for item in sorted_items[1:] %} {% if item.time == ns.current_group.end %} {% set ns.current_group = {'start': ns.current_group.start, 'end': item.time + window_seconds, 'prices': ns.current_group.prices + [item.price]} %} {% else %} {% set ns.groups = ns.groups + [ns.current_group] %} {% set ns.current_group = {'start': item.time, 'end': item.time + window_seconds, 'prices': [item.price]} %} {% endif %} {% endfor %} {% set ns.groups = ns.groups + [ns.current_group] %} {% for group in ns.groups %} **{{ group.start | timestamp_custom('%H:%M') }}-{{ group.end | timestamp_custom('%H:%M') }}** \u2022 Avg: \u20ac{{ (group.prices | sum / group.prices | length) | round(3) }}{% if not loop.last %}\n{% endif %} {% endfor %} {% else %} *No discharge windows scheduled* {% endif %}"
                                                }
                                          ]
                                    }
                              ]
                        },
                        {
                              "type": "grid",
                              "cards": [
                                    {
                                          "type": "vertical-stack",
                                          "cards": [
                                                {
                                                      "type": "custom:mushroom-title-card",
                                                      "title": "\ud83d\udcc5 Tomorrow's Energy Windows",
                                                      "subtitle": "{{ (now() + timedelta(days=1)).strftime('%A, %B %d') }}"
                                                },
                                                {
                                                      "type": "horizontal-stack",
                                                      "cards": [
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Average Price",
                                                                  "secondary": "{% set sensorName = states('text.cew_price_sensor_entity') or 'sensor.nordpool_kwh_nl_eur_3_10_0' %} {% set nordpool = states[sensorName] %} {% set add = states('number.cew_additional_cost') | float(0.02398) %} {% set tax = states('number.cew_tax') | float(0.12286) %} {% set vat = states('number.cew_vat') | float if states('number.cew_vat') not in ['unknown', 'unavailable', 'none'] else 0.21 %} {% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %} {% set ns = namespace(prices=[]) %} {% if nordpool.attributes.raw_tomorrow %} {% if pricing_mode == '1_hour' %} {% for hour in range(24) %} {% set hour_sum = namespace(value=0, count=0) %} {% set hour_str = '%02d' | format(hour) %} {% for item in nordpool.attributes.raw_tomorrow %} {% set timestamp = item.start | replace('\"', '') %} {% if timestamp[11:13] == hour_str %} {% set hour_sum.value = hour_sum.value + item.value %} {% set hour_sum.count = hour_sum.count + 1 %} {% endif %} {% endfor %} {% if hour_sum.count > 0 %} {% set avg_value = hour_sum.value / hour_sum.count %} {% set actual_price = avg_value * (1 + vat) + tax + add %} {% set ns.prices = ns.prices + [actual_price] %} {% endif %} {% endfor %} {% else %}\n  {% for item in nordpool.attributes.raw_tomorrow %}\n    {% set actual_price = (item.value | float(0)) * (1 + vat) + tax + add %}\n    {% set ns.prices = ns.prices + [actual_price] %}\n  {% endfor %} {% endif %}\n{% endif %} {% set avg_price = (ns.prices | sum / ns.prices | length) if ns.prices | length > 0 else 0 %} \u20ac{{ avg_price | round(3) }}/kWh",
                                                                  "icon": "mdi:chart-line-variant",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "blue",
                                                                  "features_position": "bottom",
                                                                  "multiline_secondary": false,
                                                                  "vertical": true
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Cheap Avg",
                                                                  "secondary": "\u20ac{{ state_attr('sensor.cew_tomorrow', 'avg_cheap_price') | float(0) | round(3) }}/kWh",
                                                                  "icon": "mdi:arrow-down-circle",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "green",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Expensive Avg",
                                                                  "secondary": "\u20ac{{ state_attr('sensor.cew_tomorrow', 'avg_expensive_price') | float(0) | round(3) }}/kWh",
                                                                  "icon": "mdi:arrow-up-circle",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "red",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:apexcharts-card",
                                                      "graph_span": "24h",
                                                      "span": {
                                                            "start": "day",
                                                            "offset": "+1d"
                                                      },
                                                      "header": {
                                                            "show": false
                                                      },
                                                      "update_interval": "5s",
                                                      "yaxis": [
                                                            {
                                                                  "id": "status",
                                                                  "show": false,
                                                                  "min": 0,
                                                                  "max": 1
                                                            }
                                                      ],
                                                      "apex_config": {
                                                            "chart": {
                                                                  "height": 160,
                                                                  "toolbar": {
                                                                        "show": false
                                                                  },
                                                                  "animations": {
                                                                        "enabled": true,
                                                                        "easing": "easeinout",
                                                                        "speed": 600,
                                                                        "animateGradually": {
                                                                              "enabled": true,
                                                                              "delay": 50
                                                                        }
                                                                  },
                                                                  "dropShadow": {
                                                                        "enabled": true,
                                                                        "top": 2,
                                                                        "left": 0,
                                                                        "blur": 6,
                                                                        "opacity": 0.25
                                                                  }
                                                            },
                                                            "plotOptions": {
                                                                  "bar": {
                                                                        "columnWidth": "100%",
                                                                        "borderRadius": 3,
                                                                        "borderRadiusApplication": "end"
                                                                  }
                                                            },
                                                            "stroke": {
                                                                  "show": true,
                                                                  "width": 1,
                                                                  "colors": [
                                                                        "rgba(255, 255, 255, 0.25)"
                                                                  ]
                                                            },
                                                            "dataLabels": {
                                                                  "enabled": false
                                                            },
                                                            "grid": {
                                                                  "show": true,
                                                                  "borderColor": "#e5e7eb",
                                                                  "strokeDashArray": 4,
                                                                  "position": "back",
                                                                  "xaxis": {
                                                                        "lines": {
                                                                              "show": false
                                                                        }
                                                                  },
                                                                  "yaxis": {
                                                                        "lines": {
                                                                              "show": false
                                                                        }
                                                                  },
                                                                  "padding": {
                                                                        "left": 20,
                                                                        "right": 20,
                                                                        "top": 0,
                                                                        "bottom": 0
                                                                  }
                                                            },
                                                            "tooltip": {
                                                                  "enabled": true,
                                                                  "custom": "EVAL:function({seriesIndex, dataPointIndex, w}) {\n  const data = w.config.series[0].data[dataPointIndex];\n  const baseStyle = 'padding: 10px 12px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;';\n  if (data.override && data.overrideMode === 'idle') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udca4 Time Override: Idle</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced idle/smart meter mode</div></div>';\n  if (data.override && data.overrideMode === 'charge') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%); color: #1a2e05;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\u26a1 Time Override: Charging</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced charging period</div></div>';\n  if (data.override && data.overrideMode === 'discharge') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udd0c Time Override: Discharging</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced discharging period</div></div>';\n  if (data.override && data.overrideMode === 'discharge_aggressive') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\u26a1 Time Override: Peak Discharge</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced aggressive discharge</div></div>';\n  if (data.cheap) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udd0b Charging Window</div><div style=\"font-size: 12px; opacity: 0.9;\">Cheap energy period</div></div>';\n  if (data.expensiveAggressive) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\u26a1 Peak Discharge</div><div style=\"font-size: 12px; opacity: 0.9;\">Maximum price opportunity</div></div>';\n  if (data.expensive) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udd0c Discharge Window</div><div style=\"font-size: 12px; opacity: 0.9;\">Elevated price period</div></div>';\n  return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">\ud83d\udca1 Normal Period</div><div style=\"font-size: 12px; opacity: 0.9;\">Smart meter mode</div></div>';\n}\n"
                                                            },
                                                            "noData": {
                                                                  "text": ["\ud83d\udcc5 Becomes available", "between 13:00-15:00 CET"],
                                                                  "align": "center",
                                                                  "verticalAlign": "middle",
                                                                  "offsetY": -15,
                                                                  "style": {
                                                                        "color": "#6b7280",
                                                                        "fontSize": "20px",
                                                                        "fontWeight": "bold",
                                                                        "fontFamily": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
                                                                  }
                                                            }
                                                      },
                                                      "series": [
                                                            {
                                                                  "entity": "sensor.nordpool_kwh_nl_eur_3_10_0",
                                                                  "name": "Energy Periods",
                                                                  "type": "column",
                                                                  "data_generator": "const sensorName = hass.states['text.cew_price_sensor_entity']?.state || 'sensor.nordpool_kwh_nl_eur_3_10_0'; const nordpool = hass.states[sensorName]; const cheapest = hass.states['sensor.cew_tomorrow']; if (!nordpool?.attributes?.raw_tomorrow || !nordpool.attributes.tomorrow_valid || !cheapest?.attributes) return [];\nconst pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes';\nconst cheapestTimes = cheapest.attributes.cheapest_times || []; const expensiveTimes = cheapest.attributes.expensive_times || []; const expensiveAggressiveTimes = cheapest.attributes.expensive_times_aggressive || []; const spreadMet = cheapest.attributes.spread_met; const dischargeSpreadMet = cheapest.attributes.discharge_spread_met ?? (expensiveTimes.length > 0); const aggressiveDischargeSpreadMet = cheapest.attributes.aggressive_discharge_spread_met ?? (expensiveAggressiveTimes.length > 0);\nconst cheapestSet = new Set(cheapestTimes.map(t => new Date(t).getTime())); const expensiveSet = new Set(expensiveTimes.map(t => new Date(t).getTime())); const expensiveAggressiveSet = new Set(expensiveAggressiveTimes.map(t => new Date(t).getTime()));\nconst override1Enabled = hass.states['switch.cew_time_override_enabled_tomorrow']?.state === 'on'; const override1Start = hass.states['time.cew_time_override_start_tomorrow']?.state; const override1End = hass.states['time.cew_time_override_end_tomorrow']?.state; const override1Mode = hass.states['select.cew_time_override_mode_tomorrow']?.state;\nfunction isInTimeRange(timeMs, startTime, endTime) {\n  const date = new Date(timeMs);\n  const timeStr = date.toTimeString().substring(0, 8);\n  return startTime <= timeStr && timeStr < endTime;\n}\nlet rawData = nordpool.attributes.raw_tomorrow;\nconst cheapestHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(cheapestSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\nconst expensiveHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(expensiveSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\nconst expensiveAggressiveHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(expensiveAggressiveSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\n\nreturn rawData.map(item => {\n  const time = new Date(item.start).getTime();\n\n  let isCheap, isExpensive, isExpensiveAggressive;\n  if (pricingMode === '1_hour') {\n    const hourStart = Math.floor(time / 3600000) * 3600000;\n    isCheap = (cheapestTimes.length > 0) && cheapestHours.has(hourStart);\n    isExpensiveAggressive = (expensiveAggressiveTimes.length > 0) && expensiveAggressiveHours.has(hourStart);\n    isExpensive = (expensiveTimes.length > 0) && expensiveHours.has(hourStart);\n  } else {\n    isCheap = (cheapestTimes.length > 0) && cheapestSet.has(time);\n    isExpensiveAggressive = (expensiveAggressiveTimes.length > 0) && expensiveAggressiveSet.has(time);\n    isExpensive = (expensiveTimes.length > 0) && expensiveSet.has(time);\n  }\n\n  const isOverride = override1Enabled && override1Start && override1End && isInTimeRange(time, override1Start, override1End);\n  const overrideMode = isOverride ? override1Mode : null;\n\n  let color = 'transparent';\n  if (isOverride && overrideMode === 'idle') color = 'transparent';\n  else if (isOverride && overrideMode === 'charge') color = '#a3e635';\n  else if (isOverride && overrideMode === 'discharge') color = '#fb923c';\n  else if (isOverride && overrideMode === 'discharge_aggressive') color = '#dc2626';\n  else if (isCheap) color = '#22c55e';\n  else if (isExpensiveAggressive) color = '#dc2626';\n  else if (isExpensive) color = '#f97316';\n\n  return {\n    x: time,\n    y: 1,\n    fillColor: color,\n    cheap: isCheap,\n    expensive: isExpensive,\n    expensiveAggressive: isExpensiveAggressive,\n    override: isOverride,\n    overrideMode: overrideMode\n  };\n});\n",
                                                                  "stroke_width": 0
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:apexcharts-card",
                                                      "graph_span": "24h",
                                                      "span": {
                                                            "start": "day",
                                                            "offset": "+1d"
                                                      },
                                                      "header": {
                                                            "show": false
                                                      },
                                                      "update_interval": "12s",
                                                      "apex_config": {
                                                            "chart": {
                                                                  "height": 240,
                                                                  "toolbar": {
                                                                        "show": false
                                                                  },
                                                                  "animations": {
                                                                        "enabled": true,
                                                                        "easing": "easeinout",
                                                                        "speed": 800
                                                                  },
                                                                  "dropShadow": {
                                                                        "enabled": true,
                                                                        "top": 3,
                                                                        "left": 0,
                                                                        "blur": 6,
                                                                        "opacity": 0.2
                                                                  }
                                                            },
                                                            "stroke": {
                                                                  "curve": "smooth",
                                                                  "width": 2
                                                            },
                                                            "dataLabels": {
                                                                  "enabled": false
                                                            },
                                                            "fill": {
                                                                  "type": "gradient",
                                                                  "gradient": {
                                                                        "shadeIntensity": 1,
                                                                        "opacityFrom": 0.7,
                                                                        "opacityTo": 0.2,
                                                                        "stops": [
                                                                              0,
                                                                              90,
                                                                              100
                                                                        ]
                                                                  }
                                                            },
                                                            "grid": {
                                                                  "show": true,
                                                                  "borderColor": "#f0f0f0",
                                                                  "strokeDashArray": 3,
                                                                  "position": "back",
                                                                  "xaxis": {
                                                                        "lines": {
                                                                              "show": false
                                                                        }
                                                                  },
                                                                  "yaxis": {
                                                                        "lines": {
                                                                              "show": true
                                                                        }
                                                                  },
                                                                  "padding": {
                                                                        "left": 20,
                                                                        "right": 20,
                                                                        "top": 10,
                                                                        "bottom": 0
                                                                  }
                                                            },
                                                            "tooltip": {
                                                                  "enabled": true,
                                                                  "theme": "dark",
                                                                  "x": {
                                                                        "format": "HH:mm"
                                                                  },
                                                                  "y": {
                                                                        "formatter": "EVAL:function(value) {\n  return '\u20ac' + value.toFixed(3) + '/kWh';\n}\n"
                                                                  },
                                                                  "style": {
                                                                        "fontSize": "13px"
                                                                  }
                                                            },
                                                            "markers": {
                                                                  "size": 0,
                                                                  "hover": {
                                                                        "size": 6
                                                                  }
                                                            },
                                                            "yaxis": {
                                                                  "decimalsInFloat": 3,
                                                                  "labels": {
                                                                        "formatter": "EVAL:function(value) {\n  return '\u20ac' + value.toFixed(3);\n}\n",
                                                                        "style": {
                                                                              "fontSize": "11px"
                                                                        }
                                                                  }
                                                            },
                                                            "noData": {
                                                                  "text": ["\ud83d\udcc5 Becomes available", "between 13:00-15:00 CET"],
                                                                  "align": "center",
                                                                  "verticalAlign": "middle",
                                                                  "offsetY": -15,
                                                                  "style": {
                                                                        "color": "#6b7280",
                                                                        "fontSize": "20px",
                                                                        "fontWeight": "bold",
                                                                        "fontFamily": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
                                                                  }
                                                            }
                                                      },
                                                      "series": [
                                                            {
                                                                  "entity": "sensor.nordpool_kwh_nl_eur_3_10_0",
                                                                  "name": "Price",
                                                                  "type": "area",
                                                                  "stroke_width": 2,
                                                                  "color": "#3b82f6",
                                                                  "data_generator": "const sensorName = hass.states['text.cew_price_sensor_entity']?.state || 'sensor.nordpool_kwh_nl_eur_3_10_0'; const nordpool = hass.states[sensorName];\nif (!nordpool?.attributes?.raw_tomorrow || !nordpool.attributes.tomorrow_valid) return [];\nconst pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes';\nconst add = parseFloat(hass.states['number.cew_additional_cost'].state) || 0.02398;\nconst tax = parseFloat(hass.states['number.cew_tax'].state) || 0.12286;\nconst vat = hass.states['number.cew_vat']?.state !== undefined ? parseFloat(hass.states['number.cew_vat'].state) : 0.21;\nlet rawData = nordpool.attributes.raw_tomorrow;\nif (pricingMode === '1_hour') {\n  const hourlyData = {};\n  rawData.forEach(item => {\n    const time = new Date(item.start).getTime();\n    const hourStart = Math.floor(time / 3600000) * 3600000;\n    if (!hourlyData[hourStart]) {\n      hourlyData[hourStart] = { values: [], count: 0 };\n    }\n    hourlyData[hourStart].values.push(item.value);\n    hourlyData[hourStart].count++;\n  });\n  rawData = Object.keys(hourlyData).map(h => {\n    const avgValue = hourlyData[h].values.reduce((a, b) => a + b, 0) / hourlyData[h].count;\n    return { start: new Date(parseInt(h)).toISOString(), value: avgValue };\n  });\n}\nreturn rawData.map(item => {\n  const price = (item.value * (1 + vat)) + tax + add;\n  return [new Date(item.start).getTime(), price];\n});\n"
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "horizontal-stack",
                                                      "cards": [
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Spread",
                                                                  "secondary": "{{ state_attr('sensor.cew_tomorrow', 'spread_percentage') | float(0) | round(1) }}%",
                                                                  "icon": "mdi:percent",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "{% if state_attr('sensor.cew_tomorrow', 'spread_percentage') | float(0) >= 30 %}green\n{% elif state_attr('sensor.cew_tomorrow', 'spread_percentage') | float(0) >= 15 %}orange\n{% else %}red\n{% endif %}\n",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Charge",
                                                                  "secondary": "{% set total = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([]) | length %}0/{{ total }}",
                                                                  "icon": "mdi:battery-charging",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "{% if state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([]) | length > 0 %}green\n{% else %}grey\n{% endif %}\n",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Discharge",
                                                                  "secondary": "{% set total = state_attr('sensor.cew_tomorrow', 'expensive_times') | default([]) | length %}0/{{ total }}",
                                                                  "icon": "mdi:battery-minus",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  },
                                                                  "color": "{% set count = state_attr('sensor.cew_tomorrow', 'expensive_times') | default([]) | length %}\n{% if count > 0 %}orange\n{% else %}grey\n{% endif %}\n",
                                                                  "vertical": true,
                                                                  "features_position": "bottom"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Daily Net Cost",
                                                                  "secondary": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([]) | length %}\n{% set num_expensive = state_attr('sensor.cew_tomorrow', 'expensive_times') | default([]) | length %}\n{% set avg_cheap = state_attr('sensor.cew_tomorrow', 'avg_cheap_price') | float(0) %}\n{% set avg_expensive = state_attr('sensor.cew_tomorrow', 'avg_expensive_price') | float(0) %}\n{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}\n{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}\n{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}\n{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}\n{% set charged_kwh = num_cheap * window_duration * charge_power %}\n{% set usable_kwh = charged_kwh * rte %}\n{% set discharged_kwh = num_expensive * window_duration * discharge_power %}\n{% set actual_discharged = discharged_kwh %}\n{% set charge_cost = charged_kwh * avg_cheap %}\n{% set discharge_revenue = actual_discharged * avg_expensive %}\n{% set net_cost = charge_cost - discharge_revenue %}\n{{ '\u20ac' + (net_cost | round(2) | string) }}",
                                                                  "icon": "mdi:currency-eur",
                                                                  "icon_color": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([]) | length %}\n{% set num_expensive = state_attr('sensor.cew_tomorrow', 'expensive_times') | default([]) | length %}\n{% set avg_cheap = state_attr('sensor.cew_tomorrow', 'avg_cheap_price') | float(0) %}\n{% set avg_expensive = state_attr('sensor.cew_tomorrow', 'avg_expensive_price') | float(0) %}\n{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}\n{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}\n{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}\n{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}\n{% set charged_kwh = num_cheap * window_duration * charge_power %}\n{% set usable_kwh = charged_kwh * rte %}\n{% set discharged_kwh = num_expensive * window_duration * discharge_power %}\n{% set actual_discharged = discharged_kwh %}\n{% set charge_cost = charged_kwh * avg_cheap %}\n{% set discharge_revenue = actual_discharged * avg_expensive %}\n{% set net_cost = charge_cost - discharge_revenue %}\n{% if net_cost < 0 %}green\n{% elif net_cost > 0 %}red\n{% else %}grey\n{% endif %}\n",
                                                                  "layout": "vertical",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  }
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:fold-entity-row",
                                                      "head": {
                                                            "type": "section",
                                                            "label": "\ud83c\udf05 Tomorrow's Settings (Optional)"
                                                      },
                                                      "padding": 0,
                                                      "entities": [
                                                            {
                                                                  "entity": "switch.cew_tomorrow_settings_enabled",
                                                                  "name": "Enable Tomorrow's Custom Settings",
                                                                  "icon": "mdi:calendar-clock"
                                                            },
                                                            {
                                                                  "entity": "switch.cew_midnight_rotation_notifications",
                                                                  "name": "Enable Midnight Rotation Notifications",
                                                                  "icon": "mdi:bell-ring"
                                                            },
                                                            {
                                                                  "type": "custom:mushroom-template-card",
                                                                  "primary": "Auto-applies at midnight (00:00)",
                                                                  "secondary": "Tomorrow's settings become active for today, then auto-disable",
                                                                  "icon": "mdi:information-outline",
                                                                  "icon_color": "orange",
                                                                  "layout": "horizontal",
                                                                  "tap_action": {
                                                                        "action": "none"
                                                                  }
                                                            },
                                                            {
                                                                  "type": "divider"
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83e\ude9f Window Selection"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "number.cew_charging_windows_tomorrow",
                                                                              "name": "Charging Windows (max)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_expensive_windows_tomorrow",
                                                                              "name": "Expensive Windows (max)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_cheap_percentile_tomorrow",
                                                                              "name": "Cheap Percentile Threshold"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_expensive_percentile_tomorrow",
                                                                              "name": "Expensive Percentile Threshold"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83d\udcca Spread & Price Thresholds"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "number.cew_min_spread_tomorrow",
                                                                              "name": "Min Spread (Charging)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_min_spread_discharge_tomorrow",
                                                                              "name": "Min Spread (Discharging)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_aggressive_discharge_spread_tomorrow",
                                                                              "name": "Min Spread (Aggressive)"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_min_price_difference_tomorrow",
                                                                              "name": "Min Absolute Price Difference"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83d\udcb0 Price Override (Always Charge Below)"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "switch.cew_price_override_enabled_tomorrow",
                                                                              "name": "Enable Price Override"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_price_override_threshold_tomorrow",
                                                                              "name": "Price Override Threshold"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\u23f0 Time Override (Force Action During Period)"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "switch.cew_time_override_enabled_tomorrow",
                                                                              "name": "Enable Time Override"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_time_override_start_tomorrow",
                                                                              "name": "Start Time"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_time_override_end_tomorrow",
                                                                              "name": "End Time"
                                                                        },
                                                                        {
                                                                              "entity": "select.cew_time_override_mode_tomorrow",
                                                                              "name": "Override Mode"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83e\ude9f Calculation Window (Restrict Price Analysis)"
                                                                  },
                                                                  "padding": 5,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "switch.cew_calculation_window_enabled",
                                                                              "name": "Enable Calculation Window"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_calculation_window_start",
                                                                              "name": "Window Start Time"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_calculation_window_end",
                                                                              "name": "Window End Time"
                                                                        }
                                                                  ]
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "markdown",
                                                      "entities": [
                                                            "sensor.cew_tomorrow"
                                                      ],
                                                      "card_mod": {
                                                            "style": "ha-card {\n  min-height: 200px;\n}\n"
                                                      },
                                                      "content": "**\u26a1 Charge Windows** ({{ (state_attr('sensor.cew_tomorrow', 'cheapest_times') or []) | length }} periods){% set times = state_attr('sensor.cew_tomorrow', 'cheapest_times') or [] %}{% set prices = state_attr('sensor.cew_tomorrow', 'cheapest_prices') or [] %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %}{% set total_cost = (prices | sum) * window_duration * charge_power_kw if prices else 0 %}{% if prices | length > 0 %} \u2022 Cost: \u20ac{{ total_cost | round(2) }}{% endif %}\n{% if times | length > 0 %} {% set window_seconds = 3600 if states('select.cew_pricing_window_duration') == '1_hour' else 900 %} {% set ns = namespace(items=[], groups=[]) %} {% for i in range(times | length) %} {% set ns.items = ns.items + [{'time': as_timestamp(times[i]), 'price': prices[i]}] %} {% endfor %} {% set sorted_items = ns.items | sort(attribute='time') %} {% set ns = namespace(current_group={'start': sorted_items[0].time, 'end': sorted_items[0].time + window_seconds, 'prices': [sorted_items[0].price]}, groups=[]) %} {% for item in sorted_items[1:] %} {% if item.time == ns.current_group.end %} {% set ns.current_group = {'start': ns.current_group.start, 'end': item.time + window_seconds, 'prices': ns.current_group.prices + [item.price]} %} {% else %} {% set ns.groups = ns.groups + [ns.current_group] %} {% set ns.current_group = {'start': item.time, 'end': item.time + window_seconds, 'prices': [item.price]} %} {% endif %} {% endfor %} {% set ns.groups = ns.groups + [ns.current_group] %} {% for group in ns.groups %} **{{ group.start | timestamp_custom('%H:%M') }}-{{ group.end | timestamp_custom('%H:%M') }}** \u2022 Avg: \u20ac{{ (group.prices | sum / group.prices | length) | round(3) }}{% if not loop.last %}\n{% endif %} {% endfor %} {% else %} *No charge windows scheduled* {% endif %}\n&nbsp;\n**\ud83d\udd0b Discharge Windows** ({{ (state_attr('sensor.cew_tomorrow', 'expensive_times') or []) | length }} periods){% set times = state_attr('sensor.cew_tomorrow', 'expensive_times') or [] %}{% set prices = state_attr('sensor.cew_tomorrow', 'expensive_prices') or [] %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %}{% set total_revenue = (prices | sum) * window_duration * discharge_power_kw if prices else 0 %}{% if prices | length > 0 %} \u2022 Revenue: \u20ac{{ total_revenue | round(2) }}{% endif %}\n{% if times | length > 0 %} {% set window_seconds = 3600 if states('select.cew_pricing_window_duration') == '1_hour' else 900 %} {% set ns = namespace(items=[], groups=[]) %} {% for i in range(times | length) %} {% set ns.items = ns.items + [{'time': as_timestamp(times[i]), 'price': prices[i]}] %} {% endfor %} {% set sorted_items = ns.items | sort(attribute='time') %} {% set ns = namespace(current_group={'start': sorted_items[0].time, 'end': sorted_items[0].time + window_seconds, 'prices': [sorted_items[0].price]}, groups=[]) %} {% for item in sorted_items[1:] %} {% if item.time == ns.current_group.end %} {% set ns.current_group = {'start': ns.current_group.start, 'end': item.time + window_seconds, 'prices': ns.current_group.prices + [item.price]} %} {% else %} {% set ns.groups = ns.groups + [ns.current_group] %} {% set ns.current_group = {'start': item.time, 'end': item.time + window_seconds, 'prices': [item.price]} %} {% endif %} {% endfor %} {% set ns.groups = ns.groups + [ns.current_group] %} {% for group in ns.groups %} **{{ group.start | timestamp_custom('%H:%M') }}-{{ group.end | timestamp_custom('%H:%M') }}** \u2022 Avg: \u20ac{{ (group.prices | sum / group.prices | length) | round(3) }}{% if not loop.last %}\n{% endif %} {% endfor %} {% else %} *No discharge windows scheduled* {% endif %}"
                                                }
                                          ]
                                    }
                              ]
                        },
                        {
                              "type": "grid",
                              "cards": [
                                    {
                                          "type": "vertical-stack",
                                          "cards": [
                                                {
                                                      "type": "custom:mushroom-title-card",
                                                      "title": "\u2699\ufe0f Configuration & Status",
                                                      "subtitle": "Current pricing and system settings"
                                                },
                                                {
                                                      "type": "custom:mushroom-entity-card",
                                                      "entity": "switch.cew_automation_enabled",
                                                      "name": "Automation Control",
                                                      "icon": "mdi:power",
                                                      "icon_color": "{% if is_state('switch.cew_automation_enabled', 'on') %}green\n{% else %}red\n{% endif %}\n",
                                                      "secondary_info": "{% if is_state('switch.cew_automation_enabled', 'on') %}Automation Active\n{% else %}\u26a0\ufe0f Automation Disabled - Battery Set to Idle\n{% endif %}\n",
                                                      "tap_action": {
                                                            "action": "toggle"
                                                      }
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "primary": "{% set state = states('sensor.cew_today') %}\n{% set price_override = state_attr('sensor.cew_today', 'price_override_active') %}\n{% if state == 'off' %}\u26d4 Automation Off\n{% elif state == 'charge' and price_override %}\ud83d\udcb0 Price Override Charging\n{% elif state == 'charge' %}\ud83d\udd0b Charging\n{% elif state == 'discharge_aggressive' %}\u26a1 Peak Discharge\n{% elif state == 'discharge' %}\ud83d\udd0c Discharging\n{% else %}\ud83d\udca1 Normal Pricing\n{% endif %}\n",
                                                      "secondary": "{% set current_price = state_attr('sensor.cew_today', 'current_price') | float(0) %}\nCurrent: \u20ac{{ current_price | round(3) }}/kWh\n",
                                                      "icon": "{% set state = states('sensor.cew_today') %}\n{% set price_override = state_attr('sensor.cew_today', 'price_override_active') %}\n{% if state == 'off' %}mdi:power-off\n{% elif state == 'charge' and price_override %}mdi:currency-eur\n{% elif state == 'charge' %}mdi:battery-charging\n{% elif state == 'discharge_aggressive' %}mdi:battery-alert\n{% elif state == 'discharge' %}mdi:battery-minus\n{% else %}mdi:battery-heart\n{% endif %}\n",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "badge_icon": "{% if state_attr('sensor.cew_today', 'price_override_active') %}mdi:alert-circle\n{% endif %}\n",
                                                      "badge_color": "{% if state_attr('sensor.cew_today', 'price_override_active') %}lime\n{% endif %}\n",
                                                      "color": "{% set state = states('sensor.cew_today') %}\n{% set price_override = state_attr('sensor.cew_today', 'price_override_active') %}\n{% if state == 'off' %}grey\n{% elif state == 'charge' and price_override %}lime\n{% elif state == 'charge' %}green\n{% elif state == 'discharge_aggressive' %}red\n{% elif state == 'discharge' %}orange\n{% else %}blue\n{% endif %}\n",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:fold-entity-row",
                                                      "head": {
                                                            "type": "section",
                                                            "label": "\u2699\ufe0f Settings"
                                                      },
                                                      "padding": 0,
                                                      "entities": [
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83d\udcb6 Price Calculation Settings"
                                                                  },
                                                                  "padding": 0,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "text.cew_price_sensor_entity",
                                                                              "name": "Nordpool Sensor Entity ID",
                                                                              "icon": "mdi:flash"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_vat",
                                                                              "name": "VAT Rate",
                                                                              "icon": "mdi:percent"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_tax",
                                                                              "name": "Tax per kWh",
                                                                              "icon": "mdi:currency-eur"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_additional_cost",
                                                                              "name": "Additional Cost per kWh",
                                                                              "icon": "mdi:currency-eur"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_charge_power",
                                                                              "name": "Battery Charging Power",
                                                                              "icon": "mdi:lightning-bolt"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_discharge_power",
                                                                              "name": "Battery Discharging Power",
                                                                              "icon": "mdi:lightning-bolt-outline"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_battery_rte",
                                                                              "name": "Battery Round-Trip Efficiency (%)",
                                                                              "icon": "mdi:battery-sync"
                                                                        },
                                                                        {
                                                                              "entity": "select.cew_pricing_window_duration",
                                                                              "name": "Pricing Window Duration",
                                                                              "icon": "mdi:timer-outline"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83d\udd0b Battery System Settings"
                                                                  },
                                                                  "padding": 0,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "text.cew_battery_system_name",
                                                                              "name": "System Name",
                                                                              "icon": "mdi:tag"
                                                                        },
                                                                        {
                                                                              "type": "section",
                                                                              "label": "Sensor Configuration"
                                                                        },
                                                                        {
                                                                              "entity": "text.cew_battery_soc_sensor",
                                                                              "name": "SoC Sensor Entity ID",
                                                                              "icon": "mdi:battery-50"
                                                                        },
                                                                        {
                                                                              "entity": "text.cew_battery_available_energy_sensor",
                                                                              "name": "Available Energy Sensor",
                                                                              "icon": "mdi:battery"
                                                                        },
                                                                        {
                                                                              "entity": "text.cew_battery_daily_charge_sensor",
                                                                              "name": "Daily Charge Sensor",
                                                                              "icon": "mdi:lightning-bolt"
                                                                        },
                                                                        {
                                                                              "entity": "text.cew_battery_daily_discharge_sensor",
                                                                              "name": "Daily Discharge Sensor",
                                                                              "icon": "mdi:lightning-bolt-outline"
                                                                        },
                                                                        {
                                                                              "entity": "text.cew_battery_power_sensor",
                                                                              "name": "Current Power Sensor",
                                                                              "icon": "mdi:lightning-bolt-circle"
                                                                        },
                                                                        {
                                                                              "type": "section",
                                                                              "label": "Discharge Limits Settings"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_battery_use_soc_safety",
                                                                              "name": "Use SoC for Discharge Limits",
                                                                              "icon": "mdi:battery-alert"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_battery_min_soc_discharge",
                                                                              "name": "Min SoC for Discharge",
                                                                              "icon": "mdi:battery-30"
                                                                        },
                                                                        {
                                                                              "entity": "number.cew_battery_min_soc_aggressive_discharge",
                                                                              "name": "Min SoC for Aggressive Discharge",
                                                                              "icon": "mdi:battery-20"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83d\udc41\ufe0f Battery Display Settings"
                                                                  },
                                                                  "padding": 0,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "switch.cew_battery_section_visible",
                                                                              "name": "Show Battery Section",
                                                                              "icon": "mdi:eye"
                                                                        },
                                                                        {
                                                                              "type": "section",
                                                                              "label": "Visible Metrics"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_battery_show_soc",
                                                                              "name": "Show State of Charge",
                                                                              "icon": "mdi:battery-50"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_battery_show_available_energy",
                                                                              "name": "Show Available Energy",
                                                                              "icon": "mdi:battery"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_battery_show_daily_charge",
                                                                              "name": "Show Daily Charge",
                                                                              "icon": "mdi:lightning-bolt"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_battery_show_daily_discharge",
                                                                              "name": "Show Daily Discharge",
                                                                              "icon": "mdi:lightning-bolt-outline"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_battery_show_current_power",
                                                                              "name": "Show Current Power",
                                                                              "icon": "mdi:lightning-bolt-circle"
                                                                        }
                                                                  ]
                                                            },
                                                            {
                                                                  "type": "custom:fold-entity-row",
                                                                  "head": {
                                                                        "type": "section",
                                                                        "label": "\ud83d\udd14 Notification Settings"
                                                                  },
                                                                  "padding": 0,
                                                                  "entities": [
                                                                        {
                                                                              "entity": "switch.cew_notifications_enabled",
                                                                              "name": "Enable All Notifications",
                                                                              "icon": "mdi:bell"
                                                                        },
                                                                        {
                                                                              "type": "section",
                                                                              "label": "Notification Types"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_notify_charging",
                                                                              "name": "Notify on Charging",
                                                                              "icon": "mdi:battery-charging"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_notify_discharge",
                                                                              "name": "Notify on Discharging",
                                                                              "icon": "mdi:battery-arrow-up"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_notify_discharge_aggressive",
                                                                              "name": "Notify on Peak Discharge",
                                                                              "icon": "mdi:flash-alert"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_notify_idle",
                                                                              "name": "Notify on Idle/Smart Mode",
                                                                              "icon": "mdi:battery-sync"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_notify_automation_disabled",
                                                                              "name": "Notify on Automation Disabled",
                                                                              "icon": "mdi:bell-off"
                                                                        },
                                                                        {
                                                                              "type": "section",
                                                                              "label": "Quiet Hours"
                                                                        },
                                                                        {
                                                                              "entity": "switch.cew_quiet_hours_enabled",
                                                                              "name": "Enable Quiet Hours",
                                                                              "icon": "mdi:sleep"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_quiet_hours_start",
                                                                              "name": "Quiet Hours Start",
                                                                              "icon": "mdi:sleep"
                                                                        },
                                                                        {
                                                                              "entity": "time.cew_quiet_hours_end",
                                                                              "name": "Quiet Hours End",
                                                                              "icon": "mdi:weather-sunset-up"
                                                                        }
                                                                  ]
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:mushroom-title-card",
                                                      "visibility": [
                                                            {
                                                                  "condition": "state",
                                                                  "entity": "switch.cew_battery_section_visible",
                                                                  "state": "on"
                                                            }
                                                      ],
                                                      "subtitle": "{{ states('text.cew_battery_system_name') }}"
                                                },
                                                {
                                                      "features": [
                                                            {
                                                                  "type": "bar-gauge"
                                                            }
                                                      ],
                                                      "type": "custom:mushroom-template-card",
                                                      "visibility": [
                                                            {
                                                                  "condition": "and",
                                                                  "conditions": [
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_section_visible",
                                                                              "state": "on"
                                                                        },
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_show_soc",
                                                                              "state": "on"
                                                                        }
                                                                  ]
                                                            }
                                                      ],
                                                      "primary": "State of Charge",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "green",
                                                      "features_position": "inline",
                                                      "secondary": "{% set soc_sensor = states('text.cew_battery_soc_sensor') %}\n{{ states(soc_sensor) | float(0) | round(2) }} %\n",
                                                      "entity": "{{ states('text.cew_battery_soc_sensor') }}",
                                                      "icon": "mdi:battery-50"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "visibility": [
                                                            {
                                                                  "condition": "and",
                                                                  "conditions": [
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_section_visible",
                                                                              "state": "on"
                                                                        },
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_show_available_energy",
                                                                              "state": "on"
                                                                        }
                                                                  ]
                                                            }
                                                      ],
                                                      "entity": "{{ states('text.cew_battery_available_energy_sensor') }}",
                                                      "primary": "Available Energy",
                                                      "icon": "mdi:battery",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "green",
                                                      "features_position": "inline",
                                                      "secondary": "{% set energy_sensor = states('text.cew_battery_available_energy_sensor') %} {{ states(energy_sensor) | float(0) | round(2) }} kWh\n",
                                                      "features": [
                                                            {
                                                                  "type": "trend-graph"
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "visibility": [
                                                            {
                                                                  "condition": "and",
                                                                  "conditions": [
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_section_visible",
                                                                              "state": "on"
                                                                        },
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_show_daily_charge",
                                                                              "state": "on"
                                                                        }
                                                                  ]
                                                            }
                                                      ],
                                                      "entity": "{{ states('text.cew_battery_daily_charge_sensor') }}",
                                                      "primary": "Charged Today",
                                                      "icon": "mdi:lightning-bolt",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "green",
                                                      "features_position": "inline",
                                                      "secondary": "{% set charge_sensor = states('text.cew_battery_daily_charge_sensor') %} {{ states(charge_sensor) | float(0) | round(2) }} kWh\n",
                                                      "features": [
                                                            {
                                                                  "type": "trend-graph"
                                                            }
                                                      ]
                                                },
                                                {
                                                      "features": [
                                                            {
                                                                  "type": "trend-graph"
                                                            }
                                                      ],
                                                      "type": "custom:mushroom-template-card",
                                                      "visibility": [
                                                            {
                                                                  "condition": "and",
                                                                  "conditions": [
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_section_visible",
                                                                              "state": "on"
                                                                        },
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_show_daily_discharge",
                                                                              "state": "on"
                                                                        }
                                                                  ]
                                                            }
                                                      ],
                                                      "entity": "{{ states('text.cew_battery_daily_discharge_sensor') }}",
                                                      "primary": "Discharged Today",
                                                      "icon": "mdi:lightning-bolt",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "green",
                                                      "features_position": "inline",
                                                      "secondary": "{% set discharge_sensor = states('text.cew_battery_daily_discharge_sensor') %} {{ states(discharge_sensor) | float(0) | round(2) }} kWh\n"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "visibility": [
                                                            {
                                                                  "condition": "and",
                                                                  "conditions": [
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_section_visible",
                                                                              "state": "on"
                                                                        },
                                                                        {
                                                                              "condition": "state",
                                                                              "entity": "switch.cew_battery_show_current_power",
                                                                              "state": "on"
                                                                        }
                                                                  ]
                                                            }
                                                      ],
                                                      "entity": "{{ states('text.cew_battery_power_sensor') }}",
                                                      "primary": "Current Power",
                                                      "icon": "mdi:lightning-bolt-circle",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "green",
                                                      "features_position": "inline",
                                                      "secondary": "{% set power_sensor = states('text.cew_battery_power_sensor') %} {{ states(power_sensor) | float(0) | round(2) }} kW\n",
                                                      "features": [
                                                            {
                                                                  "type": "trend-graph"
                                                            }
                                                      ]
                                                },
                                                {
                                                      "type": "custom:mushroom-title-card",
                                                      "subtitle": "Battery Activity Today"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_today",
                                                      "primary": "Planned Charging",
                                                      "secondary": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([]) | length %}{% set completed = state_attr('sensor.cew_today', 'completed_charge_windows') | int(0) %}{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set charged_kwh = num_cheap * window_duration * charge_power %}{{ charged_kwh | round(2) }} kWh ({{ completed }}/{{ num_cheap }})",
                                                      "icon": "mdi:battery-charging",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "green",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_today",
                                                      "primary": "Usable Energy",
                                                      "secondary": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([]) | length %}{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}{% set rte_pct = states('number.cew_battery_rte') | float(90) %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set charged_kwh = num_cheap * window_duration * charge_power %}{% set usable_charged_kwh = charged_kwh * rte %}{{ usable_charged_kwh | round(2) }} kWh ({{ rte_pct | round(0) }}% RTE)",
                                                      "icon": "mdi:battery-check",
                                                      "badge_icon": "mdi:percent",
                                                      "badge_color": "blue",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "lime",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_today",
                                                      "primary": "Planned Discharge",
                                                      "secondary": "{% set num_expensive = state_attr('sensor.cew_today', 'actual_discharge_times') | default([]) | length %}{% set completed = state_attr('sensor.cew_today', 'completed_discharge_windows') | int(0) %}{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set discharged_kwh = num_expensive * window_duration * discharge_power %}{{ discharged_kwh | round(2) }} kWh ({{ completed }}/{{ num_expensive }})",
                                                      "icon": "mdi:battery-minus",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "orange",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_today",
                                                      "primary": "Net kWh Available",
                                                      "secondary": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([]) | length %}{% set num_expensive = state_attr('sensor.cew_today', 'actual_discharge_times') | default([]) | length %}{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set charged_kwh = num_cheap * window_duration * charge_power %}{% set usable_kwh = charged_kwh * rte %}{% set discharged_kwh = num_expensive * window_duration * discharge_power %}{% set actual_discharged = discharged_kwh %}{% set net_kwh = usable_kwh - actual_discharged %}{{ net_kwh | round(2) }} kWh",
                                                      "icon": "mdi:battery-heart",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "cyan",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_today",
                                                      "primary": "Net Price",
                                                      "secondary": "{% set sensorName = states('text.cew_price_sensor_entity') or 'sensor.nordpool_kwh_nl_eur_3_10_0' %}{% set nordpool = states[sensorName] %}{% set add = states('number.cew_additional_cost') | float(0.02398) %}{% set tax = states('number.cew_tax') | float(0.12286) %}{% set vat = states('number.cew_vat') | float(0.21) %}{% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %}{% set charge_times = state_attr('sensor.cew_today', 'actual_charge_times') or [] %}{% set discharge_times = state_attr('sensor.cew_today', 'actual_discharge_times') or [] %}{% set ns = namespace(charge_prices=[], discharge_prices=[]) %}{% if nordpool.attributes.raw_today %}{% for time in charge_times %}{% if pricing_mode == '1_hour' %}{% set hour_sum = namespace(value=0, count=0) %}{% set hour_str = time | as_datetime | string %}{% set hour_str = hour_str[11:13] %}{% for item in nordpool.attributes.raw_today %}{% set raw_time = item.start | replace('\"', '') %}{% if raw_time[11:13] == hour_str %}{% set hour_sum.value = hour_sum.value + item.value %}{% set hour_sum.count = hour_sum.count + 1 %}{% endif %}{% endfor %}{% if hour_sum.count > 0 %}{% set avg_value = hour_sum.value / hour_sum.count %}{% set actual_price = avg_value * (1 + vat) + tax + add %}{% set ns.charge_prices = ns.charge_prices + [actual_price] %}{% endif %}{% else %}{% set time_ts = as_timestamp(time) %}{% for item in nordpool.attributes.raw_today %}{% set raw_time = item.start | replace('\"', '') | as_datetime | as_timestamp %}{% if raw_time == time_ts %}{% set ns.charge_prices = ns.charge_prices + [(item.value | float(0)) * (1 + vat) + tax + add] %}{% endif %}{% endfor %}{% endif %}{% endfor %}{% for time in discharge_times %}{% if pricing_mode == '1_hour' %}{% set hour_sum = namespace(value=0, count=0) %}{% set hour_str = time | as_datetime | string %}{% set hour_str = hour_str[11:13] %}{% for item in nordpool.attributes.raw_today %}{% set raw_time = item.start | replace('\"', '') %}{% if raw_time[11:13] == hour_str %}{% set hour_sum.value = hour_sum.value + item.value %}{% set hour_sum.count = hour_sum.count + 1 %}{% endif %}{% endfor %}{% if hour_sum.count > 0 %}{% set avg_value = hour_sum.value / hour_sum.count %}{% set actual_price = avg_value * (1 + vat) + tax + add %}{% set ns.discharge_prices = ns.discharge_prices + [actual_price] %}{% endif %}{% else %}{% set time_ts = as_timestamp(time) %}{% for item in nordpool.attributes.raw_today %}{% set raw_time = item.start | replace('\"', '') | as_datetime | as_timestamp %}{% if raw_time == time_ts %}{% set ns.discharge_prices = ns.discharge_prices + [(item.value | float(0)) * (1 + vat) + tax + add] %}{% endif %}{% endfor %}{% endif %}{% endfor %}{% endif %}{% set avg_cheap = (ns.charge_prices | sum / ns.charge_prices | length) if ns.charge_prices | length > 0 else 0 %}{% set avg_expensive = (ns.discharge_prices | sum / ns.discharge_prices | length) if ns.discharge_prices | length > 0 else 0 %}{% set num_cheap = charge_times | length %}{% set num_expensive = discharge_times | length %}{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}{% set window_duration = 1.0 if pricing_mode == '1_hour' else 0.25 %}{% set charged_kwh = num_cheap * window_duration * charge_power %}{% set usable_kwh = charged_kwh * rte %}{% if num_expensive > 0 %}{% set discharged_kwh = num_expensive * window_duration * discharge_power %}{% set actual_discharged = discharged_kwh %}{% set charge_cost = charged_kwh * avg_cheap %}{% set discharge_revenue = actual_discharged * avg_expensive %}{% set net_cost = charge_cost - discharge_revenue %}{% set net_kwh = usable_kwh - actual_discharged %}{% set net_price = (net_cost / (net_kwh | abs)) if net_kwh != 0 else (avg_expensive - avg_cheap) %}{% elif num_cheap > 0 %}{% set net_price = avg_cheap / rte %}{% else %}{% set net_price = 0 %}{% endif %}\u20ac{{ net_price | round(3) }}/kWh",
                                                      "icon": "mdi:currency-eur",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([]) | length %}{% if num_cheap > 0 %}green{% else %}grey{% endif %}",
                                                      "features_position": "inline"
                                                },
                                                {
                                                      "type": "custom:mushroom-title-card",
                                                      "subtitle": "Battery Activity Tomorrow"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_tomorrow",
                                                      "primary": "Planned Charging",
                                                      "secondary": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([]) | length %}{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set charged_kwh = num_cheap * window_duration * charge_power %}{{ charged_kwh | round(2) }} kWh (0/{{ num_cheap }})",
                                                      "icon": "mdi:battery-charging",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "green",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_tomorrow",
                                                      "primary": "Usable Energy",
                                                      "secondary": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([]) | length %}{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}{% set rte_pct = states('number.cew_battery_rte') | float(90) %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set charged_kwh = num_cheap * window_duration * charge_power %}{% set usable_charged_kwh = charged_kwh * rte %}{{ usable_charged_kwh | round(2) }} kWh ({{ rte_pct | round(0) }}% RTE)",
                                                      "icon": "mdi:battery-check",
                                                      "badge_icon": "mdi:percent",
                                                      "badge_color": "blue",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "lime",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_tomorrow",
                                                      "primary": "Planned Discharge",
                                                      "secondary": "{% set num_expensive = state_attr('sensor.cew_tomorrow', 'expensive_times') | default([]) | length %}{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set discharged_kwh = num_expensive * window_duration * discharge_power %}{{ discharged_kwh | round(2) }} kWh (0/{{ num_expensive }})",
                                                      "icon": "mdi:battery-minus",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "orange",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_tomorrow",
                                                      "primary": "Net kWh Available",
                                                      "secondary": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([]) | length %}{% set num_expensive = state_attr('sensor.cew_tomorrow', 'expensive_times') | default([]) | length %}{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}{% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %}{% set charged_kwh = num_cheap * window_duration * charge_power %}{% set usable_kwh = charged_kwh * rte %}{% set discharged_kwh = num_expensive * window_duration * discharge_power %}{% set actual_discharged = discharged_kwh %}{% set net_kwh = usable_kwh - actual_discharged %}{{ net_kwh | round(2) }} kWh",
                                                      "icon": "mdi:battery-heart",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "cyan",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-template-card",
                                                      "entity": "sensor.cew_tomorrow",
                                                      "primary": "Net Price",
                                                      "secondary": "{% set sensorName = states('text.cew_price_sensor_entity') or 'sensor.nordpool_kwh_nl_eur_3_10_0' %}{% set nordpool = states[sensorName] %}{% set add = states('number.cew_additional_cost') | float(0.02398) %}{% set tax = states('number.cew_tax') | float(0.12286) %}{% set vat = states('number.cew_vat') | float(0.21) %}{% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %}{% set charge_times = state_attr('sensor.cew_tomorrow', 'cheapest_times') or [] %}{% set discharge_times = state_attr('sensor.cew_tomorrow', 'expensive_times') or [] %}{% set ns = namespace(charge_prices=[], discharge_prices=[]) %}{% if nordpool.attributes.raw_tomorrow %}{% for time in charge_times %}{% if pricing_mode == '1_hour' %}{% set hour_sum = namespace(value=0, count=0) %}{% set hour_str = time | as_datetime | string %}{% set hour_str = hour_str[11:13] %}{% for item in nordpool.attributes.raw_tomorrow %}{% set raw_time = item.start | replace('\"', '') %}{% if raw_time[11:13] == hour_str %}{% set hour_sum.value = hour_sum.value + item.value %}{% set hour_sum.count = hour_sum.count + 1 %}{% endif %}{% endfor %}{% if hour_sum.count > 0 %}{% set avg_value = hour_sum.value / hour_sum.count %}{% set actual_price = avg_value * (1 + vat) + tax + add %}{% set ns.charge_prices = ns.charge_prices + [actual_price] %}{% endif %}{% else %}{% set time_ts = as_timestamp(time) %}{% for item in nordpool.attributes.raw_tomorrow %}{% set raw_time = item.start | replace('\"', '') | as_datetime | as_timestamp %}{% if raw_time == time_ts %}{% set ns.charge_prices = ns.charge_prices + [(item.value | float(0)) * (1 + vat) + tax + add] %}{% endif %}{% endfor %}{% endif %}{% endfor %}{% for time in discharge_times %}{% if pricing_mode == '1_hour' %}{% set hour_sum = namespace(value=0, count=0) %}{% set hour_str = time | as_datetime | string %}{% set hour_str = hour_str[11:13] %}{% for item in nordpool.attributes.raw_tomorrow %}{% set raw_time = item.start | replace('\"', '') %}{% if raw_time[11:13] == hour_str %}{% set hour_sum.value = hour_sum.value + item.value %}{% set hour_sum.count = hour_sum.count + 1 %}{% endif %}{% endfor %}{% if hour_sum.count > 0 %}{% set avg_value = hour_sum.value / hour_sum.count %}{% set actual_price = avg_value * (1 + vat) + tax + add %}{% set ns.discharge_prices = ns.discharge_prices + [actual_price] %}{% endif %}{% else %}{% set time_ts = as_timestamp(time) %}{% for item in nordpool.attributes.raw_tomorrow %}{% set raw_time = item.start | replace('\"', '') | as_datetime | as_timestamp %}{% if raw_time == time_ts %}{% set ns.discharge_prices = ns.discharge_prices + [(item.value | float(0)) * (1 + vat) + tax + add] %}{% endif %}{% endfor %}{% endif %}{% endfor %}{% endif %}{% set avg_cheap = (ns.charge_prices | sum / ns.charge_prices | length) if ns.charge_prices | length > 0 else 0 %}{% set avg_expensive = (ns.discharge_prices | sum / ns.discharge_prices | length) if ns.discharge_prices | length > 0 else 0 %}{% set num_cheap = charge_times | length %}{% set num_expensive = discharge_times | length %}{% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %}{% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %}{% set rte = states('number.cew_battery_rte') | float(90) / 100 %}{% set window_duration = 1.0 if pricing_mode == '1_hour' else 0.25 %}{% set charged_kwh = num_cheap * window_duration * charge_power %}{% set usable_kwh = charged_kwh * rte %}{% if num_expensive > 0 %}{% set discharged_kwh = num_expensive * window_duration * discharge_power %}{% set actual_discharged = discharged_kwh %}{% set charge_cost = charged_kwh * avg_cheap %}{% set discharge_revenue = actual_discharged * avg_expensive %}{% set net_cost = charge_cost - discharge_revenue %}{% set net_kwh = usable_kwh - actual_discharged %}{% set net_price = (net_cost / (net_kwh | abs)) if net_kwh != 0 else (avg_expensive - avg_cheap) %}{% elif num_cheap > 0 %}{% set net_price = avg_cheap / rte %}{% else %}{% set net_price = 0 %}{% endif %}\u20ac{{ net_price | round(3) }}/kWh",
                                                      "icon": "mdi:currency-eur",
                                                      "tap_action": {
                                                            "action": "none"
                                                      },
                                                      "color": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([]) | length %}{% if num_cheap > 0 %}green{% else %}grey{% endif %}",
                                                      "features_position": "bottom"
                                                },
                                                {
                                                      "type": "custom:mushroom-chips-card",
                                                      "alignment": "center",
                                                      "chips": [
                                                            {
                                                                  "type": "template",
                                                                  "icon": "mdi:coffee",
                                                                  "content": "Buy me a coffee",
                                                                  "tap_action": {
                                                                        "action": "url",
                                                                        "url_path": "https://www.buymeacoffee.com/cheapest_energy_windows"
                                                                  },
                                                                  "icon_color": "orange"
                                                            }
                                                      ]
                                                }
                                          ]
                                    }
                              ]
                        }
                  ]
            }
      ]
};
  }
}

if (!customElements.get("ll-strategy-dashboard-cheapest-energy-windows")) {
  customElements.define(
    "ll-strategy-dashboard-cheapest-energy-windows",
    CheapestEnergyWindowsStrategy
  );
}

console.log("Cheapest Energy Windows dashboard strategy loaded");
