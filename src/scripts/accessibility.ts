// Accessibility panel functionality

document.addEventListener('DOMContentLoaded', () => {
  const accessibilityToggle = document.getElementById('accessibility-toggle');
  const accessibilityPanel = document.getElementById('accessibility-panel');
  const accessibilityOverlay = document.getElementById('accessibility-overlay');
  const closeButton = document.getElementById('close-accessibility-panel');
  const fontSizeSlider = document.getElementById('font-size-slider') as HTMLInputElement;
  const fontSizeValue = document.getElementById('font-size-value');
  const contrastToggle = document.getElementById('contrast-toggle');
  const contrastIndicator = document.getElementById('contrast-indicator');
  const resetButton = document.getElementById('reset-accessibility');

  // Load saved preferences
  function loadPreferences(): void {
    const savedFontSize = localStorage.getItem('accessibilityFontSize');
    const savedContrast = localStorage.getItem('accessibilityContrast');

    if (savedFontSize && fontSizeSlider && fontSizeValue) {
      fontSizeSlider.value = savedFontSize;
      fontSizeValue.textContent = savedFontSize + '%';
      document.documentElement.style.setProperty('--accessibility-font-size', savedFontSize + '%');
    }

    if (savedContrast === 'high') {
      document.documentElement.classList.add('high-contrast');
      if (contrastToggle) {
        contrastToggle.setAttribute('aria-checked', 'true');
      }
      if (contrastIndicator) {
        contrastIndicator.classList.add('bg-primary-600');
        const toggle = contrastIndicator.querySelector('span');
        if (toggle) {
          toggle.classList.add('translate-x-6');
        }
      }
    }
  }

  // Open panel
  function openPanel(): void {
    if (accessibilityPanel && accessibilityOverlay) {
      accessibilityPanel.classList.remove('translate-x-full');
      accessibilityPanel.setAttribute('aria-hidden', 'false');
      accessibilityOverlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      // Focus on close button for accessibility
      closeButton?.focus();
    }
  }

  // Close panel
  function closePanel(): void {
    if (accessibilityPanel && accessibilityOverlay) {
      accessibilityPanel.classList.add('translate-x-full');
      accessibilityPanel.setAttribute('aria-hidden', 'true');
      accessibilityOverlay.classList.add('hidden');
      document.body.style.overflow = '';

      // Return focus to toggle button
      accessibilityToggle?.focus();
    }
  }

  // Handle font size change
  function handleFontSizeChange(): void {
    if (!fontSizeSlider || !fontSizeValue) return;

    const value = fontSizeSlider.value;
    fontSizeValue.textContent = value + '%';
    document.documentElement.style.setProperty('--accessibility-font-size', value + '%');
    localStorage.setItem('accessibilityFontSize', value);
  }

  // Handle contrast toggle
  function handleContrastToggle(): void {
    const isHighContrast = document.documentElement.classList.toggle('high-contrast');

    if (contrastToggle) {
      contrastToggle.setAttribute('aria-checked', String(isHighContrast));
    }

    if (contrastIndicator) {
      contrastIndicator.classList.toggle('bg-primary-600', isHighContrast);
      contrastIndicator.classList.toggle('bg-gray-300', !isHighContrast);
      const toggle = contrastIndicator.querySelector('span');
      if (toggle) {
        toggle.classList.toggle('translate-x-6', isHighContrast);
      }
    }

    localStorage.setItem('accessibilityContrast', isHighContrast ? 'high' : 'normal');
  }

  // Reset all preferences
  function resetPreferences(): void {
    // Reset font size
    if (fontSizeSlider && fontSizeValue) {
      fontSizeSlider.value = '100';
      fontSizeValue.textContent = '100%';
    }
    document.documentElement.style.setProperty('--accessibility-font-size', '100%');
    localStorage.removeItem('accessibilityFontSize');

    // Reset contrast
    document.documentElement.classList.remove('high-contrast');
    if (contrastToggle) {
      contrastToggle.setAttribute('aria-checked', 'false');
    }
    if (contrastIndicator) {
      contrastIndicator.classList.remove('bg-primary-600');
      contrastIndicator.classList.add('bg-gray-300');
      const toggle = contrastIndicator.querySelector('span');
      if (toggle) {
        toggle.classList.remove('translate-x-6');
      }
    }
    localStorage.removeItem('accessibilityContrast');
  }

  // Event listeners
  accessibilityToggle?.addEventListener('click', openPanel);
  closeButton?.addEventListener('click', closePanel);
  accessibilityOverlay?.addEventListener('click', closePanel);
  fontSizeSlider?.addEventListener('input', handleFontSizeChange);
  contrastToggle?.addEventListener('click', handleContrastToggle);
  resetButton?.addEventListener('click', resetPreferences);

  // Handle Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && accessibilityPanel && !accessibilityPanel.classList.contains('translate-x-full')) {
      closePanel();
    }
  });

  // Load saved preferences on page load
  loadPreferences();
});
