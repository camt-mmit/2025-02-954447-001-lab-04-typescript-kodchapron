document.addEventListener("DOMContentLoaded", () => {
    const numberInputs = [
        ...document.querySelectorAll("input.app-inp-number"),
    ]; //[... แปลงเป็น Array]
    numberInputs.forEach((elem) => elem.addEventListener("change", () => {
        const result = numberInputs.reduce((result, elem) => result + (Number.isNaN(elem.valueAsNumber) ? 0 : elem.valueAsNumber), 0);
        const numberOutputs = [...document.querySelectorAll(".app-out-number")];
        numberOutputs.forEach((elem) => (elem.textContent = result.toLocaleString()));
    }));
});
export {};
//# sourceMappingURL=dom-01-simple.js.map