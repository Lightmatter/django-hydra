import { ComponentBase } from ".";

export function jsonDOMLoad(component: (data: any) => ComponentBase) {
  return function (this: any) {
    const elContent = this.$el.previousElementSibling!.textContent!;

    if (typeof elContent !== "string") {
      throw new Error("Could not read json");
    }
    const data = JSON.parse(elContent);
    return component(data);
  };
}

export default {
  jsonDOMLoad,
};
