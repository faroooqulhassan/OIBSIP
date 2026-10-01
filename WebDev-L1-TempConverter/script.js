// ============================================
// Temperature Converter — conversion logic
// ============================================

const form = document.getElementById('converter-form');
const valueInput = document.getElementById('temp-value');
const unitSelect = document.getElementById('temp-unit');
const errorMessage = document.getElementById('error-message');

const resultRows = {
  C: document.querySelector('.result-row[data-unit="C"]'),
  F: document.querySelector('.result-row[data-unit="F"]'),
  K: document.querySelector('.result-row[data-unit="K"]'),
};
const resultValues = {
  C: document.getElementById('result-c'),
  F: document.getElementById('result-f'),
  K: document.getElementById('result-k'),
};

// Absolute zero reference points, one per unit
const ABSOLUTE_ZERO = { C: -273.15, F: -459.67, K: 0 };

function toCelsius(value, fromUnit) {
  if (fromUnit === 'C') return value;
  if (fromUnit === 'F') return (value - 32) * (5 / 9);
  if (fromUnit === 'K') return value - 273.15;
}

function fromCelsius(celsius) {
  return {
    C: celsius,
    F: celsius * (9 / 5) + 32,
    K: celsius + 273.15,
  };
}

function formatResult(value) {
  // Round to 2 decimal places, trimming a trailing ".00" when the value is a whole number
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? rounded.toFixed(1) : rounded.toFixed(2);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
  valueInput.classList.add('invalid');
}

function clearError() {
  errorMessage.hidden = true;
  errorMessage.textContent = '';
  valueInput.classList.remove('invalid');
}

function clearResults() {
  Object.values(resultValues).forEach(el => { el.textContent = '—'; });
  Object.values(resultRows).forEach(row => row.classList.remove('active'));
}

function setActiveRow(unit) {
  Object.values(resultRows).forEach(row => row.classList.remove('active'));
  resultRows[unit].classList.add('active');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();

  const raw = valueInput.value.trim();
  const unit = unitSelect.value;

  // Reject empty input
  if (raw === '') {
    clearResults();
    showError('Please enter a temperature value.');
    return;
  }

  // Reject non-numeric input (allows leading minus and decimals)
  const numericPattern = /^-?\d+(\.\d+)?$/;
  if (!numericPattern.test(raw)) {
    clearResults();
    showError('That doesn\'t look like a number. Use digits only, e.g. -40 or 36.6');
    return;
  }

  const value = parseFloat(raw);

  // Edge case: value below absolute zero for the selected unit
  if (value < ABSOLUTE_ZERO[unit]) {
    clearResults();
    showError(
      `${value}°${unit} is below absolute zero (${ABSOLUTE_ZERO[unit]}°${unit} minimum). Nothing can be colder than that.`
    );
    return;
  }

  const celsius = toCelsius(value, unit);
  const converted = fromCelsius(celsius);

  resultValues.C.textContent = `${formatResult(converted.C)} °C`;
  resultValues.F.textContent = `${formatResult(converted.F)} °F`;
  resultValues.K.textContent = `${formatResult(converted.K)} K`;

  setActiveRow(unit);
});

// Clear the error state as soon as the user starts correcting their input
valueInput.addEventListener('input', () => {
  if (!errorMessage.hidden) clearError();
});
