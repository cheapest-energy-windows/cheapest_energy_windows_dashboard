
class CheapestEnergyWindowsStrategy extends HTMLElement {
  static async generate(info, entities) {
    try {
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
                        "title": "🗓️ {{ now().strftime('%A, %B %d') }}"
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Average (Day)",
                            "secondary": "{% set prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_today') | default([]) %} {% set avg_price = (prices | map(attribute='value') | sum / prices | length) if prices | length > 0 else 0 %} €{{ avg_price | round(3) }}/kWh",
                            "icon": "mdi:chart-line-variant",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "blue",
                            "features_position": "bottom",
                            "multiline_secondary": false,
                            "vertical": true,
                            "layout": "vertical",
                            "icon_type": "icon",
                            "card_mod": {
                              "style": "ha-card {\n  --icon-size: 28px;\n  --icon-symbol-size: 20px;\n  --spacing: 2px;\n  border-radius: 12px 0 0 0;\n  margin-right: -4px;\n  border: 0;\n  #clip-path: inset(0 0 3px 0);\n  #border-right: 1px solid rgba(255,255,255,0.1);\n}\n:host {\n  --mush-card-primary-font-size: 12px;\n  --mush-card-secondary-font-size: 13px;\n}\nmushroom-shape-icon {\n  --shape-icon-size: 28px !important;\n  margin-top: -8px !important;\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "{% set windows = state_attr('sensor.cew_today', 'cheapest_times') | default([], true) %} {% if windows | length > 0 %}Cheap ({{ windows | length }}){% else %}Cheap Avg (Day){% endif %}",
                            "secondary": "{% set windows = state_attr('sensor.cew_today', 'cheapest_times') | default([], true) %} {% if windows | length > 0 %}\n  €{{ state_attr('sensor.cew_today', 'avg_cheap_price') | float(0) | round(3) }}/kWh\n{% else %}\n  {% set prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_today') | default([]) %}\n  {% if prices | length > 0 %}\n    {% set values = prices | map(attribute='value') | list | sort %}\n    {% set half = (values | length / 2) | int %}\n    {% set cheap_values = values[:half] if half > 0 else values %}\n    {% set cheap_avg = cheap_values | sum / cheap_values | length %}\n    €{{ cheap_avg | round(3) }}/kWh\n  {% else %}€0.0/kWh{% endif %}\n{% endif %}",
                            "icon": "mdi:arrow-down-circle",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "green",
                            "vertical": true,
                            "features_position": "bottom",
                            "layout": "vertical",
                            "icon_type": "icon",
                            "card_mod": {
                              "style": "ha-card {\n  --icon-size: 28px;\n  --icon-symbol-size: 20px;\n  --spacing: 2px;\n  border-radius: 0;\n  margin-left: -4px;\n  margin-right: -4px;\n  border: 0;\n  #clip-path: inset(0 0 3px 0);\n  #border-right: 1px solid rgba(255,255,255,0.1);\n}\n:host {\n  --mush-card-primary-font-size: 12px;\n  --mush-card-secondary-font-size: 13px;\n}\nmushroom-shape-icon {\n  --shape-icon-size: 28px !important;\n  margin-top: -8px !important;\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "{% set windows = state_attr('sensor.cew_today', 'expensive_times') | default([], true) %} {% if windows | length > 0 %}Expensive ({{ windows | length }}){% else %}Expensive Avg (Day){% endif %}",
                            "secondary": "{% set windows = state_attr('sensor.cew_today', 'expensive_times') | default([], true) %} {% if windows | length > 0 %}\n  €{{ state_attr('sensor.cew_today', 'avg_expensive_price') | float(0) | round(3) }}/kWh\n{% else %}\n  {% set prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_today') | default([]) %}\n  {% if prices | length > 0 %}\n    {% set values = prices | map(attribute='value') | list | sort %}\n    {% set half = (values | length / 2) | int %}\n    {% set expensive_values = values[half:] if half > 0 else values %}\n    {% set expensive_avg = expensive_values | sum / expensive_values | length %}\n    €{{ expensive_avg | round(3) }}/kWh\n  {% else %}€0.0/kWh{% endif %}\n{% endif %}",
                            "icon": "mdi:arrow-up-circle",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "red",
                            "vertical": true,
                            "features_position": "bottom",
                            "layout": "vertical",
                            "icon_type": "icon",
                            "card_mod": {
                              "style": "ha-card {\n  --icon-size: 28px;\n  --icon-symbol-size: 20px;\n  --spacing: 2px;\n  border-radius: 0 12px 0 0;\n  margin-left: -4px;\n  border: 0;\n  #clip-path: inset(0 0 3px 0);\n}\n:host {\n  --mush-card-primary-font-size: 12px;\n  --mush-card-secondary-font-size: 13px;\n}\nmushroom-shape-icon {\n  --shape-icon-size: 28px !important;\n  margin-top: -8px !important;\n}\n"
                            }
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
                            "show": false,
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
                            "borderColor": "#6b7280",
                            "strokeDashArray": 4,
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
                              "top": 0,
                              "bottom": 0
                            }
                          },
                          "tooltip": {
                            "enabled": true,
                            "custom": "EVAL:function({seriesIndex, dataPointIndex, w}) {\n  const data = w.config.series[0].data[dataPointIndex];\n  const baseStyle = 'padding: 10px 12px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;';\n  if (data.override && data.overrideMode === 'off') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #3f3f46 0%, #27272a 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">🔌 Time Override: Battery Off</div><div style=\"font-size: 12px; opacity: 0.9;\">Operations suspended</div></div>';\n  if (data.override && data.overrideMode === 'idle') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">💤 Time Override: Idle</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced idle/smart meter mode</div></div>';\n  if (data.override && data.overrideMode === 'charge') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%); color: #1a2e05;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">⚡ Time Override: Charging</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced charging period</div></div>';\n  if (data.override && data.overrideMode === 'discharge') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">🔌 Time Override: Discharging</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced discharging period</div></div>';\n  if (data.override && data.overrideMode === 'discharge_aggressive') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">⚡ Time Override: Peak Discharge</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced aggressive discharge</div></div>';\n  if (data.charge) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">🔋 Charging Window</div><div style=\"font-size: 12px; opacity: 0.9;\">Cheap energy period</div></div>';\n  if (data.aggressiveDischarge) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">⚡ Peak Discharge</div><div style=\"font-size: 12px; opacity: 0.9;\">Maximum price opportunity</div></div>';\n  if (data.discharge) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">🔌 Discharge Window</div><div style=\"font-size: 12px; opacity: 0.9;\">Elevated price period</div></div>';\n  return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">💡 Normal Period</div><div style=\"font-size: 12px; opacity: 0.9;\">Smart meter mode</div></div>';\n}\n"
                          }
                        },
                        "series": [
                          {
                            "entity": "sensor.cew_price_sensor_proxy",
                            "name": "Energy Periods",
                            "type": "column",
                            "data_generator": "const lastCalc = hass.states['sensor.cew_last_calculation']?.state; const priceSensor = hass.states['sensor.cew_price_sensor_proxy']; const cheapest = hass.states['sensor.cew_today']; if (!priceSensor?.attributes?.raw_today || !cheapest?.attributes) return [];\nconst pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes';\nconst override1Enabled = hass.states['switch.cew_time_override_enabled']?.state === 'on'; const override1Start = hass.states['time.cew_time_override_start']?.state; const override1End = hass.states['time.cew_time_override_end']?.state; const override1Mode = hass.states['select.cew_time_override_mode']?.state;\nfunction isInTimeRange(timeMs, startTime, endTime) {\n  const date = new Date(timeMs);\n  const timeStr = date.toTimeString().substring(0, 8);\n  return startTime <= timeStr && timeStr < endTime;\n}\nconst actualChargeTimes = cheapest.attributes.actual_charge_times || []; const actualDischargeTimes = cheapest.attributes.actual_discharge_times || []; const aggressiveDischargeTimes = cheapest.attributes.expensive_times_aggressive || []; const spreadMet = cheapest.attributes.spread_met; const dischargeSpreadMet = cheapest.attributes.discharge_spread_met;\nconst chargeSet = new Set(actualChargeTimes.map(t => new Date(t).getTime())); const dischargeSet = new Set(actualDischargeTimes.map(t => new Date(t).getTime())); const aggressiveSet = new Set(aggressiveDischargeTimes.map(t => new Date(t).getTime()));\nlet rawData = priceSensor.attributes.raw_today;\nconst chargeHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(chargeSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\nconst dischargeHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(dischargeSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\nconst aggressiveHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(aggressiveSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\n\nreturn rawData.map(item => {\n  const time = new Date(item.start).getTime();\n\n  let isCharge, isDischarge, isAggressiveDischarge;\n  if (pricingMode === '1_hour') {\n    const hourStart = Math.floor(time / 3600000) * 3600000;\n    isCharge = (actualChargeTimes.length > 0) && chargeHours.has(hourStart);\n    isDischarge = (actualDischargeTimes.length > 0) && dischargeHours.has(hourStart);\n    isAggressiveDischarge = (aggressiveDischargeTimes.length > 0) && aggressiveHours.has(hourStart);\n  } else {\n    isCharge = (actualChargeTimes.length > 0) && chargeSet.has(time);\n    isDischarge = (actualDischargeTimes.length > 0) && dischargeSet.has(time);\n    isAggressiveDischarge = (aggressiveDischargeTimes.length > 0) && aggressiveSet.has(time);\n  }\n\n  const isOverride = override1Enabled && override1Start && override1End && isInTimeRange(time, override1Start, override1End);\n  const overrideMode = isOverride ? override1Mode : null;\n\n  let color = 'transparent';\n  if (isOverride && overrideMode === 'off') color = '#3f3f46';\n  else if (isOverride && overrideMode === 'idle') color = 'transparent';\n  else if (isOverride && overrideMode === 'charge') color = '#a3e635';\n  else if (isOverride && overrideMode === 'discharge') color = '#fb923c';\n  else if (isOverride && overrideMode === 'discharge_aggressive') color = '#dc2626';\n  else if (isCharge) color = '#22c55e';\n  else if (isAggressiveDischarge) color = '#dc2626';\n  else if (isDischarge) color = '#f97316';\n\n  return {\n    x: time,\n    y: 1,\n    fillColor: color,\n    charge: isCharge,\n    discharge: isDischarge,\n    aggressiveDischarge: isAggressiveDischarge,\n    override: isOverride,\n    overrideMode: overrideMode\n  };\n});\n",
                            "stroke_width": 0
                          },
                          {
                            "entity": "sensor.cew_last_calculation",
                            "name": "Calculation Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "sensor.cew_today",
                            "name": "Windows Trigger",
                            "show": {
                              "in_chart": false
                            }
                          }
                        ],
                        "card_mod": {
                          "style": "ha-card {  border-radius: 0;  margin-top: -5px;  border: 0;  clip-path: inset(0 0 3px 0) }\n"
                        }
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
                        "experimental": {
                          "color_threshold": true
                        },
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
                            },
                            "stacked": false
                          },
                          "plotOptions": {
                            "bar": {
                              "horizontal": false,
                              "columnWidth": "95%",
                              "distributed": false,
                              "dataLabels": {
                                "position": "top"
                              }
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
                            "borderColor": "#6b7280",
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
                            "shared": true,
                            "intersect": false,
                            "theme": "dark",
                            "x": {
                              "format": "HH:mm"
                            },
                            "y": {
                              "formatter": "EVAL:function(value) {\n  return '€' + value.toFixed(3) + '/kWh';\n}\n"
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
                              "formatter": "EVAL:function(value) {\n  return '€' + value.toFixed(3);\n}\n",
                              "style": {
                                "fontSize": "11px"
                              }
                            }
                          }
                        },
                        "series": [
                          {
                            "entity": "sensor.cew_price_sensor_proxy",
                            "name": "Avg Buy Price",
                            "type": "area",
                            "color_threshold": [
                              {
                                "value": 0,
                                "color": "green"
                              },
                              {
                                "value": 0.15,
                                "color": "lightgreen"
                              },
                              {
                                "value": 0.2,
                                "color": "yellow"
                              },
                              {
                                "value": 0.35,
                                "color": "red"
                              },
                              {
                                "value": 0.5,
                                "color": "purple"
                              }
                            ],
                            "curve": "stepline",
                            "stroke_width": 2,
                            "float_precision": 3,
                            "show": {
                              "in_header": true,
                              "legend_value": true
                            },
                            "data_generator": "const priceSensor = hass.states['sensor.cew_price_sensor_proxy']; if (!priceSensor?.attributes?.calculated_today) return [[Date.now(), null]]; const pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes'; let buyData = priceSensor.attributes.calculated_today; if (pricingMode === '1_hour') {\n  const hourlyData = {};\n  buyData.forEach(item => {\n    const hourStart = Math.floor(new Date(item.start).getTime() / 3600000) * 3600000;\n    if (!hourlyData[hourStart]) hourlyData[hourStart] = { values: [], count: 0 };\n    hourlyData[hourStart].values.push(item.value);\n    hourlyData[hourStart].count++;\n  });\n  buyData = Object.keys(hourlyData).map(h => ({\n    start: new Date(parseInt(h)).toISOString(),\n    value: hourlyData[h].values.reduce((a, b) => a + b, 0) / hourlyData[h].count\n  }));\n} return buyData.map(item => [new Date(item.start).getTime(), item.value]);\n"
                          },
                          {
                            "entity": "sensor.cew_price_sensor_proxy",
                            "name": "Avg Sell Price",
                            "type": "line",
                            "color": "#DC143C",
                            "curve": "stepline",
                            "stroke_width": 2,
                            "float_precision": 3,
                            "show": {
                              "in_header": true,
                              "legend_value": true
                            },
                            "data_generator": "const priceSensor = hass.states['sensor.cew_price_sensor_proxy']; if (!priceSensor?.attributes?.calculated_sell_today) return [[Date.now(), null]]; if (priceSensor.attributes.buy_equals_sell) return []; const pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes'; let sellData = priceSensor.attributes.calculated_sell_today; if (pricingMode === '1_hour') {\n  const hourlyData = {};\n  sellData.forEach(item => {\n    const hourStart = Math.floor(new Date(item.start).getTime() / 3600000) * 3600000;\n    if (!hourlyData[hourStart]) hourlyData[hourStart] = { values: [], count: 0 };\n    hourlyData[hourStart].values.push(item.value);\n    hourlyData[hourStart].count++;\n  });\n  sellData = Object.keys(hourlyData).map(h => ({\n    start: new Date(parseInt(h)).toISOString(),\n    value: hourlyData[h].values.reduce((a, b) => a + b, 0) / hourlyData[h].count\n  }));\n} return sellData.map(item => [new Date(item.start).getTime(), item.value]);\n"
                          },
                          {
                            "entity": "select.cew_price_formula",
                            "name": "Price Formula Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "select.cew_pricing_window_duration",
                            "name": "Mode Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "number.cew_vat",
                            "name": "VAT Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "number.cew_tax",
                            "name": "Tax Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "number.cew_additional_cost",
                            "name": "Additional Cost Trigger",
                            "show": {
                              "in_chart": false
                            }
                          }
                        ],
                        "card_mod": {
                          "style": "ha-card { border-radius: 0; margin-top: -8px; border: 0; clip-path: inset(0 0 3px 0);}\n"
                        }
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Spread",
                            "secondary": "{% set spread = state_attr('sensor.cew_today', 'spread_avg') | float(0) %} {{ spread | round(1) }}%",
                            "icon": "mdi:chart-line-variant",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set spread = state_attr('sensor.cew_today', 'spread_avg') | float(0) %} {% if spread >= 20 %}green{% elif spread >= 10 %}orange{% else %}red{% endif %}",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: -8px;\noverflow: visible;\nmargin-top: -8px;\nmargin-bottom: 30px;\nborder-radius: 0;\nborder: 0;\n#border-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Arbitrage",
                            "secondary": "{% set arb = state_attr('sensor.cew_today', 'arbitrage_avg') | float(0) %} {{ arb | round(1) }}%",
                            "icon": "mdi:battery-sync",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set arb = state_attr('sensor.cew_today', 'arbitrage_avg') | float(0) %} {% if arb >= 10 %}green{% elif arb >= 0 %}orange{% else %}red{% endif %}",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-left: -12px;\noverflow: visible;\nmargin-top: -8px;\nmargin-bottom: 30px;\nborder-radius: 0;\nborder: 0;\n#border-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Charge",
                            "secondary": "{% set total = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) | length %}{% set completed = state_attr('sensor.cew_today', 'completed_charge_windows') | int(0) %}{{ completed }}/{{ total }}",
                            "icon": "mdi:battery-charging",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% if state_attr('sensor.cew_today', 'actual_charge_times') | length > 0 %}green\n{% else %}grey\n{% endif %}\n",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card { margin-left: -12px; margin-right: 0px; margin-top: -8px; border-radius: 0; border: 0;  #border-right: 1px solid rgba(255,255,255,0.1) }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Discharge",
                            "secondary": "{% set total = state_attr('sensor.cew_today', 'actual_discharge_times') | default([], true) | length %}{% set completed = state_attr('sensor.cew_today', 'completed_discharge_windows') | int(0) %}{{ completed }}/{{ total }}",
                            "icon": "mdi:battery-minus",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set count = state_attr('sensor.cew_today', 'actual_discharge_times') | default([], true) | length %}\n{% if count > 0 %}orange\n{% else %}grey\n{% endif %}\n",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card { margin-left: -18px; margin-right: 6px; margin-top: -8px; border-radius: 0;  border: 0; #border-right: 1px solid rgba(255,255,255,0.1) }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Criteria",
                            "secondary": "{% set actual_charge = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) | length %} {% set max_charge = states('number.cew_charging_windows') | int(6) %} {% set actual_discharge = state_attr('sensor.cew_today', 'actual_discharge_times') | default([], true) | length %} {% set max_discharge = states('number.cew_expensive_windows') | int(3) %} C:{{ actual_charge }}/{{ max_charge }}{{ '\\n' }}D:{{ actual_discharge }}/{{ max_discharge }}",
                            "multiline_secondary": true,
                            "icon": "{% set actual_charge = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) | length %} {% set max_charge = states('number.cew_charging_windows') | int(6) %} {% set actual_discharge = state_attr('sensor.cew_today', 'actual_discharge_times') | default([], true) | length %} {% set max_discharge = states('number.cew_expensive_windows') | int(3) %} {% if actual_charge >= max_charge and actual_discharge >= max_discharge %}mdi:check-circle {% elif actual_charge == 0 and actual_discharge == 0 %}mdi:close-circle {% else %}mdi:alert{% endif %}",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set actual_charge = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) | length %} {% set max_charge = states('number.cew_charging_windows') | int(6) %} {% set actual_discharge = state_attr('sensor.cew_today', 'actual_discharge_times') | default([], true) | length %} {% set max_discharge = states('number.cew_expensive_windows') | int(3) %} {% if actual_charge >= max_charge and actual_discharge >= max_discharge %}green {% elif actual_charge == 0 and actual_discharge == 0 %}red {% else %}amber{% endif %}",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {  margin-left: -20px;  margin-right: -6px;  margin-top: -8px; border-radius: 0;  border: 0;  }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Cost",
                            "secondary": "{% set current = state_attr('sensor.cew_today', 'total_cost') | float(0) %} {% set planned = state_attr('sensor.cew_today', 'planned_total_cost') | float(0) %} {{ '€' + ('%.2f' | format(current)) }}/{{ '€' + ('%.2f' | format(planned)) }}",
                            "icon": "mdi:currency-eur",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set total_cost = state_attr('sensor.cew_today', 'total_cost') | float(0) %}\n{% if total_cost < 0 %}green\n{% elif total_cost > 0 %}red\n{% else %}grey\n{% endif %}\n",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-left: -24px;\nmargin-top: -8px;\nborder-radius: 0;\nborder: 0; }\n"
                            }
                          }
                        ]
                      },
                      {
                        "type": "entities",
                        "entities": [
                          {
                            "type": "custom:fold-entity-row",
                            "head": {
                              "type": "section",
                              "label": "☀️ Today's Settings (Active Now)"
                            },
                            "padding": 0,
                            "entities": [
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "🪟 Window Selection"
                                },
                                "padding": 5,
                                "entities": [
                                  {
                                    "entity": "number.cew_charging_windows",
                                    "name": "Charging Windows (max)"
                                  },
                                  {
                                    "entity": "number.cew_expensive_windows",
                                    "name": "Discharge Windows (max)"
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Percentile Threshold",
                                    "secondary": "Filters candidate windows by price percentile. Example at 25%: Charge considers only the cheapest 25% of prices. Discharge considers only the most expensive 25% of prices.",
                                    "icon": "mdi:information-outline",
                                    "icon_color": "amber",
                                    "multiline_secondary": true,
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n      background: rgba(var(--rgb-primary-color), 0.1);\n      box-shadow: none;\n      }\n"
                                    }
                                  },
                                  {
                                    "entity": "number.cew_percentile_threshold",
                                    "name": "Percentile Threshold"
                                  }
                                ]
                              },
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "📊 Profit Settings"
                                },
                                "padding": 5,
                                "entities": [
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Profit = Spread - RTE Loss",
                                    "secondary": "Example: 25% spread - 15% RTE loss = 10% profit. Windows qualify if profit exceeds threshold. Min Buy Price Diff only applies to charging windows.",
                                    "icon": "mdi:information-outline",
                                    "icon_color": "amber",
                                    "multiline_secondary": true,
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n      background: rgba(var(--rgb-primary-color), 0.1);\n      box-shadow: none;\n      }\n"
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Actual Margins Today",
                                    "secondary": "{% set rte = states('number.cew_battery_rte') | float(85) %} {% set rte_loss = 100 - rte %} {% set buy = state_attr('sensor.cew_today', 'spread_avg') | float(0) %} {% set sell = state_attr('sensor.cew_today', 'arbitrage_avg') | float(0) %} Buy: {{ (buy - rte_loss) | round(1) }}% | Sell: {{ (sell - rte_loss) | round(1) }}% (RTE loss: {{ rte_loss | round(0) }}%)",
                                    "icon": "mdi:chart-box-outline",
                                    "icon_color": "green",
                                    "multiline_secondary": true,
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n      background: rgba(var(--rgb-success-color), 0.1);\n      box-shadow: none;\n      }\n"
                                    }
                                  },
                                  {
                                    "entity": "number.cew_min_profit_charge",
                                    "name": "Min Profit % (Charge)"
                                  },
                                  {
                                    "entity": "number.cew_min_profit_discharge",
                                    "name": "Min Profit % (Discharge)"
                                  },
                                  {
                                    "entity": "number.cew_min_profit_discharge_aggressive",
                                    "name": "Min Profit % (Aggressive)"
                                  },
                                  {
                                    "entity": "switch.cew_min_buy_price_diff_enabled",
                                    "name": "Enable Min Buy Price Diff"
                                  },
                                  {
                                    "entity": "number.cew_min_price_difference",
                                    "name": "Min Buy Price Difference"
                                  }
                                ]
                              },
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "💰 Price Override (Always Charge Below)"
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
                                  "label": "⏰ Time Override (Force Action During Period)"
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
                                  "label": "🪟 Calculation Window (Restrict Price Analysis)"
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
                          }
                        ],
                        "card_mod": {
                          "style": "ha-card {\nborder-radius: 12px 12px 12px 12px;\nmargin-top: -38px;\nmargin-bottom: 25px;\nclip-path: inset(25px 0 0 0);\nborder: 0; \n}\n"
                        }
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Charge",
                            "secondary": "{% set times = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) %} {{ times | length }} windows",
                            "icon": "mdi:lightning-bolt",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "green",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {      margin-top: -30px;      margin-right: -20px;      border-radius: 12px 0 0 0;      border: 0; border-right: 1px solid rgba(255,255,255,0.1); #border-bottom: 1px solid rgba(255,255,255,0.1)    }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Cost",
                            "secondary": "{% set prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set effective_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set total_cost = (prices | sum) * window_duration * effective_power if prices else 0 %} €{{ '%.2f' | format(total_cost) }}",
                            "icon": "mdi:cash-minus",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "red",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {     margin-top: -30px;     margin-right: -4px;     margin-left: 12px; border-radius: 0 0 0 0; border: 0;    border-right: 1px solid rgba(255,255,255,0.1);   #border-bottom: 1px solid rgba(255,255,255,0.1)    }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Spread",
                            "secondary": "{% set charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set ref_price = state_attr('sensor.cew_today', 'percentile_expensive_avg') | float(0) %} {% if charge_prices | length == 0 %}0.0%{% else %} {% set avg_charge = (charge_prices | sum / charge_prices | length) %} {% set spread = ((ref_price - avg_charge) / avg_charge * 100) if avg_charge > 0 else 0 %} {{ spread | round(1) }}%{% endif %}",
                            "icon": "mdi:arrow-expand-vertical",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set ref_price = state_attr('sensor.cew_today', 'percentile_expensive_avg') | float(0) %} {% if charge_prices | length == 0 %}red{% else %} {% set avg_charge = (charge_prices | sum / charge_prices | length) %} {% set spread = ((ref_price - avg_charge) / avg_charge * 100) if avg_charge > 0 else 0 %} {% if spread >= 20 %}green{% elif spread >= 10 %}orange{% else %}red{% endif %}{% endif %}",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {     margin-top: -30px;     margin-right: 0px; margin-left: -4px; border-radius: 0 0 0 0;  border: 0;     border-right: 1px solid rgba(255,255,255,0.1); #border-bottom: 1px solid rgba(255,255,255,0.1)    }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Net",
                            "secondary": "{% set net_charge = state_attr('sensor.cew_today', 'net_planned_charge_kwh') | float(0) %} {{ net_charge | round(1) }} kWh",
                            "icon": "mdi:battery-charging",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "green",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {      margin-top: -30px;      margin-bottom: 30px;   margin-right: 0px; margin-left: -8px; border-radius: 0 12px 0 0;      border: 0;     #border-bottom: 1px solid rgba(255,255,255,0.1)   }\n"
                            }
                          }
                        ]
                      },
                      {
                        "type": "markdown",
                        "content": "{% set groups = state_attr('sensor.cew_today', 'grouped_charge_windows') | default([]) %} {% set cpk = state_attr('sensor.cew_today', 'charge_power_kw') | float(0) %} {% set buk = state_attr('sensor.cew_today', 'base_usage_kw') | float(0) %} {% set cs = states('select.cew_base_usage_charge_strategy') %} {% set wd = state_attr('sensor.cew_today', 'window_duration_hours') | float(0.25) %} {% set epk = (cpk - buk) if cs == 'battery_covers_base' else cpk %} {% if groups | length > 0 %} {% for g in groups %}<b>Time:</b>{{ g.start_time }}-{{ g.end_time }} - <b>Avg:</b>€{{ '%.3f' | format(g.avg_price) }} - <b>Sprd:</b>{{ g.spread_pct }}% - <b>Cost:</b>€{{ '%.2f' | format((g.prices | sum) * wd * cpk) }} - <b>kWh:</b>{{ (epk * wd * g.num_windows) | round(1) }}<br>{% endfor %} {% else %}*No charge windows scheduled*{% endif %}",
                        "card_mod": {
                          "style": "ha-card {\n  padding: 0 16px;\n  margin-top: -38px;\n  margin-bottom: 38px;\n  #margin-right: -10px;\n  #margin-left: -10px;\n  border-radius: 0;\n  border: 0;\n  min-height: 125px;\n  max-height: 125px;\n  overflow-y: auto;      \n  clip-path: inset(0 0 3px 0);\n}\n"
                        }
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Discharge",
                            "secondary": "{% set times = state_attr('sensor.cew_today', 'actual_discharge_times') | default([], true) %} {{ times | length }} windows",
                            "icon": "mdi:battery-arrow-down",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "orange",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: -20px;\nmargin-top: -46px;\nmargin-bottom: 16px;\nborder-radius: 0;\nborder: 0;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\nborder-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Rev.",
                            "secondary": "{% set prices = state_attr('sensor.cew_today', 'actual_discharge_sell_prices') or [] %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %} {% set total_revenue = (prices | sum) * window_duration * discharge_power_kw if prices else 0 %} €{{ '%.2f' | format(total_revenue) }}",
                            "icon": "mdi:cash-plus",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "green",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: -4px;\nmargin-left: 12px;\nmargin-top: -46px;\nmargin-bottom: 16px;\nborder-radius: 0;\nborder: 0;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\nborder-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Arbitrage",
                            "secondary": "{% set charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set discharge_prices = state_attr('sensor.cew_today', 'actual_discharge_sell_prices') | default([], true) %} {% if discharge_prices | length == 0 %}0.0%{% else %} {% set ref_price = (charge_prices | sum / charge_prices | length) if charge_prices | length > 0 else state_attr('sensor.cew_today', 'percentile_cheap_avg') | float(0) %} {% set avg_discharge = (discharge_prices | sum / discharge_prices | length) %} {% set arb = ((avg_discharge - ref_price) / ref_price * 100) if ref_price > 0 else 0 %} {{ arb | round(1) }}%{% endif %}",
                            "icon": "mdi:arrow-expand-vertical",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set discharge_prices = state_attr('sensor.cew_today', 'actual_discharge_sell_prices') | default([], true) %} {% if discharge_prices | length == 0 %}red{% else %} {% set ref_price = (charge_prices | sum / charge_prices | length) if charge_prices | length > 0 else state_attr('sensor.cew_today', 'percentile_cheap_avg') | float(0) %} {% set avg_discharge = (discharge_prices | sum / discharge_prices | length) %} {% set arb = ((avg_discharge - ref_price) / ref_price * 100) if ref_price > 0 else 0 %} {% if arb >= 20 %}green{% elif arb >= 10 %}orange{% else %}red{% endif %}{% endif %}",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: 0px;\nmargin-left: -4px;\nmargin-right: -10px;\nmargin-top: -46px;\nmargin-bottom: 16px;\nborder-radius: 0;\nborder: 0;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\nclip-path: inset(0 0 0 0);\nborder-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Net",
                            "secondary": "{% set net_kwh = state_attr('sensor.cew_today', 'net_planned_discharge_kwh') | float(0) %} {{ net_kwh | round(1) }} kWh",
                            "icon": "mdi:battery-arrow-up-outline",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "orange",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: 0px;\nmargin-left: -12px;\nmargin-top: -46px;\nmargin-bottom: 46px;\nborder-radius: 0;\nborder: 0;\nclip-path: inset(0 0 0 13.5px);\nborder-lef: 1px solid rgba(255,255,255,0.1);\n\n}\n"
                            }
                          }
                        ],
                        "card_mod": {
                          "style": ":host {\n  margin-top: -8px !important;\n}\n"
                        }
                      },
                      {
                        "type": "markdown",
                        "content": "{% set groups = state_attr('sensor.cew_today', 'grouped_discharge_windows') | default([]) %} {% set dpk = state_attr('sensor.cew_today', 'discharge_power_kw') | float(0) %} {% set buk = state_attr('sensor.cew_today', 'base_usage_kw') | float(0) %} {% set ds = states('select.cew_base_usage_discharge_strategy') %} {% set wd = state_attr('sensor.cew_today', 'window_duration_hours') | float(0.25) %} {% set epk = (dpk - buk) if ds == 'subtract_base' else dpk %} {% if groups | length > 0 %} {% for g in groups %}<b>Time:</b>{{ g.start_time }}-{{ g.end_time }} - <b>Avg:</b>€{{ '%.3f' | format(g.avg_price) }} - <b>Sprd:</b>{{ g.spread_pct }}% - <b>Rev:</b>€{{ '%.2f' | format((g.prices | sum) * wd * dpk) }} - <b>kWh:</b>{{ (epk * wd * g.num_windows) | round(1) }}<br>{% endfor %} {% else %}*No discharge windows scheduled*{% endif %}",
                        "card_mod": {
                          "style": "ha-card {\n  padding: 0 16px;\n  margin-top: -54px;\n  margin-bottom: 54px;\n  #margin-left: -10px;\n  #margin-right: -10px;\n  clip-path: inset(0 0 0 0);\n  border-radius: 0 0 12px 12px;\n  border: 0;\n  min-height: 125px;\n  max-height: 125px;\n  overflow-y: auto;\n}\n"
                        }
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
                        "title": "🗓️ {{ (now() + timedelta(days=1)).strftime('%A, %B %d') }}"
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Average (Day)",
                            "secondary": "{% set prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_tomorrow') | default([]) %} {% set avg_price = (prices | map(attribute='value') | sum / prices | length) if prices | length > 0 else 0 %} €{{ avg_price | round(3) }}/kWh",
                            "icon": "mdi:chart-line-variant",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "blue",
                            "features_position": "bottom",
                            "multiline_secondary": false,
                            "vertical": true,
                            "layout": "vertical",
                            "icon_type": "icon",
                            "card_mod": {
                              "style": "ha-card {\n  --icon-size: 28px;\n  --icon-symbol-size: 20px;\n  --spacing: 2px;\n  border-radius: 12px 0 0 0;\n  margin-right: -4px;\n  border: 0;\n  #clip-path: inset(0 0 3px 0);\n  #border-right: 1px solid rgba(255,255,255,0.1);\n}\n:host {\n  --mush-card-primary-font-size: 12px;\n  --mush-card-secondary-font-size: 13px;\n}\nmushroom-shape-icon {\n  --shape-icon-size: 28px !important;\n  margin-top: -8px !important;\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "{% set windows = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([], true) %} {% if windows | length > 0 %}Cheap ({{ windows | length }}){% else %}Cheap Avg (Day){% endif %}",
                            "secondary": "{% set windows = state_attr('sensor.cew_tomorrow', 'cheapest_times') | default([], true) %} {% if windows | length > 0 %}\n  €{{ state_attr('sensor.cew_tomorrow', 'avg_cheap_price') | float(0) | round(3) }}/kWh\n{% else %}\n  {% set prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_tomorrow') | default([]) %}\n  {% if prices | length > 0 %}\n    {% set values = prices | map(attribute='value') | list | sort %}\n    {% set half = (values | length / 2) | int %}\n    {% set cheap_values = values[:half] if half > 0 else values %}\n    {% set cheap_avg = cheap_values | sum / cheap_values | length %}\n    €{{ cheap_avg | round(3) }}/kWh\n  {% else %}€0.0/kWh{% endif %}\n{% endif %}",
                            "icon": "mdi:arrow-down-circle",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "green",
                            "vertical": true,
                            "features_position": "bottom",
                            "layout": "vertical",
                            "icon_type": "icon",
                            "card_mod": {
                              "style": "ha-card {\n  --icon-size: 28px;\n  --icon-symbol-size: 20px;\n  --spacing: 2px;\n  border-radius: 0;\n  margin-left: -4px;\n  margin-right: -4px;\n  border: 0;\n  #clip-path: inset(0 0 3px 0);\n  #border-right: 1px solid rgba(255,255,255,0.1);\n}\n:host {\n  --mush-card-primary-font-size: 12px;\n  --mush-card-secondary-font-size: 13px;\n}\nmushroom-shape-icon {\n  --shape-icon-size: 28px !important;\n  margin-top: -8px !important;\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "{% set windows = state_attr('sensor.cew_tomorrow', 'expensive_times') | default([], true) %} {% if windows | length > 0 %}Expensive ({{ windows | length }}){% else %}Expensive Avg (Day){% endif %}",
                            "secondary": "{% set windows = state_attr('sensor.cew_tomorrow', 'expensive_times') | default([], true) %} {% if windows | length > 0 %}\n  €{{ state_attr('sensor.cew_tomorrow', 'avg_expensive_price') | float(0) | round(3) }}/kWh\n{% else %}\n  {% set prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_tomorrow') | default([]) %}\n  {% if prices | length > 0 %}\n    {% set values = prices | map(attribute='value') | list | sort %}\n    {% set half = (values | length / 2) | int %}\n    {% set expensive_values = values[half:] if half > 0 else values %}\n    {% set expensive_avg = expensive_values | sum / expensive_values | length %}\n    €{{ expensive_avg | round(3) }}/kWh\n  {% else %}€0.0/kWh{% endif %}\n{% endif %}",
                            "icon": "mdi:arrow-up-circle",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "red",
                            "vertical": true,
                            "features_position": "bottom",
                            "layout": "vertical",
                            "icon_type": "icon",
                            "card_mod": {
                              "style": "ha-card {\n  --icon-size: 28px;\n  --icon-symbol-size: 20px;\n  --spacing: 2px;\n  border-radius: 0 12px 0 0;\n  margin-left: -4px;\n  border: 0;\n  #clip-path: inset(0 0 3px 0);\n}\n:host {\n  --mush-card-primary-font-size: 12px;\n  --mush-card-secondary-font-size: 13px;\n}\nmushroom-shape-icon {\n  --shape-icon-size: 28px !important;\n  margin-top: -8px !important;\n}\n"
                            }
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
                            "show": false,
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
                            "borderColor": "#6b7280",
                            "strokeDashArray": 4,
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
                              "top": 0,
                              "bottom": 0
                            }
                          },
                          "tooltip": {
                            "enabled": true,
                            "custom": "EVAL:function({seriesIndex, dataPointIndex, w}) {\n  const data = w.config.series[0].data[dataPointIndex];\n  const baseStyle = 'padding: 10px 12px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;';\n  if (data.override && data.overrideMode === 'off') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #3f3f46 0%, #27272a 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">🔌 Time Override: Battery Off</div><div style=\"font-size: 12px; opacity: 0.9;\">Operations suspended</div></div>';\n  if (data.override && data.overrideMode === 'idle') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">💤 Time Override: Idle</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced idle/smart meter mode</div></div>';\n  if (data.override && data.overrideMode === 'charge') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #a3e635 0%, #84cc16 100%); color: #1a2e05;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">⚡ Time Override: Charging</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced charging period</div></div>';\n  if (data.override && data.overrideMode === 'discharge') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">🔌 Time Override: Discharging</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced discharging period</div></div>';\n  if (data.override && data.overrideMode === 'discharge_aggressive') return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">⚡ Time Override: Peak Discharge</div><div style=\"font-size: 12px; opacity: 0.9;\">Forced aggressive discharge</div></div>';\n  if (data.charge) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">🔋 Charging Window</div><div style=\"font-size: 12px; opacity: 0.9;\">Cheap energy period</div></div>';\n  if (data.aggressiveDischarge) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">⚡ Peak Discharge</div><div style=\"font-size: 12px; opacity: 0.9;\">Maximum price opportunity</div></div>';\n  if (data.discharge) return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">🔌 Discharge Window</div><div style=\"font-size: 12px; opacity: 0.9;\">Elevated price period</div></div>';\n  return '<div style=\"' + baseStyle + ' background: linear-gradient(135deg, #64748b 0%, #475569 100%); color: #fff;\"><div style=\"font-weight: 600; font-size: 14px; margin-bottom: 4px;\">💡 Normal Period</div><div style=\"font-size: 12px; opacity: 0.9;\">Smart meter mode</div></div>';\n}\n"
                          },
                          "noData": {
                            "text": [
                              "⏰ 13:00-15:00 CET"
                            ],
                            "align": "center",
                            "verticalAlign": "middle",
                            "offsetY": 4,
                            "style": {
                              "color": "#3e3f42",
                              "fontSize": "30px",
                              "fontWeight": "bold",
                              "fontFamily": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif"
                            }
                          }
                        },
                        "series": [
                          {
                            "entity": "sensor.cew_price_sensor_proxy",
                            "name": "Energy Periods",
                            "type": "column",
                            "data_generator": "const lastCalc = hass.states['sensor.cew_last_calculation']?.state; const priceSensor = hass.states['sensor.cew_price_sensor_proxy']; const cheapest = hass.states['sensor.cew_tomorrow']; if (!priceSensor?.attributes?.raw_tomorrow || !priceSensor.attributes.tomorrow_valid || !cheapest?.attributes) return [];\nconst pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes';\nconst actualChargeTimes = cheapest.attributes.actual_charge_times || []; const actualDischargeTimes = cheapest.attributes.actual_discharge_times || []; const aggressiveDischargeTimes = cheapest.attributes.expensive_times_aggressive || []; const spreadMet = cheapest.attributes.spread_met; const dischargeSpreadMet = cheapest.attributes.discharge_spread_met;\nconst chargeSet = new Set(actualChargeTimes.map(t => new Date(t).getTime())); const dischargeSet = new Set(actualDischargeTimes.map(t => new Date(t).getTime())); const aggressiveSet = new Set(aggressiveDischargeTimes.map(t => new Date(t).getTime()));\nconst tomorrowSettingsEnabled = hass.states['switch.cew_tomorrow_settings_enabled']?.state === 'on'; const suffix = tomorrowSettingsEnabled ? '_tomorrow' : ''; const override1Enabled = hass.states['switch.cew_time_override_enabled' + suffix]?.state === 'on'; const override1Start = hass.states['time.cew_time_override_start' + suffix]?.state; const override1End = hass.states['time.cew_time_override_end' + suffix]?.state; const override1Mode = hass.states['select.cew_time_override_mode' + suffix]?.state;\nfunction isInTimeRange(timeMs, startTime, endTime) {\n  const date = new Date(timeMs);\n  const timeStr = date.toTimeString().substring(0, 8);\n  return startTime <= timeStr && timeStr < endTime;\n}\nlet rawData = priceSensor.attributes.raw_tomorrow;\nconst chargeHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(chargeSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\nconst dischargeHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(dischargeSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\nconst aggressiveHours = (pricingMode === '1_hour')\n  ? new Set(Array.from(aggressiveSet).map(t => Math.floor(t / 3600000) * 3600000))\n  : null;\n\nreturn rawData.map(item => {\n  const time = new Date(item.start).getTime();\n\n  let isCharge, isDischarge, isAggressiveDischarge;\n  if (pricingMode === '1_hour') {\n    const hourStart = Math.floor(time / 3600000) * 3600000;\n    isCharge = (actualChargeTimes.length > 0) && chargeHours.has(hourStart);\n    isDischarge = (actualDischargeTimes.length > 0) && dischargeHours.has(hourStart);\n    isAggressiveDischarge = (aggressiveDischargeTimes.length > 0) && aggressiveHours.has(hourStart);\n  } else {\n    isCharge = (actualChargeTimes.length > 0) && chargeSet.has(time);\n    isDischarge = (actualDischargeTimes.length > 0) && dischargeSet.has(time);\n    isAggressiveDischarge = (aggressiveDischargeTimes.length > 0) && aggressiveSet.has(time);\n  }\n\n  const isOverride = override1Enabled && override1Start && override1End && isInTimeRange(time, override1Start, override1End);\n  const overrideMode = isOverride ? override1Mode : null;\n\n  let color = 'transparent';\n  if (isOverride && overrideMode === 'off') color = '#3f3f46';\n  else if (isOverride && overrideMode === 'idle') color = 'transparent';\n  else if (isOverride && overrideMode === 'charge') color = '#a3e635';\n  else if (isOverride && overrideMode === 'discharge') color = '#fb923c';\n  else if (isOverride && overrideMode === 'discharge_aggressive') color = '#dc2626';\n  else if (isCharge) color = '#22c55e';\n  else if (isAggressiveDischarge) color = '#dc2626';\n  else if (isDischarge) color = '#f97316';\n\n  return {\n    x: time,\n    y: 1,\n    fillColor: color,\n    charge: isCharge,\n    discharge: isDischarge,\n    aggressiveDischarge: isAggressiveDischarge,\n    override: isOverride,\n    overrideMode: overrideMode\n  };\n});\n",
                            "stroke_width": 0
                          },
                          {
                            "entity": "sensor.cew_last_calculation",
                            "name": "Calculation Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "sensor.cew_tomorrow",
                            "name": "Windows Trigger",
                            "show": {
                              "in_chart": false
                            }
                          }
                        ],
                        "card_mod": {
                          "style": "ha-card {  border-radius: 0;  margin-top: -5px;  border: 0; clip-path: inset(0 0 3px 0) }\n"
                        }
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
                        "experimental": {
                          "color_threshold": true
                        },
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
                            },
                            "stacked": false
                          },
                          "plotOptions": {
                            "bar": {
                              "horizontal": false,
                              "columnWidth": "95%",
                              "distributed": false,
                              "dataLabels": {
                                "position": "top"
                              }
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
                            "borderColor": "#6b7280",
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
                            "shared": true,
                            "intersect": false,
                            "theme": "dark",
                            "x": {
                              "format": "HH:mm"
                            },
                            "y": {
                              "formatter": "EVAL:function(value) {\n  return '€' + value.toFixed(3) + '/kWh';\n}\n"
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
                              "formatter": "EVAL:function(value) {\n  return '€' + value.toFixed(3);\n}\n",
                              "style": {
                                "fontSize": "11px"
                              }
                            }
                          },
                          "noData": {
                            "text": ""
                          }
                        },
                        "series": [
                          {
                            "entity": "sensor.cew_price_sensor_proxy",
                            "name": "Avg Buy Price",
                            "type": "area",
                            "color_threshold": [
                              {
                                "value": 0,
                                "color": "green"
                              },
                              {
                                "value": 0.15,
                                "color": "lightgreen"
                              },
                              {
                                "value": 0.2,
                                "color": "yellow"
                              },
                              {
                                "value": 0.35,
                                "color": "red"
                              },
                              {
                                "value": 0.5,
                                "color": "purple"
                              }
                            ],
                            "curve": "stepline",
                            "stroke_width": 2,
                            "float_precision": 3,
                            "show": {
                              "in_header": true,
                              "legend_value": true
                            },
                            "data_generator": "const priceSensor = hass.states['sensor.cew_price_sensor_proxy']; if (!priceSensor?.attributes?.calculated_tomorrow || !priceSensor.attributes.tomorrow_valid) return [[Date.now(), null]]; const pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes'; let buyData = priceSensor.attributes.calculated_tomorrow; if (pricingMode === '1_hour') {\n  const hourlyData = {};\n  buyData.forEach(item => {\n    const hourStart = Math.floor(new Date(item.start).getTime() / 3600000) * 3600000;\n    if (!hourlyData[hourStart]) hourlyData[hourStart] = { values: [], count: 0 };\n    hourlyData[hourStart].values.push(item.value);\n    hourlyData[hourStart].count++;\n  });\n  buyData = Object.keys(hourlyData).map(h => ({\n    start: new Date(parseInt(h)).toISOString(),\n    value: hourlyData[h].values.reduce((a, b) => a + b, 0) / hourlyData[h].count\n  }));\n} return buyData.map(item => [new Date(item.start).getTime(), item.value]);\n"
                          },
                          {
                            "entity": "sensor.cew_price_sensor_proxy",
                            "name": "Avg Sell Price",
                            "type": "line",
                            "color": "#DC143C",
                            "curve": "stepline",
                            "stroke_width": 2,
                            "float_precision": 3,
                            "show": {
                              "in_header": true,
                              "legend_value": true
                            },
                            "data_generator": "const priceSensor = hass.states['sensor.cew_price_sensor_proxy']; if (!priceSensor?.attributes?.calculated_sell_tomorrow || !priceSensor.attributes.tomorrow_valid) return [[Date.now(), null]]; if (priceSensor.attributes.buy_equals_sell) return []; const pricingMode = hass.states['select.cew_pricing_window_duration']?.state || '15_minutes'; let sellData = priceSensor.attributes.calculated_sell_tomorrow; if (pricingMode === '1_hour') {\n  const hourlyData = {};\n  sellData.forEach(item => {\n    const hourStart = Math.floor(new Date(item.start).getTime() / 3600000) * 3600000;\n    if (!hourlyData[hourStart]) hourlyData[hourStart] = { values: [], count: 0 };\n    hourlyData[hourStart].values.push(item.value);\n    hourlyData[hourStart].count++;\n  });\n  sellData = Object.keys(hourlyData).map(h => ({\n    start: new Date(parseInt(h)).toISOString(),\n    value: hourlyData[h].values.reduce((a, b) => a + b, 0) / hourlyData[h].count\n  }));\n} return sellData.map(item => [new Date(item.start).getTime(), item.value]);\n"
                          },
                          {
                            "entity": "select.cew_price_formula",
                            "name": "Price Formula Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "select.cew_pricing_window_duration",
                            "name": "Mode Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "number.cew_vat",
                            "name": "VAT Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "number.cew_tax",
                            "name": "Tax Trigger",
                            "show": {
                              "in_chart": false
                            }
                          },
                          {
                            "entity": "number.cew_additional_cost",
                            "name": "Additional Cost Trigger",
                            "show": {
                              "in_chart": false
                            }
                          }
                        ],
                        "card_mod": {
                          "style": "ha-card { border-radius: 0; margin-top: -8px; border: 0; clip-path: inset(0 0 3px 0);}\n"
                        }
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Spread",
                            "secondary": "{% set spread = state_attr('sensor.cew_tomorrow', 'spread_avg') %} {% if spread is not none %}{{ spread | round(1) }}%{% else %}--{% endif %}",
                            "icon": "mdi:chart-line-variant",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set spread = state_attr('sensor.cew_tomorrow', 'spread_avg') %} {% if spread is none %}grey{% elif spread >= 20 %}green{% elif spread >= 10 %}orange{% else %}red{% endif %}",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: -8px;\noverflow: visible;\nmargin-top: -8px;\nmargin-bottom: 30px;\nborder-radius: 0;\nborder: 0;\n#border-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Arbitrage",
                            "secondary": "{% set arb = state_attr('sensor.cew_tomorrow', 'arbitrage_avg') %} {% if arb is not none %}{{ arb | round(1) }}%{% else %}--{% endif %}",
                            "icon": "mdi:battery-sync",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set arb = state_attr('sensor.cew_tomorrow', 'arbitrage_avg') %} {% if arb is none %}grey{% elif arb >= 10 %}green{% elif arb >= 0 %}orange{% else %}red{% endif %}",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-left: -12px;\noverflow: visible;\nmargin-top: -8px;\nmargin-bottom: 30px;\nborder-radius: 0;\nborder: 0;\n#border-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Charge",
                            "secondary": "{% set total = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length %}0/{{ total }}",
                            "icon": "mdi:battery-charging",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% if state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length > 0 %}green\n{% else %}grey\n{% endif %}\n",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card { margin-left: -12px; margin-right: 0px; margin-top: -8px; border-radius: 0; border: 0; #border-right: 1px solid rgba(255,255,255,0.1) }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Discharge",
                            "secondary": "{% set total = state_attr('sensor.cew_tomorrow', 'actual_discharge_times') | default([], true) | length %}0/{{ total }}",
                            "icon": "mdi:battery-minus",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set count = state_attr('sensor.cew_tomorrow', 'actual_discharge_times') | default([], true) | length %}\n{% if count > 0 %}orange\n{% else %}grey\n{% endif %}\n",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card { margin-left: -18px; margin-right: 6px; margin-top: -8px; border-radius: 0;  border: 0; #border-right: 1px solid rgba(255,255,255,0.1) }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Criteria",
                            "secondary": "{% set actual_charge = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length %} {% set max_charge = states('number.cew_charging_windows_tomorrow') | int(states('number.cew_charging_windows') | int(6)) %} {% set actual_discharge = state_attr('sensor.cew_tomorrow', 'actual_discharge_times') | default([], true) | length %} {% set max_discharge = states('number.cew_expensive_windows_tomorrow') | int(states('number.cew_expensive_windows') | int(3)) %} C:{{ actual_charge }}/{{ max_charge }}{{ '\\n' }}D:{{ actual_discharge }}/{{ max_discharge }}",
                            "multiline_secondary": true,
                            "icon": "{% set actual_charge = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length %} {% set max_charge = states('number.cew_charging_windows_tomorrow') | int(states('number.cew_charging_windows') | int(6)) %} {% set actual_discharge = state_attr('sensor.cew_tomorrow', 'actual_discharge_times') | default([], true) | length %} {% set max_discharge = states('number.cew_expensive_windows_tomorrow') | int(states('number.cew_expensive_windows') | int(3)) %} {% if actual_charge >= max_charge and actual_discharge >= max_discharge %}mdi:check-circle {% elif actual_charge == 0 and actual_discharge == 0 %}mdi:close-circle {% else %}mdi:alert{% endif %}",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set actual_charge = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length %} {% set max_charge = states('number.cew_charging_windows_tomorrow') | int(states('number.cew_charging_windows') | int(6)) %} {% set actual_discharge = state_attr('sensor.cew_tomorrow', 'actual_discharge_times') | default([], true) | length %} {% set max_discharge = states('number.cew_expensive_windows_tomorrow') | int(states('number.cew_expensive_windows') | int(3)) %} {% if actual_charge >= max_charge and actual_discharge >= max_discharge %}green {% elif actual_charge == 0 and actual_discharge == 0 %}red {% else %}amber{% endif %}",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card { margin-left: -20px; margin-right: -6px; margin-top: -8px; border-radius: 0; border: 0; }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Cost",
                            "secondary": "{% set planned = state_attr('sensor.cew_tomorrow', 'planned_total_cost') | float(0) %} {{ '€' + ('%.2f' | format(planned)) }}",
                            "icon": "mdi:currency-eur",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set total_cost = state_attr('sensor.cew_tomorrow', 'planned_total_cost') | float(0) %}\n{% if total_cost < 0 %}green\n{% elif total_cost > 0 %}red\n{% else %}grey\n{% endif %}\n",
                            "vertical": true,
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-left: -24px;\nmargin-top: -8px;\nborder-radius: 0;\nborder: 0; }\n"
                            }
                          }
                        ]
                      },
                      {
                        "type": "entities",
                        "entities": [
                          {
                            "type": "custom:fold-entity-row",
                            "head": {
                              "type": "section",
                              "label": "⛅ Tomorrow's Settings (Optional)"
                            },
                            "padding": 0,
                            "entities": [
                              {
                                "type": "custom:mushroom-template-card",
                                "primary": "Auto-applies at midnight (00:00)",
                                "secondary": "When OFF: Tomorrow uses today's settings. When ON: Tomorrow uses settings below. Auto-disables after midnight.",
                                "icon": "mdi:information-outline",
                                "icon_color": "amber",
                                "multiline_secondary": true,
                                "tap_action": {
                                  "action": "none"
                                },
                                "card_mod": {
                                  "style": "ha-card {\n      background: rgba(var(--rgb-primary-color), 0.1);\n      box-shadow: none;  \n      }\n"
                                }
                              },
                              {
                                "entity": "switch.cew_tomorrow_settings_enabled",
                                "name": "Enable Tomorrow's Custom Settings",
                                "icon": "mdi:calendar-clock"
                              },
                              {
                                "type": "divider"
                              },
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "🪟 Window Selection"
                                },
                                "padding": 5,
                                "entities": [
                                  {
                                    "entity": "number.cew_charging_windows_tomorrow",
                                    "name": "Charging Windows (max)"
                                  },
                                  {
                                    "entity": "number.cew_expensive_windows_tomorrow",
                                    "name": "Discharge Windows (max)"
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Percentile Threshold",
                                    "secondary": "Filters candidate windows by price percentile. Example at 25%: Charge considers only the cheapest 25% of prices. Discharge considers only the most expensive 25% of prices.",
                                    "icon": "mdi:information-outline",
                                    "icon_color": "amber",
                                    "multiline_secondary": true,
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n      background: rgba(var(--rgb-primary-color), 0.1);\n      box-shadow: none;\n      }\n"
                                    }
                                  },
                                  {
                                    "entity": "number.cew_percentile_threshold_tomorrow",
                                    "name": "Percentile Threshold"
                                  }
                                ]
                              },
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "📊 Profit Settings"
                                },
                                "padding": 5,
                                "entities": [
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Profit = Spread - RTE Loss",
                                    "secondary": "Example: 25% spread - 15% RTE loss = 10% profit. Windows qualify if profit exceeds threshold. Min Buy Price Diff only applies to charging windows.",
                                    "icon": "mdi:information-outline",
                                    "icon_color": "amber",
                                    "multiline_secondary": true,
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n      background: rgba(var(--rgb-primary-color), 0.1);\n      box-shadow: none;\n      }\n"
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Actual Margins Tomorrow",
                                    "secondary": "{% set buy = state_attr('sensor.cew_tomorrow', 'spread_avg') | float(0) %} {% set sell = state_attr('sensor.cew_tomorrow', 'arbitrage_avg') | float(0) %} {% if buy > 0 or sell > 0 %} {% set rte = states('number.cew_battery_rte') | float(85) %} {% set rte_loss = 100 - rte %} Buy: {{ (buy - rte_loss) | round(1) }}% | Sell: {{ (sell - rte_loss) | round(1) }}% (RTE loss: {{ rte_loss | round(0) }}%) {% else %} Margins will appear when tomorrow's prices are available {% endif %}",
                                    "icon": "mdi:chart-box-outline",
                                    "icon_color": "green",
                                    "multiline_secondary": true,
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n      background: rgba(var(--rgb-success-color), 0.1);\n      box-shadow: none;\n      }\n"
                                    }
                                  },
                                  {
                                    "entity": "number.cew_min_profit_charge_tomorrow",
                                    "name": "Min Profit % (Charge)"
                                  },
                                  {
                                    "entity": "number.cew_min_profit_discharge_tomorrow",
                                    "name": "Min Profit % (Discharge)"
                                  },
                                  {
                                    "entity": "number.cew_min_profit_discharge_aggressive_tomorrow",
                                    "name": "Min Profit % (Aggressive)"
                                  },
                                  {
                                    "entity": "switch.cew_min_buy_price_diff_enabled_tomorrow",
                                    "name": "Enable Min Buy Price Diff"
                                  },
                                  {
                                    "entity": "number.cew_min_price_difference_tomorrow",
                                    "name": "Min Buy Price Difference"
                                  }
                                ]
                              },
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "💰 Price Override (Always Charge Below)"
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
                                  "label": "⏰ Time Override (Force Action During Period)"
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
                                  "label": "🪟 Calculation Window (Restrict Price Analysis)"
                                },
                                "padding": 5,
                                "entities": [
                                  {
                                    "entity": "switch.cew_calculation_window_enabled_tomorrow",
                                    "name": "Enable Calculation Window"
                                  },
                                  {
                                    "entity": "time.cew_calculation_window_start_tomorrow",
                                    "name": "Window Start Time"
                                  },
                                  {
                                    "entity": "time.cew_calculation_window_end_tomorrow",
                                    "name": "Window End Time"
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        "card_mod": {
                          "style": "ha-card {\nborder-radius: 12px 12px 12px 12px;\nmargin-top: -38px;\nmargin-bottom: 25px;\nclip-path: inset(25px 0 0 0);\nborder: 0;\n}\n"
                        }
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Charge",
                            "secondary": "{% set times = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) %} {{ times | length }} windows",
                            "icon": "mdi:lightning-bolt",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "green",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {     margin-top: -30px;     margin-right: -20px;     border-radius: 12px 0 0 0;     border: 0; border-right: 1px solid rgba(255,255,255,0.1); #border-bottom: 1px solid rgba(255,255,255,0.1)    }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Cost",
                            "secondary": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_tomorrow') | default([], true) %} {% if all_prices | length == 0 %}--{% else %}{% set prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set effective_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set total_cost = (prices | sum) * window_duration * effective_power if prices else 0 %} €{{ '%.2f' | format(total_cost) }}{% endif %}",
                            "icon": "mdi:cash-minus",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "red",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {    margin-top: -30px;    margin-right: -4px;    margin-left: 12px; border-radius: 0 0 0 0; border: 0;    border-right: 1px solid rgba(255,255,255,0.1);   #border-bottom: 1px solid rgba(255,255,255,0.1)    }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Spread",
                            "secondary": "{% set charge_prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set ref_price = state_attr('sensor.cew_tomorrow', 'percentile_expensive_avg') | float(0) %} {% if charge_prices | length == 0 %}0.0%{% else %} {% set avg_charge = (charge_prices | sum / charge_prices | length) %} {% set spread = ((ref_price - avg_charge) / avg_charge * 100) if avg_charge > 0 else 0 %} {{ spread | round(1) }}%{% endif %}",
                            "icon": "mdi:arrow-expand-vertical",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set charge_prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set ref_price = state_attr('sensor.cew_tomorrow', 'percentile_expensive_avg') | float(0) %} {% if charge_prices | length == 0 %}red{% else %} {% set avg_charge = (charge_prices | sum / charge_prices | length) %} {% set spread = ((ref_price - avg_charge) / avg_charge * 100) if avg_charge > 0 else 0 %} {% if spread >= 20 %}green{% elif spread >= 10 %}orange{% else %}red{% endif %}{% endif %}",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {    margin-top: -30px;    margin-right: 0px; margin-left: -4px; border-radius: 0 0 0 0; border: 0; border-right: 1px solid rgba(255,255,255,0.1); #border-bottom: 1px solid rgba(255,255,255,0.1)    }\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Net",
                            "secondary": "{% set net_charge = state_attr('sensor.cew_tomorrow', 'net_planned_charge_kwh') | float(0) %} {{ net_charge | round(1) }} kWh",
                            "icon": "mdi:battery-charging",
                            "color": "green",
                            "tap_action": {
                              "action": "none"
                            },
                            "card_mod": {
                              "style": "ha-card {    margin-top: -30px;    margin-bottom: 30px; margin-right: 0px;    margin-left: -8px; border-radius: 0 12px 0 0;    border: 0;   #border-bottom: 1px solid rgba(255,255,255,0.1)   }\n"
                            }
                          }
                        ]
                      },
                      {
                        "type": "markdown",
                        "content": "{% set groups = state_attr('sensor.cew_tomorrow', 'grouped_charge_windows') | default([]) %} {% set cpk = state_attr('sensor.cew_tomorrow', 'charge_power_kw') | float(0) %} {% set buk = state_attr('sensor.cew_tomorrow', 'base_usage_kw') | float(0) %} {% set cs = states('select.cew_base_usage_charge_strategy') %} {% set wd = state_attr('sensor.cew_tomorrow', 'window_duration_hours') | float(0.25) %} {% set epk = (cpk - buk) if cs == 'battery_covers_base' else cpk %} {% if groups | length > 0 %} {% for g in groups %}<b>Time:</b>{{ g.start_time }}-{{ g.end_time }} - <b>Avg:</b>€{{ '%.3f' | format(g.avg_price) }} - <b>Sprd:</b>{{ g.spread_pct }}% - <b>Cost:</b>€{{ '%.2f' | format((g.prices | sum) * wd * cpk) }} - <b>kWh:</b>{{ (epk * wd * g.num_windows) | round(1) }}<br>{% endfor %} {% else %}*No charge windows scheduled*{% endif %}",
                        "card_mod": {
                          "style": "ha-card {\n  padding: 0 16px;\n  margin-top: -38px;\n  margin-bottom: 38px;\n  #margin-left: -10px;\n  #margin-right: -10px;\n  border-radius: 0;\n  border: 0;\n  min-height: 125px;\n  max-height: 125px;\n  overflow-y: auto;      \n  clip-path: inset(0 0 3px 0); \n}\n"
                        }
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Discharge",
                            "secondary": "{% set times = state_attr('sensor.cew_tomorrow', 'actual_discharge_times') | default([], true) %} {{ times | length }} windows",
                            "icon": "mdi:battery-arrow-down",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "orange",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: -20px;\nmargin-top: -46px;\nmargin-bottom: 16px;\nborder-radius: 0;\nborder: 0;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\nborder-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Rev.",
                            "secondary": "{% set prices = state_attr('sensor.cew_tomorrow', 'actual_discharge_sell_prices') or [] %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %} {% set total_revenue = (prices | sum) * window_duration * discharge_power_kw if prices else 0 %} €{{ '%.2f' | format(total_revenue) }}",
                            "icon": "mdi:cash-plus",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "green",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: -4px;\nmargin-left: 12px;\nmargin-top: -46px;\nmargin-bottom: 16px;\nborder-radius: 0;\nborder: 0;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\nborder-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Arbitrage",
                            "secondary": "{% set charge_prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set discharge_prices = state_attr('sensor.cew_tomorrow', 'actual_discharge_sell_prices') | default([], true) %} {% if discharge_prices | length == 0 %}0.0%{% else %} {% set ref_price = (charge_prices | sum / charge_prices | length) if charge_prices | length > 0 else state_attr('sensor.cew_tomorrow', 'percentile_cheap_avg') | float(0) %} {% set avg_discharge = (discharge_prices | sum / discharge_prices | length) %} {% set arb = ((avg_discharge - ref_price) / ref_price * 100) if ref_price > 0 else 0 %} {{ arb | round(1) }}%{% endif %}",
                            "icon": "mdi:arrow-expand-vertical",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "{% set charge_prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set discharge_prices = state_attr('sensor.cew_tomorrow', 'actual_discharge_sell_prices') | default([], true) %} {% if discharge_prices | length == 0 %}red{% else %} {% set ref_price = (charge_prices | sum / charge_prices | length) if charge_prices | length > 0 else state_attr('sensor.cew_tomorrow', 'percentile_cheap_avg') | float(0) %} {% set avg_discharge = (discharge_prices | sum / discharge_prices | length) %} {% set arb = ((avg_discharge - ref_price) / ref_price * 100) if ref_price > 0 else 0 %} {% if arb >= 20 %}green{% elif arb >= 10 %}orange{% else %}red{% endif %}{% endif %}",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: 0px;\nmargin-left: -4px;\nmargin-right: -10px;\nmargin-top: -46px;\nmargin-bottom: 16px;\nborder-radius: 0;\nborder: 0;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\nclip-path: inset(0 0 0 0);\nborder-right: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Net",
                            "secondary": "{% set net_kwh = state_attr('sensor.cew_tomorrow', 'net_planned_discharge_kwh') | float(0) %} {{ net_kwh | round(1) }} kWh",
                            "icon": "mdi:battery-arrow-up-outline",
                            "tap_action": {
                              "action": "none"
                            },
                            "color": "orange",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nmargin-right: 0px;\nmargin-left: -12px;\nmargin-top: -46px;\nmargin-bottom: 46px;\nborder-radius: 0;\nborder: 0;\nclip-path: inset(0 0 0 13.5px);\nborder-lef: 1px solid rgba(255,255,255,0.1);\n\n}\n"
                            }
                          }
                        ],
                        "card_mod": {
                          "style": ":host {\n  margin-top: -8px !important;\n}\n"
                        }
                      },
                      {
                        "type": "markdown",
                        "content": "{% set groups = state_attr('sensor.cew_tomorrow', 'grouped_discharge_windows') | default([]) %} {% set dpk = state_attr('sensor.cew_tomorrow', 'discharge_power_kw') | float(0) %} {% set buk = state_attr('sensor.cew_tomorrow', 'base_usage_kw') | float(0) %} {% set ds = states('select.cew_base_usage_discharge_strategy') %} {% set wd = state_attr('sensor.cew_tomorrow', 'window_duration_hours') | float(0.25) %} {% set epk = (dpk - buk) if ds == 'subtract_base' else dpk %} {% if groups | length > 0 %} {% for g in groups %}<b>Time:</b>{{ g.start_time }}-{{ g.end_time }} - <b>Avg:</b>€{{ '%.3f' | format(g.avg_sell_price) }} - <b>Sprd:</b>{{ g.spread_pct }}% - <b>Rev:</b>€{{ '%.2f' | format((g.sell_prices | sum) * wd * dpk) }} - <b>kWh:</b>{{ (epk * wd * g.num_windows) | round(1) }}<br>{% endfor %} {% else %}*No discharge windows scheduled*{% endif %}",
                        "card_mod": {
                          "style": "ha-card {\n  padding: 0 16px;\n  margin-top: -54px;\n  margin-bottom: 54px;\n  border-radius: 0 0 12px 12px;\n  border: 0;\n  #margin-left: -10px;\n  #margin-right: -10px;\n  #clip-path: inset(0 0 3px 0);      \n  min-height: 125px;\n  max-height: 125px;\n  overflow-y: auto;\n}\n"
                        }
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
                        "title": "⚙️ Configuration & Status"
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-entity-card",
                            "entity": "switch.cew_automation_enabled",
                            "name": "Automation Control",
                            "icon": "mdi:power",
                            "icon_color": "{% if is_state('switch.cew_automation_enabled', 'on') %}green\n{% else %}red\n{% endif %}\n",
                            "secondary_info": "{% if is_state('switch.cew_automation_enabled', 'on') %}Automation Active\n{% else %}⚠️ Automation Disabled\n{% endif %}\n",
                            "tap_action": {
                              "action": "toggle"
                            },
                            "card_mod": {
                              "style": "ha-card {\n  border-radius: 12px 0 0 0;\n  border: 0;\n  margin-right; 36px;\n  clip-path: inset(0 0 4px 0);\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "{% set state = states('sensor.cew_today') %} {% set price_override = state_attr('sensor.cew_today', 'price_override_active') %} {% set automation_enabled = is_state('switch.cew_automation_enabled', 'on') %} {% if state == 'off' and not automation_enabled %}⛔ Disabled {% elif state == 'off' and automation_enabled %}🔌 Battery Off {% elif state == 'charge' and price_override %}💰 Override {% elif state == 'charge' %}🔋 Charging {% elif state == 'discharge_aggressive' %}⚡ Peak Discharge {% elif state == 'discharge' %}🔌 Discharging {% else %}💡 Normal {% endif %}\n",
                            "secondary": "€{{ state_attr('sensor.cew_today', 'current_price') | float(0) | round(3) }}/kWh\n",
                            "icon": "{% set state = states('sensor.cew_today') %} {% set price_override = state_attr('sensor.cew_today', 'price_override_active') %} {% if state == 'off' %}mdi:power-off {% elif state == 'charge' and price_override %}mdi:currency-eur {% elif state == 'charge' %}mdi:battery-charging {% elif state == 'discharge_aggressive' %}mdi:battery-alert {% elif state == 'discharge' %}mdi:battery-minus {% else %}mdi:battery-heart {% endif %}\n",
                            "tap_action": {
                              "action": "none"
                            },
                            "badge_icon": "{% if state_attr('sensor.cew_today', 'price_override_active') %}mdi:alert-circle {% endif %}\n",
                            "badge_color": "{% if state_attr('sensor.cew_today', 'price_override_active') %}lime {% endif %}\n",
                            "color": "{% set state = states('sensor.cew_today') %} {% set price_override = state_attr('sensor.cew_today', 'price_override_active') %} {% if state == 'off' %}grey {% elif state == 'charge' and price_override %}lime {% elif state == 'charge' %}green {% elif state == 'discharge_aggressive' %}red {% elif state == 'discharge' %}orange {% else %}blue {% endif %}\n",
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\n  border-radius: 0 12px 0 0;\n  margin-left: -16px;\n  border: 0;\n  clip-path: inset(0 0 4px 0);\n}\n"
                            }
                          }
                        ]
                      },
                      {
                        "type": "horizontal-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Profit Margin Today",
                            "secondary": "{% set buy_threshold = states('number.cew_min_profit_charge') | float(10) %} {% set sell_threshold = states('number.cew_min_profit_discharge') | float(10) %} {% set rte = states('number.cew_battery_rte') | float(85) %} {% set rte_loss = 100 - rte %} {% set charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set discharge_sell_prices = state_attr('sensor.cew_today', 'actual_discharge_sell_prices') | default([], true) %} {% set charge_elected = charge_prices | length > 0 %} {% set discharge_elected = discharge_sell_prices | length > 0 %} {% set cheap_avg_day = state_attr('sensor.cew_today', 'percentile_cheap_avg') | float(0) %} {% set expensive_avg_day = state_attr('sensor.cew_today', 'percentile_expensive_avg') | float(0) %} {% if charge_elected %} {% set charge_avg = charge_prices | sum / charge_prices | length %} {% set buy_spread = ((expensive_avg_day - charge_avg) / charge_avg * 100) if charge_avg > 0 else 0 %} {% else %} {% set buy_spread = ((expensive_avg_day - cheap_avg_day) / cheap_avg_day * 100) if cheap_avg_day > 0 else 0 %} {% endif %} {% set buy_profit = buy_spread - rte_loss %} {% set charge_ref = (charge_prices | sum / charge_prices | length) if charge_elected else cheap_avg_day %} {% if discharge_elected %} {% set sell_avg = discharge_sell_prices | sum / discharge_sell_prices | length %} {% set sell_spread = ((sell_avg - charge_ref) / charge_ref * 100) if charge_ref > 0 else 0 %} {% else %} {% set sell_spread = ((expensive_avg_day - charge_ref) / charge_ref * 100) if charge_ref > 0 else 0 %} {% endif %} {% set sell_profit = sell_spread - rte_loss %} Buy: {{ buy_threshold | round(0) }}% Actual: {{ buy_profit | round(1) }}% {% if buy_profit >= buy_threshold %}✅{% else %}❌{% endif %}\nSell: {{ sell_threshold | round(0) }}% Actual: {{ sell_profit | round(1) }}% {% if sell_profit >= sell_threshold %}✅{% else %}❌{% endif %}\n",
                            "multiline_secondary": true,
                            "tap_action": {
                              "action": "none"
                            },
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid rgba(255,255,255,0.1);\n  min-height: 80px;\n  transform: translateY(-12px);\n}\nmushroom-shape-icon {\n  display: none !important;\n}\n"
                            }
                          },
                          {
                            "type": "custom:mushroom-template-card",
                            "primary": "Profit Margin Tomorrow",
                            "secondary": "{% set buy_threshold = states('number.cew_min_profit_charge') | float(10) %} {% set sell_threshold = states('number.cew_min_profit_discharge') | float(10) %} {% set rte = states('number.cew_battery_rte') | float(85) %} {% set rte_loss = 100 - rte %} {% set charge_prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set discharge_sell_prices = state_attr('sensor.cew_tomorrow', 'actual_discharge_sell_prices') | default([], true) %} {% set charge_elected = charge_prices | length > 0 %} {% set discharge_elected = discharge_sell_prices | length > 0 %} {% set cheap_avg_day = state_attr('sensor.cew_tomorrow', 'percentile_cheap_avg') | float(0) %} {% set expensive_avg_day = state_attr('sensor.cew_tomorrow', 'percentile_expensive_avg') | float(0) %} {% set has_data = cheap_avg_day > 0 or expensive_avg_day > 0 %} {% if charge_elected %} {% set charge_avg = charge_prices | sum / charge_prices | length %} {% set buy_spread = ((expensive_avg_day - charge_avg) / charge_avg * 100) if charge_avg > 0 else 0 %} {% else %} {% set buy_spread = ((expensive_avg_day - cheap_avg_day) / cheap_avg_day * 100) if cheap_avg_day > 0 else 0 %} {% endif %} {% set buy_profit = buy_spread - rte_loss %} {% set charge_ref = (charge_prices | sum / charge_prices | length) if charge_elected else cheap_avg_day %} {% if discharge_elected %} {% set sell_avg = discharge_sell_prices | sum / discharge_sell_prices | length %} {% set sell_spread = ((sell_avg - charge_ref) / charge_ref * 100) if charge_ref > 0 else 0 %} {% else %} {% set sell_spread = ((expensive_avg_day - charge_ref) / charge_ref * 100) if charge_ref > 0 else 0 %} {% endif %} {% set sell_profit = sell_spread - rte_loss %} {% if has_data %} Buy: {{ buy_threshold | round(0) }}% Actual: {{ buy_profit | round(1) }}% {% if buy_profit >= buy_threshold %}✅{% else %}❌{% endif %}\nSell: {{ sell_threshold | round(0) }}% Actual: {{ sell_profit | round(1) }}% {% if sell_profit >= sell_threshold %}✅{% else %}❌{% endif %} {% else %}--{% endif %}\n",
                            "multiline_secondary": true,
                            "tap_action": {
                              "action": "none"
                            },
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\n  border-radius: 0;\n  border: 0;\n  margin-left: -16px;\n  transform: translateY(-12px);\n  \n  border-bottom: 1px solid rgba(255,255,255,0.1);\n  min-height: 80px;\n  #margin-top: -12px;\n}\nmushroom-shape-icon {\n  display: none !important;\n}\n"
                            }
                          }
                        ]
                      },
                      {
                        "type": "entities",
                        "entities": [
                          {
                            "type": "custom:fold-entity-row",
                            "head": {
                              "type": "section",
                              "label": "⚙️ Settings"
                            },
                            "padding": 0,
                            "entities": [
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "💶 Price Calculation Settings"
                                },
                                "padding": 0,
                                "entities": [
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Price Sensor Configuration",
                                    "secondary": "Specify your energy price sensor and window duration",
                                    "icon": "mdi:flash",
                                    "icon_color": "amber",
                                    "multiline_secondary": true,
                                    "card_mod": {
                                      "style": "ha-card {\n  background: rgba(var(--rgb-primary-color), 0.1);\n  box-shadow: none;\n  margin: 8px 0;\n}\n"
                                    }
                                  },
                                  {
                                    "entity": "text.cew_price_sensor_entity",
                                    "name": "Price Sensor Entity ID",
                                    "icon": "mdi:flash"
                                  },
                                  {
                                    "entity": "select.cew_pricing_window_duration",
                                    "name": "Pricing Window Duration",
                                    "icon": "mdi:timer-outline"
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Price Formula Settings",
                                    "secondary": "Configure how buy and sell prices are calculated",
                                    "icon": "mdi:cash",
                                    "icon_color": "blue",
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n  background: rgba(var(--rgb-primary-color), 0.1);\n  box-shadow: none;\n  margin-top: 8px;\n  }              \n"
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Missing your country?",
                                    "secondary": "Request via GitHub Issues. Include pricing formula, parameters, and a reliable source.",
                                    "icon": "mdi:help-circle-outline",
                                    "icon_color": "grey",
                                    "multiline_secondary": true,
                                    "tap_action": {
                                      "action": "url",
                                      "url_path": "https://github.com/cheapest-energy-windows/cheapest_energy_windows/issues"
                                    },
                                    "card_mod": {
                                      "style": "ha-card { background: transparent !important; box-shadow: none !important; }\n"
                                    }
                                  },
                                  {
                                    "entity": "select.cew_price_formula",
                                    "name": "Price Formula",
                                    "icon": "mdi:earth"
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "{{ state_attr('sensor.cew_price_sensor_proxy', 'buy_formula_description') | default('Buy: loading...') }} | {{ state_attr('sensor.cew_price_sensor_proxy', 'sell_formula_description') | default('Sell: loading...') }}",
                                    "icon": "mdi:function",
                                    "icon_color": "grey",
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card { background: transparent !important; box-shadow: none !important; }\n"
                                    }
                                  },
                                  {
                                    "type": "conditional",
                                    "conditions": [
                                      {
                                        "entity": "number.cew_vat",
                                        "state_not": "unavailable"
                                      }
                                    ],
                                    "row": {
                                      "entity": "number.cew_vat",
                                      "name": "VAT Rate % (eg. 21%)",
                                      "icon": "mdi:percent"
                                    }
                                  },
                                  {
                                    "type": "conditional",
                                    "conditions": [
                                      {
                                        "entity": "number.cew_tax",
                                        "state_not": "unavailable"
                                      }
                                    ],
                                    "row": {
                                      "entity": "number.cew_tax",
                                      "name": "Energy Tax (EUR/kWh)",
                                      "icon": "mdi:cash-plus"
                                    }
                                  },
                                  {
                                    "type": "conditional",
                                    "conditions": [
                                      {
                                        "entity": "number.cew_additional_cost",
                                        "state_not": "unavailable"
                                      }
                                    ],
                                    "row": {
                                      "entity": "number.cew_additional_cost",
                                      "name": "Additional Cost (EUR/kWh)",
                                      "icon": "mdi:cash-plus"
                                    }
                                  },
                                  {
                                    "type": "conditional",
                                    "conditions": [
                                      {
                                        "entity": "number.cew_buy_formula_param_b",
                                        "state_not": "unavailable"
                                      }
                                    ],
                                    "row": {
                                      "entity": "number.cew_buy_formula_param_b",
                                      "name": "Multiplier (B)",
                                      "icon": "mdi:alpha-b-circle"
                                    }
                                  },
                                  {
                                    "type": "conditional",
                                    "conditions": [
                                      {
                                        "entity": "number.cew_buy_formula_param_a",
                                        "state_not": "unavailable"
                                      }
                                    ],
                                    "row": {
                                      "entity": "number.cew_buy_formula_param_a",
                                      "name": "Cost (A) EUR/kWh",
                                      "icon": "mdi:alpha-a-circle"
                                    }
                                  },
                                  {
                                    "type": "conditional",
                                    "conditions": [
                                      {
                                        "entity": "number.cew_sell_formula_param_b",
                                        "state_not": "unavailable"
                                      }
                                    ],
                                    "row": {
                                      "entity": "number.cew_sell_formula_param_b",
                                      "name": "Sell Multiplier (B)",
                                      "icon": "mdi:alpha-b-circle"
                                    }
                                  },
                                  {
                                    "type": "conditional",
                                    "conditions": [
                                      {
                                        "entity": "number.cew_sell_formula_param_a",
                                        "state_not": "unavailable"
                                      }
                                    ],
                                    "row": {
                                      "entity": "number.cew_sell_formula_param_a",
                                      "name": "Sell Cost (A) EUR/kWh",
                                      "icon": "mdi:alpha-a-circle"
                                    }
                                  },
                                  {
                                    "entity": "switch.cew_use_minimum_sell_price",
                                    "name": "Enable Minimum Sell Price",
                                    "icon": "mdi:cash-check"
                                  },
                                  {
                                    "entity": "number.cew_minimum_sell_price",
                                    "name": "Minimum Sell Price",
                                    "icon": "mdi:cash-lock"
                                  },
                                  {
                                    "entity": "switch.cew_min_sell_price_bypasses_spread",
                                    "name": "Bypass Profit Check When Min Price Met",
                                    "icon": "mdi:skip-forward"
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Battery & System Settings",
                                    "secondary": "Configure battery charging/discharging power and round-trip efficiency",
                                    "icon": "mdi:battery-charging",
                                    "multiline_secondary": true,
                                    "card_mod": {
                                      "style": "ha-card {\n  background: rgba(var(--rgb-primary-color), 0.1);\n  box-shadow: none;\n  margin: 8px 0;\n}\n"
                                    }
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
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Base Usage Feature",
                                    "secondary": "Track constant household power consumption (appliances, lights, HVAC, etc.)",
                                    "icon": "mdi:information-outline",
                                    "icon_color": "grey",
                                    "multiline_secondary": true,
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n  background: rgba(var(--rgb-primary-color), 0.1);\n  box-shadow: none;\n  margin-top: 8px;\n  }               \n"
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "How to Configure",
                                    "secondary": "Set wattage below, then choose strategy for each battery state",
                                    "icon": "mdi:cog-outline",
                                    "icon_color": "blue",
                                    "tap_action": {
                                      "action": "none"
                                    }
                                  },
                                  {
                                    "entity": "number.cew_base_usage",
                                    "name": "Base Usage",
                                    "icon": "mdi:home-lightning-bolt"
                                  },
                                  {
                                    "entity": "select.cew_base_usage_charge_strategy",
                                    "name": "  ↳ During Charging"
                                  },
                                  {
                                    "entity": "select.cew_base_usage_idle_strategy",
                                    "name": "  ↳ During Idle"
                                  },
                                  {
                                    "entity": "select.cew_base_usage_discharge_strategy",
                                    "name": "  ↳ During Discharge"
                                  },
                                  {
                                    "entity": "select.cew_base_usage_aggressive_strategy",
                                    "name": "  ↳ During Aggressive Discharge"
                                  }
                                ]
                              },
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "🔔 Notification Settings"
                                },
                                "padding": 0,
                                "entities": [
                                  {
                                    "entity": "switch.cew_notifications_enabled",
                                    "name": "Enable Notifications",
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
                                    "entity": "switch.cew_notify_off",
                                    "name": "Notify on Battery Off",
                                    "icon": "mdi:battery-off"
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
                                  },
                                  {
                                    "type": "section",
                                    "label": "Other Notifications"
                                  },
                                  {
                                    "entity": "switch.cew_midnight_rotation_notifications",
                                    "name": "Notify on Midnight Settings Rotation",
                                    "icon": "mdi:bell-ring"
                                  }
                                ]
                              },
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "🔋 Battery System Settings"
                                },
                                "padding": 0,
                                "entities": [
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Configure Battery System Sensors",
                                    "secondary": "Paste entity IDs from Developer Tools → States",
                                    "icon": "mdi:information-outline",
                                    "icon_color": "grey",
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n  background: rgba(var(--rgb-primary-color), 0.1);\n  box-shadow: none;\n  margin-top: 8px;\n  }                \n"
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Example",
                                    "secondary": "sensor.battery_soc, sensor.battery_available_energy",
                                    "icon": "mdi:lightbulb-outline",
                                    "icon_color": "amber",
                                    "tap_action": {
                                      "action": "none"
                                    }
                                  },
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
                                  "label": "⚙️ Battery Operations Settings"
                                },
                                "padding": 0,
                                "entities": [
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Link Automations to Battery Modes",
                                    "secondary": "Select automations/scripts to trigger for each mode",
                                    "icon": "mdi:robot",
                                    "icon_color": "blue",
                                    "tap_action": {
                                      "action": "none"
                                    },
                                    "card_mod": {
                                      "style": "ha-card {\n  background: rgba(var(--rgb-primary-color), 0.1);\n  box-shadow: none;\n  margin-top: 8px;\n  }                \n"
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Example",
                                    "secondary": "automation.battery_charge, script.battery_manual_mode",
                                    "icon": "mdi:lightbulb-outline",
                                    "icon_color": "amber",
                                    "tap_action": {
                                      "action": "none"
                                    }
                                  },
                                  {
                                    "entity": "text.cew_battery_idle_action",
                                    "name": "Idle Mode Action",
                                    "icon": "mdi:sleep"
                                  },
                                  {
                                    "entity": "text.cew_battery_charge_action",
                                    "name": "Charge Mode Action",
                                    "icon": "mdi:battery-charging"
                                  },
                                  {
                                    "entity": "text.cew_battery_discharge_action",
                                    "name": "Discharge Mode Action",
                                    "icon": "mdi:battery-minus"
                                  },
                                  {
                                    "entity": "text.cew_battery_aggressive_discharge_action",
                                    "name": "Aggressive Discharge Mode Action",
                                    "icon": "mdi:battery-alert"
                                  },
                                  {
                                    "entity": "text.cew_battery_off_action",
                                    "name": "Off Mode Action",
                                    "icon": "mdi:power-off"
                                  }
                                ]
                              },
                              {
                                "type": "custom:fold-entity-row",
                                "head": {
                                  "type": "section",
                                  "label": "🎮 Battery Operations Triggers"
                                },
                                "padding": 0,
                                "entities": [
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Test Battery Modes",
                                    "secondary": "Manually trigger configured automations",
                                    "icon": "mdi:robot",
                                    "icon_color": "blue",
                                    "tap_action": {
                                      "action": "none"
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Trigger Idle",
                                    "secondary": "{{ states('text.cew_battery_idle_action') }}",
                                    "icon": "mdi:sleep",
                                    "icon_color": "grey",
                                    "tap_action": {
                                      "action": "call-service",
                                      "service": "cheapest_energy_windows.trigger_battery_action",
                                      "service_data": {
                                        "mode": "idle"
                                      },
                                      "confirmation": {
                                        "text": "Trigger idle mode action?"
                                      }
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Trigger Charge",
                                    "secondary": "{{ states('text.cew_battery_charge_action') }}",
                                    "icon": "mdi:battery-charging",
                                    "icon_color": "green",
                                    "tap_action": {
                                      "action": "call-service",
                                      "service": "cheapest_energy_windows.trigger_battery_action",
                                      "service_data": {
                                        "mode": "charge"
                                      },
                                      "confirmation": {
                                        "text": "Trigger charge mode action?"
                                      }
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Trigger Discharge",
                                    "secondary": "{{ states('text.cew_battery_discharge_action') }}",
                                    "icon": "mdi:battery-minus",
                                    "icon_color": "orange",
                                    "tap_action": {
                                      "action": "call-service",
                                      "service": "cheapest_energy_windows.trigger_battery_action",
                                      "service_data": {
                                        "mode": "discharge"
                                      },
                                      "confirmation": {
                                        "text": "Trigger discharge mode action?"
                                      }
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Trigger Aggressive Discharge",
                                    "secondary": "{{ states('text.cew_battery_aggressive_discharge_action') }}",
                                    "icon": "mdi:battery-alert",
                                    "icon_color": "red",
                                    "tap_action": {
                                      "action": "call-service",
                                      "service": "cheapest_energy_windows.trigger_battery_action",
                                      "service_data": {
                                        "mode": "aggressive_discharge"
                                      },
                                      "confirmation": {
                                        "text": "Trigger aggressive discharge mode action?"
                                      }
                                    }
                                  },
                                  {
                                    "type": "custom:mushroom-template-card",
                                    "primary": "Trigger Off",
                                    "secondary": "{{ states('text.cew_battery_off_action') }}",
                                    "icon": "mdi:power-off",
                                    "icon_color": "blue",
                                    "tap_action": {
                                      "action": "call-service",
                                      "service": "cheapest_energy_windows.trigger_battery_action",
                                      "service_data": {
                                        "mode": "off"
                                      },
                                      "confirmation": {
                                        "text": "Trigger off mode action?"
                                      }
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        "card_mod": {
                          "style": "ha-card {\n  border-radius: 0;\n  margin-top: 25px;\n  #margin-bottom: 26px;\n  transform: translateY(-66px);\n  border: 0;\n  clip-path: inset(20px 0 0 0);\n  border-bottom: 1px solid rgba(255,255,255,0.1);\n}\n"
                        }
                      },
                      {
                        "type": "entities",
                        "entities": [
                          {
                            "type": "custom:fold-entity-row",
                            "head": {
                              "type": "custom:mushroom-template-card",
                              "primary": "{{ states('text.cew_battery_system_name') }}",
                              "secondary": "Battery System",
                              "icon": "mdi:battery-heart",
                              "icon_color": "blue",
                              "layout": "horizontal",
                              "tap_action": {
                                "action": "none"
                              },
                              "card_mod": {
                                "style": "ha-card {\nborder: 0;\n} \n"
                              }
                            },
                            "padding": 0,
                            "entities": [
                              {
                                "type": "custom:mushroom-template-card",
                                "primary": "State of Charge",
                                "secondary": "{% set soc_sensor = states('text.cew_battery_soc_sensor') %}\n{{ states(soc_sensor) | float(0) | round(2) }} %\n",
                                "entity": "{{ states('text.cew_battery_soc_sensor') }}",
                                "icon": "mdi:battery-50",
                                "color": "green",
                                "tap_action": {
                                  "action": "none"
                                },
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 12px 12px 0 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\n}           \n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "primary": "Available Energy",
                                "secondary": "{% set energy_sensor = states('text.cew_battery_available_energy_sensor') %}\n{{ states(energy_sensor) | float(0) | round(2) }} kWh\n",
                                "entity": "{{ states('text.cew_battery_available_energy_sensor') }}",
                                "icon": "mdi:battery-check",
                                "color": "lime",
                                "tap_action": {
                                  "action": "none"
                                },
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\n}           \n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "primary": "Daily Charge",
                                "secondary": "{% set charge_sensor = states('text.cew_battery_daily_charge_sensor') %}\n{{ states(charge_sensor) | float(0) | round(2) }} kWh\n",
                                "entity": "{{ states('text.cew_battery_daily_charge_sensor') }}",
                                "icon": "mdi:lightning-bolt",
                                "color": "green",
                                "tap_action": {
                                  "action": "none"
                                },
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\n}           \n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "primary": "Daily Discharge",
                                "secondary": "{% set discharge_sensor = states('text.cew_battery_daily_discharge_sensor') %}\n{{ states(discharge_sensor) | float(0) | round(2) }} kWh\n",
                                "entity": "{{ states('text.cew_battery_daily_discharge_sensor') }}",
                                "icon": "mdi:lightning-bolt-outline",
                                "color": "orange",
                                "tap_action": {
                                  "action": "none"
                                },
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\n}           \n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "primary": "Current Power",
                                "secondary": "{% set power_sensor = states('text.cew_battery_power_sensor') %}\n{{ states(power_sensor) | float(0) | round(2) }} kW\n",
                                "entity": "{{ states('text.cew_battery_power_sensor') }}",
                                "icon": "mdi:lightning-bolt-circle",
                                "color": "cyan",
                                "tap_action": {
                                  "action": "none"
                                },
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0 0 12px 12px;\nborder: 0;\n}           \n"
                                }
                              }
                            ]
                          }
                        ],
                        "card_mod": {
                          "style": "ha-card {\n  border-radius: 0 0 12px 12px;\n  #margin-top: -40px;\n  margin-bottom: -10px;\n  border: 0;\n  #clip-path: inset(15px 0 0 0);\n  transform: translateY(-80px);\n  #border-bottom: 1px solid rgba(255,255,255,0.1);\n  border-top: 1px solid rgba(255,255,255,0.1);\n}\n"
                        }
                      },
                      {
                        "type": "vertical-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "entity": "sensor.cew_today",
                            "primary": "Activity Today - {{ now().strftime('%A, %B %d') }}",
                            "secondary": "{% set base_cost = state_attr('sensor.cew_today', 'base_usage_day_cost') | float(0) %} {% set base_price = state_attr('sensor.cew_today', 'day_avg_price') | float(0) %} {% set actual_cost = state_attr('sensor.cew_today', 'planned_total_cost') | float(0) %} {% set actual_price = state_attr('sensor.cew_today', 'actual_price_kwh') | float(0) %} {% set cost_diff = state_attr('sensor.cew_today', 'cost_difference') | float(0) %} {% set buk = state_attr('sensor.cew_today', 'base_usage_kwh') | float(0) %} {% set ngk = state_attr('sensor.cew_today', 'net_grid_kwh') | float(0) %} {% set ark = state_attr('sensor.cew_today', 'actual_remaining_kwh') | float(0) %} {% set bav = state_attr('sensor.cew_today', 'battery_arbitrage_value') | float(0) %} {% set ts = state_attr('sensor.cew_today', 'true_savings') | float(0) %} {% set guk = state_attr('sensor.cew_today', 'gross_usable_kwh') | float(0) %} {% set gdk = state_attr('sensor.cew_today', 'gross_discharged_kwh') | float(0) %} Base Cost: {{ '€%.2f' | format(base_cost) }}/day ({{ buk | round(1) }} kWh @ €{{ '%.3f' | format(base_price) }}){{ '\\n' }}Actual Cost: {{ '€%.2f' | format(actual_cost) }}/day ({{ ngk | round(1) }} kWh @ €{{ '%.3f' | format(actual_price) }}){{ '\\n' }}──────────────────────{{ '\\n' }}You Pay: {{ '€%.2f' | format(cost_diff) }} {% if cost_diff >= 0 %}less{% else %}more{% endif %}{% if ark > 0 %}{{ '\\n' }}You Get: +{{ ark | round(1) }} kWh buffer ({{ '€%.2f' | format(bav) }}){% elif guk > 0 and gdk >= guk %}{{ '\\n' }}Battery: Fully Discharged{% endif %}{{ '\\n' }}Total Value: {{ '€%.2f' | format(ts) }} savings",
                            "multiline_secondary": true,
                            "icon": "mdi:chart-timeline-variant",
                            "color": "{% set buy_profit = state_attr('sensor.cew_today', 'charge_profit_pct') | float(0) %} {% set sell_profit = state_attr('sensor.cew_today', 'discharge_profit_pct') | float(0) %} {% if buy_profit > 0 and sell_profit > 0 %}green{% elif buy_profit > 0 or sell_profit > 0 %}amber{% else %}grey{% endif %}",
                            "tap_action": {
                              "action": "none"
                            },
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nborder: 0;\nborder-radius: 12px 12px 0 0;\nmin-height: 60px;\nmargin-top: 2px;\ntransform: translateY(-80px);\nborder-bottom: 1px solid rgba(255,255,255,0.1);\n\n}\n"
                            }
                          },
                          {
                            "type": "horizontal-stack",
                            "cards": [
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_today",
                                "primary": "Charge Gross/Net",
                                "secondary": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) | length %} {% set completed = state_attr('sensor.cew_today', 'completed_charge_windows') | int(0) %} {% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set gross_kwh = num_cheap * window_duration * charge_power %} {% set completed_kwh = completed * window_duration * charge_power %} {% set net_kwh = state_attr('sensor.cew_today', 'net_planned_charge_kwh') | float(0) %} Gross: {{ completed_kwh | round(1) }}/{{ gross_kwh | round(1) }} kWh ({{ completed }}/{{ num_cheap }}){{ '\\n' }}Total Net: {{ net_kwh | round(1) }} kWh",
                                "multiline_secondary": true,
                                "icon": "mdi:battery-charging",
                                "color": "green",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\nmin-height: 60px;\nmargin-top: -6px;\n\ntransform: translateY(-80px);\n}\n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_today",
                                "primary": "Discharge Gross/Net",
                                "secondary": "{% set num_expensive = state_attr('sensor.cew_today', 'actual_discharge_times') | default([], true) | length %} {% set completed = state_attr('sensor.cew_today', 'completed_discharge_windows') | int(0) %} {% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set gross_kwh = num_expensive * window_duration * discharge_power %} {% set completed_kwh = completed * window_duration * discharge_power %} {% set net_kwh = state_attr('sensor.cew_today', 'net_planned_discharge_kwh') | float(0) %} Gross: {{ completed_kwh | round(1) }}/{{ gross_kwh | round(1) }} kWh ({{ completed }}/{{ num_expensive }}){{ '\\n' }}Total Net: {{ net_kwh | round(1) }} kWh",
                                "multiline_secondary": true,
                                "icon": "mdi:battery-minus",
                                "color": "orange",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\nmin-height: 60px;\nmargin-top: -6px;\nmargin-left: -16px;\nmargin-bottom: 6px;\ntransform: translateY(-80px);\n}\n"
                                }
                              }
                            ]
                          },
                          {
                            "type": "horizontal-stack",
                            "cards": [
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_today",
                                "primary": "Net Post-Charge kWh",
                                "secondary": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) | length %} {% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(90) / 100 %} {% set rte_pct = states('number.cew_battery_rte') | float(90) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charged_kwh = num_cheap * window_duration * charge_power %} {% set usable_charged_kwh = charged_kwh * rte %} {{ usable_charged_kwh | round(1) }} kWh ({{ rte_pct | round(0) }}% RTE)",
                                "icon": "mdi:battery-check",
                                "badge_icon": "mdi:percent",
                                "badge_color": "blue",
                                "color": "lime",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\n#border-right: 1px solid rgba(255,255,255,0.1);\nmargin-top: -8px;\nmin-height: 60px;\ntransform: translateY(-86px);\n}\n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_today",
                                "primary": "Battery Buffer",
                                "secondary": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) | length %} {% set num_expensive = state_attr('sensor.cew_today', 'actual_discharge_times') | default([], true) | length %} {% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %} {% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charged_kwh = num_cheap * window_duration * charge_power %} {% set usable_kwh = charged_kwh * rte %} {% set discharged_kwh = num_expensive * window_duration * discharge_power %} {% set net_kwh = usable_kwh - discharged_kwh %} {{ net_kwh | round(1) }} kWh",
                                "icon": "mdi:battery-heart",
                                "color": "cyan",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\nmargin-top: -8px;\nmargin-left: -12px;\nmin-height: 60px;\ntransform: translateY(-86px);\n}\n"
                                }
                              }
                            ]
                          },
                          {
                            "type": "horizontal-stack",
                            "cards": [
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_today",
                                "primary": "Net Price Post-Charge",
                                "secondary": "{% set prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set effective_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set total_cost = (prices | sum) * window_duration * effective_power if prices else 0 %} {% set net_kwh = state_attr('sensor.cew_today', 'net_planned_charge_kwh') | float(0) %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set net_kwh_post_rte = net_kwh * rte %} {% if net_kwh_post_rte > 0 %}€{{ '%.3f' | format(total_cost / net_kwh_post_rte) }}/kWh{% else %}--{% endif %}",
                                "icon": "mdi:currency-eur",
                                "color": "blue",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nmargin-top: -8px;\nmin-height: 60px;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\ntransform: translateY(-86px);\n}\n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_today",
                                "primary": "Buffer Price",
                                "secondary": "{% set charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set discharge_sell_prices = state_attr('sensor.cew_today', 'actual_discharge_sell_prices') | default([], true) %} {% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %} {% set window_duration = 1.0 if pricing_mode == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set discharge_strategy = states('select.cew_base_usage_discharge_strategy') %} {% set effective_charge_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set effective_discharge_power = (discharge_power_kw - base_usage_kw) if discharge_strategy == 'subtract_base' else discharge_power_kw %} {% set total_charge_cost = (charge_prices | sum) * window_duration * effective_charge_power if charge_prices else 0 %} {% set discharge_revenue = (discharge_sell_prices | sum) * window_duration * effective_discharge_power if discharge_sell_prices else 0 %} {% set charged_kwh = (charge_prices | length) * window_duration * effective_charge_power %} {% set usable_kwh = charged_kwh * rte %} {% set discharged_kwh = (discharge_sell_prices | length) * window_duration * effective_discharge_power %} {% set remaining_kwh = usable_kwh - discharged_kwh %} {% if remaining_kwh > 0 %}€{{ '%.3f' | format((total_charge_cost - discharge_revenue) / remaining_kwh) }}/kWh{% elif usable_kwh > 0 and discharged_kwh >= usable_kwh %}Fully Discharged{% else %}--{% endif %}",
                                "icon": "mdi:currency-eur",
                                "color": "{% set num_cheap = state_attr('sensor.cew_today', 'actual_charge_times') | default([], true) | length %} {% if num_cheap > 0 %}green{% else %}grey{% endif %}",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nmargin-left: -18px;\nmargin-top: -8px;\nmin-height: 60px;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\ntransform: translateY(-86px);\n}\n"
                                }
                              }
                            ]
                          },
                          {
                            "type": "horizontal-stack",
                            "cards": [
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_today",
                                "primary": "Post-Charge Margin",
                                "secondary": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_today') | default([]) %} {% set day_avg = (all_prices | map(attribute='value') | sum / all_prices | length) if all_prices | length > 0 else 0 %} {% set prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set effective_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set total_cost = (prices | sum) * window_duration * effective_power if prices else 0 %} {% set net_kwh = state_attr('sensor.cew_today', 'net_planned_charge_kwh') | float(0) %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set net_kwh_post_rte = net_kwh * rte %} {% set net_post_charge = (total_cost / net_kwh_post_rte) if net_kwh_post_rte > 0 else 0 %} {% set savings = day_avg - net_post_charge %} {% if net_kwh_post_rte > 0 %}{{ '€%.3f' | format(savings) }}/kWh{% else %}--{% endif %}",
                                "icon": "mdi:piggy-bank",
                                "color": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_today') | default([]) %} {% set day_avg = (all_prices | map(attribute='value') | sum / all_prices | length) if all_prices | length > 0 else 0 %} {% set prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set effective_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set total_cost = (prices | sum) * window_duration * effective_power if prices else 0 %} {% set net_kwh = state_attr('sensor.cew_today', 'net_planned_charge_kwh') | float(0) %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set net_kwh_post_rte = net_kwh * rte %} {% set net_post_charge = (total_cost / net_kwh_post_rte) if net_kwh_post_rte > 0 else 0 %} {% set savings = day_avg - net_post_charge %} {{ 'green' if savings >= 0 else 'red' }}",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nmargin-top: -8px;\nmin-height: 60px;\nborder-radius: 0 0 0 12px;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\ntransform: translateY(-86px);\n}\n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_today",
                                "primary": "Buffer Margin",
                                "secondary": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_today') | default([]) %} {% set day_avg = (all_prices | map(attribute='value') | sum / all_prices | length) if all_prices | length > 0 else 0 %} {% set charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set discharge_sell_prices = state_attr('sensor.cew_today', 'actual_discharge_sell_prices') | default([], true) %} {% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %} {% set window_duration = 1.0 if pricing_mode == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set discharge_strategy = states('select.cew_base_usage_discharge_strategy') %} {% set effective_charge_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set effective_discharge_power = (discharge_power_kw - base_usage_kw) if discharge_strategy == 'subtract_base' else discharge_power_kw %} {% set total_charge_cost = (charge_prices | sum) * window_duration * effective_charge_power if charge_prices else 0 %} {% set discharge_revenue = (discharge_sell_prices | sum) * window_duration * effective_discharge_power if discharge_sell_prices else 0 %} {% set charged_kwh = (charge_prices | length) * window_duration * effective_charge_power %} {% set usable_kwh = charged_kwh * rte %} {% set discharged_kwh = (discharge_sell_prices | length) * window_duration * effective_discharge_power %} {% set remaining_kwh = usable_kwh - discharged_kwh %} {% set net_post_discharge = ((total_charge_cost - discharge_revenue) / remaining_kwh) if remaining_kwh > 0 else 0 %} {% set margin = day_avg - net_post_discharge %} {% if remaining_kwh > 0 %}{{ '€%.3f' | format(margin) }}/kWh{% elif usable_kwh > 0 and discharged_kwh >= usable_kwh %}Fully Discharged{% else %}--{% endif %}",
                                "icon": "mdi:chart-line",
                                "color": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_today') | default([]) %} {% set day_avg = (all_prices | map(attribute='value') | sum / all_prices | length) if all_prices | length > 0 else 0 %} {% set charge_prices = state_attr('sensor.cew_today', 'actual_charge_prices') | default([], true) %} {% set discharge_sell_prices = state_attr('sensor.cew_today', 'actual_discharge_sell_prices') | default([], true) %} {% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %} {% set window_duration = 1.0 if pricing_mode == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set discharge_strategy = states('select.cew_base_usage_discharge_strategy') %} {% set effective_charge_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set effective_discharge_power = (discharge_power_kw - base_usage_kw) if discharge_strategy == 'subtract_base' else discharge_power_kw %} {% set total_charge_cost = (charge_prices | sum) * window_duration * effective_charge_power if charge_prices else 0 %} {% set discharge_revenue = (discharge_sell_prices | sum) * window_duration * effective_discharge_power if discharge_sell_prices else 0 %} {% set charged_kwh = (charge_prices | length) * window_duration * effective_charge_power %} {% set usable_kwh = charged_kwh * rte %} {% set discharged_kwh = (discharge_sell_prices | length) * window_duration * effective_discharge_power %} {% set remaining_kwh = usable_kwh - discharged_kwh %} {% set net_post_discharge = ((total_charge_cost - discharge_revenue) / remaining_kwh) if remaining_kwh > 0 else 0 %} {% set margin = day_avg - net_post_discharge %} {{ 'green' if margin >= 0 else 'red' }}",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nmargin-left: -18px;\nmargin-top: -8px;\nmin-height: 60px;\nborder-radius: 0 0 12px 0;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\ntransform: translateY(-86px);\n}\n"
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "type": "vertical-stack",
                        "cards": [
                          {
                            "type": "custom:mushroom-template-card",
                            "entity": "sensor.cew_tomorrow",
                            "primary": "Activity Tomorrow - {{ (now() + timedelta(days=1)).strftime('%A, %B %d') }}",
                            "secondary": "{% set base_cost = state_attr('sensor.cew_tomorrow', 'base_usage_day_cost') | float(0) %} {% set base_price = state_attr('sensor.cew_tomorrow', 'day_avg_price') | float(0) %} {% set actual_cost = state_attr('sensor.cew_tomorrow', 'planned_total_cost') | float(0) %} {% set actual_price = state_attr('sensor.cew_tomorrow', 'actual_price_kwh') | float(0) %} {% set cost_diff = state_attr('sensor.cew_tomorrow', 'cost_difference') | float(0) %} {% set buk = state_attr('sensor.cew_tomorrow', 'base_usage_kwh') | float(0) %} {% set ngk = state_attr('sensor.cew_tomorrow', 'net_grid_kwh') | float(0) %} {% set ark = state_attr('sensor.cew_tomorrow', 'actual_remaining_kwh') | float(0) %} {% set bav = state_attr('sensor.cew_tomorrow', 'battery_arbitrage_value') | float(0) %} {% set ts = state_attr('sensor.cew_tomorrow', 'true_savings') | float(0) %} {% set guk = state_attr('sensor.cew_tomorrow', 'gross_usable_kwh') | float(0) %} {% set gdk = state_attr('sensor.cew_tomorrow', 'gross_discharged_kwh') | float(0) %} Base Cost: {{ '€%.2f' | format(base_cost) }}/day ({{ buk | round(1) }} kWh @ €{{ '%.3f' | format(base_price) }}){{ '\\n' }}Actual Cost: {{ '€%.2f' | format(actual_cost) }}/day ({{ ngk | round(1) }} kWh @ €{{ '%.3f' | format(actual_price) }}){{ '\\n' }}──────────────────────{{ '\\n' }}You Pay: {{ '€%.2f' | format(cost_diff) }} {% if cost_diff >= 0 %}less{% else %}more{% endif %}{% if ark > 0 %}{{ '\\n' }}You Get: +{{ ark | round(1) }} kWh buffer ({{ '€%.2f' | format(bav) }}){% elif guk > 0 and gdk >= guk %}{{ '\\n' }}Battery: Fully Discharged{% endif %}{{ '\\n' }}Total Value: {{ '€%.2f' | format(ts) }} savings",
                            "multiline_secondary": true,
                            "icon": "mdi:chart-timeline-variant",
                            "color": "{% set buy_profit = state_attr('sensor.cew_tomorrow', 'charge_profit_pct') | float(0) %} {% set sell_profit = state_attr('sensor.cew_tomorrow', 'discharge_profit_pct') | float(0) %} {% if buy_profit > 0 and sell_profit > 0 %}green{% elif buy_profit > 0 or sell_profit > 0 %}amber{% else %}grey{% endif %}",
                            "tap_action": {
                              "action": "none"
                            },
                            "features_position": "bottom",
                            "card_mod": {
                              "style": "ha-card {\nborder: 0;\nborder-radius: 12px 12px 0 0;\nmin-height: 60px;\nmargin-top: 2px;\ntransform: translateY(-86px);\nborder-bottom: 1px solid rgba(255,255,255,0.1);\n}\n"
                            }
                          },
                          {
                            "type": "horizontal-stack",
                            "cards": [
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_tomorrow",
                                "primary": "Charge Gross/Net",
                                "secondary": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length %} {% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set gross_kwh = num_cheap * window_duration * charge_power %} {% set net_kwh = state_attr('sensor.cew_tomorrow', 'net_planned_charge_kwh') | float(0) %} Gross: {{ gross_kwh | round(1) }} kWh ({{ num_cheap }} windows){{ '\\n' }}Total Net: {{ net_kwh | round(1) }} kWh",
                                "multiline_secondary": true,
                                "icon": "mdi:battery-charging",
                                "color": "green",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\nmin-height: 60px;\nmargin-top: -6px;\ntransform: translateY(-86px);\n}\n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_tomorrow",
                                "primary": "Discharge Gross/Net",
                                "secondary": "{% set num_expensive = state_attr('sensor.cew_tomorrow', 'actual_discharge_times') | default([], true) | length %} {% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set gross_kwh = num_expensive * window_duration * discharge_power %} {% set net_kwh = state_attr('sensor.cew_tomorrow', 'net_planned_discharge_kwh') | float(0) %} Gross: {{ gross_kwh | round(1) }} kWh ({{ num_expensive }} windows){{ '\\n' }}Total Net: {{ net_kwh | round(1) }} kWh",
                                "multiline_secondary": true,
                                "icon": "mdi:battery-minus",
                                "color": "orange",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\nmin-height: 60px;\nmargin-top: -6px;\nmargin-left: -16px;\nmargin-bottom: 6px;\ntransform: translateY(-86px);\n}\n"
                                }
                              }
                            ]
                          },
                          {
                            "type": "horizontal-stack",
                            "cards": [
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_tomorrow",
                                "primary": "Net Post-Charge kWh",
                                "secondary": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length %} {% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(90) / 100 %} {% set rte_pct = states('number.cew_battery_rte') | float(90) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charged_kwh = num_cheap * window_duration * charge_power %} {% set usable_charged_kwh = charged_kwh * rte %} {{ usable_charged_kwh | round(1) }} kWh ({{ rte_pct | round(0) }}% RTE)",
                                "icon": "mdi:battery-check",
                                "badge_icon": "mdi:percent",
                                "badge_color": "blue",
                                "color": "lime",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\n#border-right: 1px solid rgba(255,255,255,0.1);\nmargin-top: -8px;\nmin-height: 60px;\ntransform: translateY(-92px);\n}\n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_tomorrow",
                                "primary": "Battery Buffer",
                                "secondary": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length %} {% set num_expensive = state_attr('sensor.cew_tomorrow', 'actual_discharge_times') | default([], true) | length %} {% set charge_power = states('number.cew_charge_power') | float(0) / 1000 %} {% set discharge_power = states('number.cew_discharge_power') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charged_kwh = num_cheap * window_duration * charge_power %} {% set usable_kwh = charged_kwh * rte %} {% set discharged_kwh = num_expensive * window_duration * discharge_power %} {% set net_kwh = usable_kwh - discharged_kwh %} {{ net_kwh | round(1) }} kWh",
                                "icon": "mdi:battery-heart",
                                "color": "cyan",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\nmargin-top: -8px;\nmargin-left: -12px;\nmin-height: 60px;\ntransform: translateY(-92px);\n}\n"
                                }
                              }
                            ]
                          },
                          {
                            "type": "horizontal-stack",
                            "cards": [
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_tomorrow",
                                "primary": "Net Price Post-Charge",
                                "secondary": "{% set prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set effective_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set total_cost = (prices | sum) * window_duration * effective_power if prices else 0 %} {% set net_kwh = state_attr('sensor.cew_tomorrow', 'net_planned_charge_kwh') | float(0) %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set net_kwh_post_rte = net_kwh * rte %} {% if net_kwh_post_rte > 0 %}€{{ '%.3f' | format(total_cost / net_kwh_post_rte) }}/kWh{% else %}--{% endif %}",
                                "icon": "mdi:currency-eur",
                                "color": "blue",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nmargin-top: -8px;\nmin-height: 60px;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\ntransform: translateY(-92px);\n}\n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_tomorrow",
                                "primary": "Buffer Price",
                                "secondary": "{% set charge_prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set discharge_sell_prices = state_attr('sensor.cew_tomorrow', 'actual_discharge_sell_prices') | default([], true) %} {% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %} {% set window_duration = 1.0 if pricing_mode == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set discharge_strategy = states('select.cew_base_usage_discharge_strategy') %} {% set effective_charge_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set effective_discharge_power = (discharge_power_kw - base_usage_kw) if discharge_strategy == 'subtract_base' else discharge_power_kw %} {% set total_charge_cost = (charge_prices | sum) * window_duration * effective_charge_power if charge_prices else 0 %} {% set discharge_revenue = (discharge_sell_prices | sum) * window_duration * effective_discharge_power if discharge_sell_prices else 0 %} {% set charged_kwh = (charge_prices | length) * window_duration * effective_charge_power %} {% set usable_kwh = charged_kwh * rte %} {% set discharged_kwh = (discharge_sell_prices | length) * window_duration * effective_discharge_power %} {% set remaining_kwh = usable_kwh - discharged_kwh %} {% if remaining_kwh > 0 %}€{{ '%.3f' | format((total_charge_cost - discharge_revenue) / remaining_kwh) }}/kWh{% elif usable_kwh > 0 and discharged_kwh >= usable_kwh %}Fully Discharged{% else %}--{% endif %}",
                                "icon": "mdi:currency-eur",
                                "color": "{% set num_cheap = state_attr('sensor.cew_tomorrow', 'actual_charge_times') | default([], true) | length %} {% if num_cheap > 0 %}green{% else %}grey{% endif %}",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nmargin-left: -16px;\nmargin-top: -8px;\nmin-height: 60px;\nborder-bottom: 1px solid rgba(255,255,255,0.1);\ntransform: translateY(-92px);\n}\n"
                                }
                              }
                            ]
                          },
                          {
                            "type": "horizontal-stack",
                            "cards": [
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_tomorrow",
                                "primary": "Post-Charge Margin",
                                "secondary": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_tomorrow') | default([]) %} {% set day_avg = (all_prices | map(attribute='value') | sum / all_prices | length) if all_prices | length > 0 else 0 %} {% set prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set effective_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set total_cost = (prices | sum) * window_duration * effective_power if prices else 0 %} {% set net_kwh = state_attr('sensor.cew_tomorrow', 'net_planned_charge_kwh') | float(0) %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set net_kwh_post_rte = net_kwh * rte %} {% set net_post_charge = (total_cost / net_kwh_post_rte) if net_kwh_post_rte > 0 else 0 %} {% set savings = day_avg - net_post_charge %} {% if net_kwh_post_rte > 0 %}{{ '€%.3f' | format(savings) }}/kWh{% else %}--{% endif %}",
                                "icon": "mdi:piggy-bank",
                                "color": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_tomorrow') | default([]) %} {% set day_avg = (all_prices | map(attribute='value') | sum / all_prices | length) if all_prices | length > 0 else 0 %} {% set prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set window_duration = 1.0 if states('select.cew_pricing_window_duration') == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set effective_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set total_cost = (prices | sum) * window_duration * effective_power if prices else 0 %} {% set net_kwh = state_attr('sensor.cew_tomorrow', 'net_planned_charge_kwh') | float(0) %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set net_kwh_post_rte = net_kwh * rte %} {% set net_post_charge = (total_cost / net_kwh_post_rte) if net_kwh_post_rte > 0 else 0 %} {% set savings = day_avg - net_post_charge %} {{ 'green' if savings >= 0 else 'red' }}",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nmargin-top: -8px;\nmin-height: 60px;\nborder-radius: 0 0 0 12px;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\ntransform: translateY(-92px);\n}\n"
                                }
                              },
                              {
                                "type": "custom:mushroom-template-card",
                                "entity": "sensor.cew_tomorrow",
                                "primary": "Buffer Margin",
                                "secondary": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_tomorrow') | default([]) %} {% set day_avg = (all_prices | map(attribute='value') | sum / all_prices | length) if all_prices | length > 0 else 0 %} {% set charge_prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set discharge_sell_prices = state_attr('sensor.cew_tomorrow', 'actual_discharge_sell_prices') | default([], true) %} {% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %} {% set window_duration = 1.0 if pricing_mode == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set discharge_strategy = states('select.cew_base_usage_discharge_strategy') %} {% set effective_charge_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set effective_discharge_power = (discharge_power_kw - base_usage_kw) if discharge_strategy == 'subtract_base' else discharge_power_kw %} {% set total_charge_cost = (charge_prices | sum) * window_duration * effective_charge_power if charge_prices else 0 %} {% set discharge_revenue = (discharge_sell_prices | sum) * window_duration * effective_discharge_power if discharge_sell_prices else 0 %} {% set charged_kwh = (charge_prices | length) * window_duration * effective_charge_power %} {% set usable_kwh = charged_kwh * rte %} {% set discharged_kwh = (discharge_sell_prices | length) * window_duration * effective_discharge_power %} {% set remaining_kwh = usable_kwh - discharged_kwh %} {% set net_post_discharge = ((total_charge_cost - discharge_revenue) / remaining_kwh) if remaining_kwh > 0 else 0 %} {% set margin = day_avg - net_post_discharge %} {% if remaining_kwh > 0 %}{{ '€%.3f' | format(margin) }}/kWh{% elif usable_kwh > 0 and discharged_kwh >= usable_kwh %}Fully Discharged{% else %}--{% endif %}",
                                "icon": "mdi:chart-line",
                                "color": "{% set all_prices = state_attr('sensor.cew_price_sensor_proxy', 'calculated_tomorrow') | default([]) %} {% set day_avg = (all_prices | map(attribute='value') | sum / all_prices | length) if all_prices | length > 0 else 0 %} {% set charge_prices = state_attr('sensor.cew_tomorrow', 'actual_charge_prices') | default([], true) %} {% set discharge_sell_prices = state_attr('sensor.cew_tomorrow', 'actual_discharge_sell_prices') | default([], true) %} {% set pricing_mode = states('select.cew_pricing_window_duration') | default('15_minutes') %} {% set window_duration = 1.0 if pricing_mode == '1_hour' else 0.25 %} {% set charge_power_kw = states('number.cew_charge_power') | float(0) / 1000 %} {% set discharge_power_kw = states('number.cew_discharge_power') | float(0) / 1000 %} {% set base_usage_kw = states('number.cew_base_usage') | float(0) / 1000 %} {% set rte = states('number.cew_battery_rte') | float(85) / 100 %} {% set charge_strategy = states('select.cew_base_usage_charge_strategy') %} {% set discharge_strategy = states('select.cew_base_usage_discharge_strategy') %} {% set effective_charge_power = (charge_power_kw - base_usage_kw) if charge_strategy == 'battery_covers_base' else charge_power_kw %} {% set effective_discharge_power = (discharge_power_kw - base_usage_kw) if discharge_strategy == 'subtract_base' else discharge_power_kw %} {% set total_charge_cost = (charge_prices | sum) * window_duration * effective_charge_power if charge_prices else 0 %} {% set discharge_revenue = (discharge_sell_prices | sum) * window_duration * effective_discharge_power if discharge_sell_prices else 0 %} {% set charged_kwh = (charge_prices | length) * window_duration * effective_charge_power %} {% set usable_kwh = charged_kwh * rte %} {% set discharged_kwh = (discharge_sell_prices | length) * window_duration * effective_discharge_power %} {% set remaining_kwh = usable_kwh - discharged_kwh %} {% set net_post_discharge = ((total_charge_cost - discharge_revenue) / remaining_kwh) if remaining_kwh > 0 else 0 %} {% set margin = day_avg - net_post_discharge %} {{ 'green' if margin >= 0 else 'red' }}",
                                "tap_action": {
                                  "action": "none"
                                },
                                "features_position": "bottom",
                                "card_mod": {
                                  "style": "ha-card {\nborder-radius: 0;\nborder: 0;\nmargin-left: -16px;\nmargin-top: -8px;\nmin-height: 60px;\nborder-radius: 0 0 12px 0;\n#border-bottom: 1px solid rgba(255,255,255,0.1);\ntransform: translateY(-92px);\n}\n"
                                }
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
          }
        ]
      };
    } catch (error) {
      console.error("CheapestEnergyWindowsStrategy error:", error);
      return {
        views: [{
          title: "Error",
          cards: [{
            type: "markdown",
            content: "Error loading dashboard: " + error.message
          }]
        }]
      };
    }
  }
}

customElements.define("ll-strategy-dashboard-cheapest-energy-windows", CheapestEnergyWindowsStrategy);
