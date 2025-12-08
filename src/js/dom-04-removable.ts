/**
 * Create input-list component.
 *
 * @param {HTMLElement} componentElem
 *
 * @returns {HTMLElement}
 */
function createInputListComponent(componentElem: HTMLElement) {
  const templateElem = componentElem.querySelector<HTMLTemplateElement>(
    '.app-tmp-number-component',
  );

  if (templateElem === null) {
    throw new Error('Template .app-tmp-number-component is not found');
  }

  const inputListContainer = templateElem.parentElement;

  if (inputListContainer === null) {
    throw new Error('Template .app-tmp-number-component does not have parent');
  }

  const regenerateTitleNumbersAndStatus = () => {
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

  const recalculateResult = () => {
    const result = [
      ...inputListContainer.querySelectorAll<HTMLInputElement>(
        'input.app-inp-number',
      ),
    ].reduce(
      (result, elem) =>
        result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber),
      0,
    );

    [...componentElem.querySelectorAll('.app-out-number')].forEach(
      (elem) => (elem.textContent = result.toLocaleString()),
    );
  };

  const createInputComponent = () => {
    const inputContainer = (
      templateElem.content.cloneNode(true) as DocumentFragment
    ).firstElementChild as HTMLElement;

    inputContainer.addEventListener('click', (ev) => {
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

  inputListContainer.addEventListener('change', (ev) => {
    if (
      (ev.target as HTMLElement | null)?.matches('.app-inp-number') ??
      false
    ) {
      recalculateResult();
    }
  });

  componentElem.addEventListener('click', (ev) => {
    if (
      (ev.target as HTMLElement | null)?.matches('.app-cmd-add-number-input')
    ) {
      createInputComponent();
    }
  });

  createInputComponent();

  return componentElem;
}

document.addEventListener('DOMContentLoaded', () => {
  const elem = document.querySelector<HTMLBodyElement>('body');

  if (elem == null) {
    throw new Error('body not found');
  }
  createInputListComponent(elem);
});
