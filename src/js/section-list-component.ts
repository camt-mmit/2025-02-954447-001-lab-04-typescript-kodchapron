import { createComponent as createInputListComponent } from './input-list-component.js';

const regenerateSectionTitleAndStatus = (sectionContainer) => {
  const sections = [
    ...sectionContainer.querySelectorAll('.app-cmp-section'),
  ];

  sections.forEach((section, index, items) => {
    [...section.querySelectorAll('.app-section-number')].forEach(
      (elem) => (elem.textContent = `${index + 1}`),
    );

    [...section.querySelectorAll('.app-cmd-remove-section')].forEach(
      (elem) => (elem.disabled = items.length === 1),
    );
  });
};

export default function (container) {
  const templateElem = container.querySelector('.app-cmp-section-list');
  const sectionsContainer = container.querySelector('.app-section-list-container');

  if (templateElem === null) {
    throw new Error('Template .app-cmp-section-list is not found');
  }

  if (sectionsContainer === null) {
    throw new Error('Container .app-section-list-container is not found');
  }

  const createSectionContainer = () => {
    const sectionContainer =
      templateElem.content.cloneNode(true).firstElementChild;

    sectionContainer.addEventListener('click', (ev) => {
      if (ev.target?.matches('.app-cmd-remove-section') ?? false) {
        if (sectionsContainer.querySelectorAll('.app-cmp-section').length > 1) {
            sectionContainer.remove();
            regenerateSectionTitleAndStatus(sectionsContainer);
        }
      }
    });

    createInputListComponent(sectionContainer);

    sectionsContainer.append(sectionContainer);

    regenerateSectionTitleAndStatus(sectionsContainer);
  };

  container.addEventListener('click', (ev) => {
    if (ev.target?.matches('.app-cmd-add-section')) {
      createSectionContainer();
    }
  });

  createSectionContainer();

  return container;
}
