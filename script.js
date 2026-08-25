const galleries = {
  contract: [
    { src: 'assets/gallery/contract-process.png', alt: 'Схема процесса автоматического создания договора' }
  ],
  migration: [
    { src: 'assets/gallery/migration-01_profile_collection.png', alt: 'Сбор миграционного профиля' },
    { src: 'assets/gallery/migration-02_detailed_ai_consultation.png', alt: 'Диалог с AI-консультантом' },
    { src: 'assets/gallery/migration-03_visa_recommendation.png', alt: 'Подбор визовой программы' },
    { src: 'assets/gallery/migration-04_personal_strategy.png', alt: 'Персональная стратегия релокации' }
  ],
  eplanner: [
    { src: 'assets/gallery/eplanner-01_tasks_and_progress.png', alt: 'Задачи и общий прогресс EPlanner' },
    { src: 'assets/gallery/eplanner-02_calendar.png', alt: 'Календарь EPlanner' },
    { src: 'assets/gallery/eplanner-03_focus.png', alt: 'Pomodoro в EPlanner' },
    { src: 'assets/gallery/eplanner-04_languages.png', alt: 'Языки интерфейса EPlanner' }
  ]
};

const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const count = dialog.querySelector('.lightbox-count');
let activeGallery = [];
let activeIndex = 0;

function renderLightbox() {
  const item = activeGallery[activeIndex];
  dialogImage.src = item.src;
  dialogImage.alt = item.alt;
  count.textContent = `${activeIndex + 1} / ${activeGallery.length} · ${item.alt}`;
  dialog.querySelector('.lightbox-prev').hidden = activeGallery.length < 2;
  dialog.querySelector('.lightbox-next').hidden = activeGallery.length < 2;
}

function openLightbox(items, index = 0) {
  activeGallery = items;
  activeIndex = index;
  renderLightbox();
  dialog.showModal();
  document.body.classList.add('locked');
}

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    openLightbox([{ src: button.dataset.lightbox, alt: image.alt }]);
  });
});

document.querySelectorAll('[data-gallery]').forEach((button) => {
  button.addEventListener('click', () => openLightbox(galleries[button.dataset.gallery]));
});

dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev').addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
  renderLightbox();
});
dialog.querySelector('.lightbox-next').addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % activeGallery.length;
  renderLightbox();
});
dialog.addEventListener('close', () => document.body.classList.remove('locked'));
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener('keydown', (event) => {
  if (!dialog.open) return;
  if (event.key === 'ArrowLeft') dialog.querySelector('.lightbox-prev').click();
  if (event.key === 'ArrowRight') dialog.querySelector('.lightbox-next').click();
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.getElementById('year').textContent = new Date().getFullYear();
if (window.lucide) window.lucide.createIcons();
