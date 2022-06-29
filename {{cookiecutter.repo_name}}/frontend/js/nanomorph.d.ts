declare module "nanomorph" {
  interface NanomorphOptions {
    getNodeKey?: (node: Node) => any;
    onBeforeNodeAdded?: (node: Node) => Node;
    onNodeAdded?: (node: Node) => Node;
    onBeforeElUpdated?: (fromEl: HTMLElement, toEl: HTMLElement) => boolean;
    onElUpdated?: (el: HTMLElement) => void;
    onBeforeNodeDiscarded?: (node: Node) => boolean;
    onNodeDiscarded?: (node: Node) => void;
    onBeforeElChildrenUpdated?: (fromEl: HTMLElement, toEl: HTMLElement) => boolean;
    childrenOnly?: boolean;
  }

  namespace nanomorph {}

  function nanomorph(
    fromNode: Node,
    toNode: Node | Element | string,
    options?: NanomorphOptions
  ): void;

  export default nanomorph; // Added "default" here.
}
