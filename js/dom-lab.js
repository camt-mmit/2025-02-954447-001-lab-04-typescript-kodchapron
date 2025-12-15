import createSectionListComponent from './section-list-component.js';
const body = document.querySelector('body');
if (body == null) {
    throw new Error('body not found');
}
createSectionListComponent(body);
//# sourceMappingURL=dom-lab.js.map