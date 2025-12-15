/**
 * Create input-list component.
 *
 * @param {HTMLElement} componentElem
 *
 * @returns {HTMLElement}
 */
export function createComponent(componentElem: HTMLElement): HTMLElement {
  const templateElem = componentElem.querySelector<HTMLTemplateElement>(
    '.app-tmp-number-component',
  );

  if (templateElem === null) {
    throw new Error('Template .app-tmp-number-component is not found');
  }

  const inputListContainer = componentElem.querySelector<HTMLElement>(
    '.app-cmp-number-list',
  );

  if (inputListContainer === null) {
    throw new Error(
      'Input list container .app-cmp-number-list is not found within the section component.',
    );
  }

  const regenerateTitleNumbersAndStatus = (): void => {
    [
      ...inputListContainer.querySelectorAll<HTMLElement>('.app-cmp-number'),
    ].forEach((inputContainer, index, items) => {
      [
        ...inputContainer.querySelectorAll<HTMLElement>('.app-title-number'),
      ].forEach((elem) => (elem.textContent = `${index + 1}`));

      [
        ...inputContainer.querySelectorAll<HTMLButtonElement>(
          '.app-cmd-remove-number-input',
        ),
      ].forEach((elem) => (elem.disabled = items.length === 1));
    });
  };

  const recalculateResult = (): void => {
    const result: number = [
      ...inputListContainer.querySelectorAll<HTMLInputElement>(
        'input.app-inp-number',
      ),
    ].reduce(
      (result: number, elem: HTMLInputElement) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0,
    );

    [...componentElem.querySelectorAll<HTMLElement>('.app-out-number')].forEach(
      (elem) => (elem.textContent = result.toLocaleString()),
    );
  };

  const createInputComponent = (): void => {
    const inputContainer = (
      templateElem.content.cloneNode(true) as DocumentFragment
    ).firstElementChild as HTMLElement;

    inputContainer.addEventListener('click', (ev: MouseEvent) => {
      if (
        (ev.target as HTMLElement | null)?.matches(
          '.app-cmd-remove-number-input',
        ) ??
        false
      ) {
        inputContainer.remove();

        regenerateTitleNumbersAndStatus();
        recalculateResult();
      }
    });

    inputListContainer.append(inputContainer);

    regenerateTitleNumbersAndStatus();
    recalculateResult();
  };

  inputListContainer.addEventListener('change', (ev: Event) => {
    if (
      (ev.target as HTMLElement | null)?.matches('.app-inp-number') ??
      false
    ) {
      recalculateResult();
    }
  });

  componentElem.addEventListener('click', (ev: MouseEvent) => {
    if (
      (ev.target as HTMLElement | null)?.matches('.app-cmd-add-number-input')
    ) {
      createInputComponent();
    }
  });

  createInputComponent();

  return componentElem;
}
