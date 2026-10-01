# WebDev-L1-TempConverter — Temperature Converter

**Track:** Web Development & Designing
**Level:** 1 · Task 3 — Temperature Converter Website
**Author:** Farooq Ul Hassan

## About the project
An interactive temperature converter that takes a value in Celsius, Fahrenheit,
or Kelvin and converts it to all three units at once, with input validation and
an absolute-zero edge-case check.

## Features implemented
- Text input (numeric keypad on mobile via `inputmode="decimal"`) — rejects
  non-numeric input with an inline error message
- Unit selector dropdown: Celsius / Fahrenheit / Kelvin
- All three converted values shown simultaneously on every convert
- Convert button triggers the calculation (form submit, so Enter key works too)
- Result display with clear unit labels; the input's own unit row is
  highlighted after conversion
- Edge case handling: entering a value below absolute zero for the selected
  unit (−273.15°C / −459.67°F / 0 K) shows a friendly error instead of a
  nonsensical result
- Clean, centered, single-card UI with clear labels

## Tech stack
- HTML5
- CSS3 (Flexbox)
- Vanilla JavaScript (no libraries, no `eval()`)
- Google Fonts: Space Grotesk, Inter, IBM Plex Mono

## File structure
```
WebDev-L1-TempConverter/
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
    └── (add your screenshot here before pushing)
```

## How to run
Open `index.html` directly in any browser — no build step or server required.

## Conversion formulas used
- °C → °F: `(C × 9/5) + 32`
- °F → °C: `(F − 32) × 5/9`
- °C → K: `C + 273.15`
- K → °C: `K − 273.15`

## Color palette
| Token | Hex | Use |
|---|---|---|
| Background | `#F4F6FA` | Page background |
| Ink | `#1B2430` | Headings, primary text |
| Cold (primary) | `#2F6FED` | Button, Celsius/Kelvin highlight, focus state |
| Hot (secondary) | `#E8743B` | Fahrenheit highlight |
| Error | `#C23B3B` | Invalid input / absolute-zero message |
