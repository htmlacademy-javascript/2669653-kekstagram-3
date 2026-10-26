
const EFFECTS = {
  chrome: {
    filter: 'grayscale',
    units: '',
    min: 0,
    max: 1,
    step: 0.1,
    decimals: 1,
  },
  sepia: {
    filter: 'sepia',
    units: '',
    min: 0,
    max: 1,
    step: 0.1,
    decimals: 1,
  },
  marvin: {
    filter: 'invert',
    units: '%',
    min: 0,
    max: 100,
    step: 1,
    decimals: 0,
  },
  phobos: {
    filter: 'blur',
    units: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    decimals: 1,
  },
  heat: {
    filter: 'brightness',
    units: '',
    min: 1,
    max: 3,
    step: 0.1,
    decimals: 1,
  },
};

const previewImg = document.querySelector('.img-upload__preview img');
const effectLevelBlock = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.img-upload__effects');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

let currentEffect = 'none';


noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


const applyEffect = (value) => {
  const settings = EFFECTS[currentEffect];

  if (!settings) {
    previewImg.style.filter = '';
    effectLevelValue.value = '';

    return;
  }

  const number = Number(value).toFixed(settings.decimals);

  previewImg.style.filter = `${settings.filter}(${number}${settings.units})`;
  effectLevelValue.value = number;
};


effectSlider.noUiSlider.on('update', (values) => {
  applyEffect(parseFloat(values[0]));
});


const onEffectChange = (evt) => {
  if (!evt.target.matches('input[name="effect"]')) {
    return;
  }

  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    applyEffect(0);
    effectLevelBlock.classList.add('hidden');

    return;
  }

  const settings = EFFECTS[currentEffect];

  effectLevelBlock.classList.remove('hidden');

  effectSlider.noUiSlider.updateOptions({
    range: { min: settings.min, max: settings.max },
    step: settings.step,
    start: settings.max,
  });
};

effectsList.addEventListener('change', onEffectChange);


const resetEffects = () => {
  currentEffect = 'none';

  effectsList.querySelector('input[value="none"]').checked = true;

  applyEffect(0);
  effectLevelBlock.classList.add('hidden');

  effectSlider.noUiSlider.updateOptions({
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
  });
};


resetEffects();

export { resetEffects };
