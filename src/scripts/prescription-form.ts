// Prescription form functionality

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('prescription-form') as HTMLFormElement;
  const steps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.step');
  const prevButton = document.getElementById('prev-step') as HTMLButtonElement;
  const nextButton = document.getElementById('next-step') as HTMLButtonElement;
  const submitButton = document.getElementById('submit-form') as HTMLButtonElement;
  const formNavigation = document.getElementById('form-navigation');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const addMedicationButton = document.getElementById('add-medication');
  const medicationsContainer = document.getElementById('medications-container');

  let currentStep = 1;
  const totalSteps = 4;
  let medicationCount = 1;

  // Save form data to sessionStorage
  function saveFormData(): void {
    const formData = new FormData(form);
    const data: Record<string, unknown> = {};

    formData.forEach((value, key) => {
      if (key.includes('[]')) {
        const baseKey = key.replace('[]', '');
        if (!data[baseKey]) {
          data[baseKey] = [];
        }
        (data[baseKey] as string[]).push(value as string);
      } else {
        data[key] = value;
      }
    });

    sessionStorage.setItem('prescriptionFormData', JSON.stringify(data));
  }

  // Load form data from sessionStorage
  function loadFormData(): void {
    const savedData = sessionStorage.getItem('prescriptionFormData');
    if (!savedData) return;

    try {
      const data = JSON.parse(savedData);

      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle array fields (medications)
          const inputs = form.querySelectorAll(`[name="${key}[]"]`);
          value.forEach((v, i) => {
            if (inputs[i]) {
              (inputs[i] as HTMLInputElement).value = v;
            }
          });
        } else {
          const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement;
          if (input) {
            if (input.type === 'radio') {
              const radio = form.querySelector(`[name="${key}"][value="${value}"]`) as HTMLInputElement;
              if (radio) radio.checked = true;
            } else if (input.type === 'checkbox') {
              input.checked = value === 'on';
            } else {
              input.value = value as string;
            }
          }
        }
      });
    } catch (e) {
      console.error('Error loading form data:', e);
    }
  }

  // Update step visibility
  function updateStepVisibility(): void {
    steps.forEach((step, index) => {
      step.classList.toggle('hidden', index + 1 !== currentStep);
    });

    // Update progress indicators
    progressSteps.forEach((step, index) => {
      step.classList.remove('active', 'completed');
      if (index + 1 === currentStep) {
        step.classList.add('active');
      } else if (index + 1 < currentStep) {
        step.classList.add('completed');
      }
    });

    // Update navigation buttons
    prevButton.classList.toggle('hidden', currentStep === 1);
    nextButton.classList.toggle('hidden', currentStep === totalSteps);
    submitButton.classList.toggle('hidden', currentStep !== totalSteps);

    // Scroll to top of form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Validate current step
  function validateStep(step: number): boolean {
    let isValid = true;

    if (step === 1) {
      // Validate personal details
      const achternaam = document.getElementById('achternaam') as HTMLInputElement;
      const achternaamError = document.getElementById('achternaam-error');

      if (!achternaam.value.trim()) {
        achternaamError?.classList.remove('hidden');
        achternaam.classList.add('border-red-500');
        isValid = false;
      } else {
        achternaamError?.classList.add('hidden');
        achternaam.classList.remove('border-red-500');
      }

      // Validate birthdate
      const dag = document.getElementById('geboortedag') as HTMLSelectElement;
      const maand = document.getElementById('geboortemaand') as HTMLSelectElement;
      const jaar = document.getElementById('geboortejaar') as HTMLSelectElement;
      const datumError = document.getElementById('geboortedatum-error');

      if (!dag.value || !maand.value || !jaar.value) {
        datumError?.classList.remove('hidden');
        isValid = false;
      } else {
        datumError?.classList.add('hidden');
      }

      // Validate gender
      const geslacht = form.querySelector('input[name="geslacht"]:checked');
      const geslachtError = document.getElementById('geslacht-error');

      if (!geslacht) {
        geslachtError?.classList.remove('hidden');
        isValid = false;
      } else {
        geslachtError?.classList.add('hidden');
      }
    }

    if (step === 2) {
      // Validate email
      const email = document.getElementById('email') as HTMLInputElement;
      const emailError = document.getElementById('email-error');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.value.trim() || !emailPattern.test(email.value)) {
        emailError?.classList.remove('hidden');
        email.classList.add('border-red-500');
        isValid = false;
      } else {
        emailError?.classList.add('hidden');
        email.classList.remove('border-red-500');
      }
    }

    if (step === 3) {
      // Validate medications
      const medicationNames = document.querySelectorAll('.medication-name') as NodeListOf<HTMLInputElement>;
      const medicationUsages = document.querySelectorAll('.medication-usage') as NodeListOf<HTMLInputElement>;
      const medicationStrengths = document.querySelectorAll('.medication-strength') as NodeListOf<HTMLInputElement>;

      medicationNames.forEach((input, index) => {
        if (!input.value.trim() || !medicationUsages[index]?.value.trim() || !medicationStrengths[index]?.value.trim()) {
          input.classList.add('border-red-500');
          isValid = false;
        } else {
          input.classList.remove('border-red-500');
        }
      });

      // Validate pharmacy
      const apotheek = document.getElementById('apotheek') as HTMLInputElement;
      const apotheekError = document.getElementById('apotheek-error');

      if (!apotheek.value.trim()) {
        apotheekError?.classList.remove('hidden');
        apotheek.classList.add('border-red-500');
        isValid = false;
      } else {
        apotheekError?.classList.add('hidden');
        apotheek.classList.remove('border-red-500');
      }

      // Validate delivery
      const bezorgen = form.querySelector('input[name="bezorgen"]:checked');
      const bezorgenError = document.getElementById('bezorgen-error');

      if (!bezorgen) {
        bezorgenError?.classList.remove('hidden');
        isValid = false;
      } else {
        bezorgenError?.classList.add('hidden');
      }
    }

    if (step === 4) {
      // Validate checkboxes
      const privacyConsent = document.getElementById('privacy-consent') as HTMLInputElement;
      const privacyError = document.getElementById('privacy-error');
      const akkoord = document.getElementById('akkoord') as HTMLInputElement;
      const akkoordError = document.getElementById('akkoord-error');

      if (!privacyConsent.checked) {
        privacyError?.classList.remove('hidden');
        isValid = false;
      } else {
        privacyError?.classList.add('hidden');
      }

      if (!akkoord.checked) {
        akkoordError?.classList.remove('hidden');
        isValid = false;
      } else {
        akkoordError?.classList.add('hidden');
      }
    }

    return isValid;
  }

  // Update summary
  function updateSummary(): void {
    const summaryPersonal = document.getElementById('summary-personal');
    const summaryAddress = document.getElementById('summary-address');
    const summaryMedications = document.getElementById('summary-medications');

    if (summaryPersonal) {
      const voorletters = (document.getElementById('voorletters') as HTMLInputElement).value;
      const voornaam = (document.getElementById('voornaam') as HTMLInputElement).value;
      const tussenvoegsel = (document.getElementById('tussenvoegsel') as HTMLInputElement).value;
      const achternaam = (document.getElementById('achternaam') as HTMLInputElement).value;
      const dag = (document.getElementById('geboortedag') as HTMLSelectElement).value;
      const maand = (document.getElementById('geboortemaand') as HTMLSelectElement).value;
      const jaar = (document.getElementById('geboortejaar') as HTMLSelectElement).value;
      const geslachtEl = form.querySelector('input[name="geslacht"]:checked') as HTMLInputElement;
      const geslacht = geslachtEl?.value || '';

      const fullName = [voorletters, voornaam, tussenvoegsel, achternaam].filter(Boolean).join(' ');

      summaryPersonal.innerHTML = `
        <div class="flex"><dt class="w-1/3 font-medium">Naam:</dt><dd>${fullName}</dd></div>
        <div class="flex"><dt class="w-1/3 font-medium">Geboortedatum:</dt><dd>${dag}-${maand}-${jaar}</dd></div>
        <div class="flex"><dt class="w-1/3 font-medium">Geslacht:</dt><dd>${geslacht.charAt(0).toUpperCase() + geslacht.slice(1)}</dd></div>
      `;
    }

    if (summaryAddress) {
      const straatnaam = (document.getElementById('straatnaam') as HTMLInputElement).value;
      const huisnummer = (document.getElementById('huisnummer') as HTMLInputElement).value;
      const postcode = (document.getElementById('postcode') as HTMLInputElement).value;
      const woonplaats = (document.getElementById('woonplaats') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const mobiel = (document.getElementById('mobiel') as HTMLInputElement).value;
      const telefoon = (document.getElementById('telefoon') as HTMLInputElement).value;

      summaryAddress.innerHTML = `
        <div class="flex"><dt class="w-1/3 font-medium">Adres:</dt><dd>${straatnaam} ${huisnummer}</dd></div>
        <div class="flex"><dt class="w-1/3 font-medium">Postcode/Plaats:</dt><dd>${postcode} ${woonplaats}</dd></div>
        <div class="flex"><dt class="w-1/3 font-medium">E-mail:</dt><dd>${email}</dd></div>
        ${mobiel ? `<div class="flex"><dt class="w-1/3 font-medium">Mobiel:</dt><dd>${mobiel}</dd></div>` : ''}
        ${telefoon ? `<div class="flex"><dt class="w-1/3 font-medium">Telefoon:</dt><dd>${telefoon}</dd></div>` : ''}
      `;
    }

    if (summaryMedications) {
      const medicationNames = document.querySelectorAll('.medication-name') as NodeListOf<HTMLInputElement>;
      const medicationUsages = document.querySelectorAll('.medication-usage') as NodeListOf<HTMLInputElement>;
      const medicationStrengths = document.querySelectorAll('.medication-strength') as NodeListOf<HTMLInputElement>;
      const apotheek = (document.getElementById('apotheek') as HTMLInputElement).value;
      const opmerkingen = (document.getElementById('opmerkingen') as HTMLTextAreaElement).value;
      const bezorgenEl = form.querySelector('input[name="bezorgen"]:checked') as HTMLInputElement;
      const bezorgen = bezorgenEl?.value || '';

      let medicationsHtml = '';
      medicationNames.forEach((input, index) => {
        if (input.value) {
          medicationsHtml += `
            <div class="bg-white p-3 rounded border border-gray-200 mb-2">
              <strong>${input.value}</strong><br>
              ${medicationUsages[index]?.value} - ${medicationStrengths[index]?.value}
            </div>
          `;
        }
      });

      summaryMedications.innerHTML = `
        <div class="mb-4">${medicationsHtml}</div>
        <div class="flex"><dt class="w-1/3 font-medium">Apotheek:</dt><dd>${apotheek}</dd></div>
        <div class="flex"><dt class="w-1/3 font-medium">Bezorgen:</dt><dd>${bezorgen === 'ja' ? 'Ja' : 'Nee'}</dd></div>
        ${opmerkingen ? `<div class="flex"><dt class="w-1/3 font-medium">Opmerkingen:</dt><dd>${opmerkingen}</dd></div>` : ''}
      `;
    }
  }

  // Add medication
  function addMedication(): void {
    medicationCount++;

    const medicationHtml = `
      <div class="medication-item border border-gray-200 rounded-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-medium text-gray-900">Medicijn ${medicationCount}</h3>
          <button type="button" class="remove-medication text-red-600 hover:text-red-800 text-sm">
            Verwijderen
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block font-medium text-gray-700 mb-1">
              Naam medicijn <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="medicijn_naam[]"
              required
              placeholder="Naam van het medicijn"
              class="w-full medication-name"
            />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">
              Gebruik per dag <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="medicijn_gebruik[]"
              required
              placeholder="Bijv. 2x daags"
              class="w-full medication-usage"
            />
          </div>
          <div>
            <label class="block font-medium text-gray-700 mb-1">
              Sterkte <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="medicijn_sterkte[]"
              required
              placeholder="Bijv. 10mg"
              class="w-full medication-strength"
            />
          </div>
        </div>
      </div>
    `;

    medicationsContainer?.insertAdjacentHTML('beforeend', medicationHtml);

    // Add remove listener
    const removeButtons = document.querySelectorAll('.remove-medication');
    removeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        target.closest('.medication-item')?.remove();
        updateMedicationNumbers();
      });
    });
  }

  // Update medication numbers
  function updateMedicationNumbers(): void {
    const items = document.querySelectorAll('.medication-item');
    items.forEach((item, index) => {
      const title = item.querySelector('h3');
      if (title) {
        title.textContent = `Medicijn ${index + 1}`;
      }
    });
    medicationCount = items.length;
  }

  // Go to specific step
  function goToStep(step: number): void {
    if (step >= 1 && step <= totalSteps) {
      saveFormData();
      currentStep = step;
      updateStepVisibility();

      if (step === totalSteps) {
        updateSummary();
      }
    }
  }

  // Submit form
  async function submitForm(): Promise<void> {
    if (!validateStep(currentStep)) return;

    submitButton.disabled = true;
    submitButton.textContent = 'Versturen...';

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Hide form elements
        steps.forEach((step) => step.classList.add('hidden'));
        formNavigation?.classList.add('hidden');
        document.querySelector('.step-indicator')?.classList.add('hidden');

        // Show success message
        formSuccess?.classList.remove('hidden');
        formError?.classList.add('hidden');

        // Clear saved data
        sessionStorage.removeItem('prescriptionFormData');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      formError?.classList.remove('hidden');
      submitButton.disabled = false;
      submitButton.textContent = 'Aanvragen';
    }
  }

  // Event listeners
  nextButton?.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      goToStep(currentStep + 1);
    }
  });

  prevButton?.addEventListener('click', () => {
    goToStep(currentStep - 1);
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });

  addMedicationButton?.addEventListener('click', addMedication);

  // Edit step buttons in summary
  document.querySelectorAll('.edit-step').forEach((button) => {
    button.addEventListener('click', () => {
      const step = parseInt((button as HTMLElement).dataset.step || '1');
      goToStep(step);
    });
  });

  // Save form data on input change
  form?.addEventListener('input', () => {
    saveFormData();
  });

  // Load saved data on page load
  loadFormData();
});
