import { createComponent as createInputListComponent } from './input-list-component.js';

const regenerateSectionTitleAndStatus = (
  sectionContainer: HTMLElement,
): void => {
  const sections = [
    ...sectionContainer.querySelectorAll<HTMLElement>('.app-cmp-section'),
  ];

  sections.forEach((section, index, items) => {
    [...section.querySelectorAll<HTMLElement>('.app-section-number')].forEach(
      (elem) => (elem.textContent = `${index + 1}`),
    );

    [
      ...section.querySelectorAll<HTMLButtonElement>('.app-cmd-remove-section'),
    ].forEach((elem) => (elem.disabled = items.length === 1));
  });
};

export default function (container: HTMLElement): HTMLElement {
  const templateElem = container.querySelector<HTMLTemplateElement>(
    '.app-tmp-section-component',
  );
  const sectionsContainer = container.querySelector<HTMLElement>(
    '.app-sections-container',
  );

  if (templateElem === null) {
    throw new Error('Template .app-tmp-section-component is not found');
  }

  if (sectionsContainer === null) {
    throw new Error('.app-sections-container is not found');
  }

  const createSectionContainer = (): void => {
    const sectionContainer = (
      templateElem.content.cloneNode(true) as DocumentFragment
    ).firstElementChild as HTMLElement;

    sectionContainer.addEventListener('click', (ev: MouseEvent) => {
      if (
        (ev.target as HTMLElement | null)?.matches('.app-cmd-remove-section') ??
        false
      ) {
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

  container.addEventListener('click', (ev: MouseEvent) => {
    if ((ev.target as HTMLElement | null)?.matches('.app-cmd-add-section')) {
      createSectionContainer();
    }
  });

  createSectionContainer();

  return container;
}
