import Alpine from "alpinejs";
import { ComponentBase } from "..";
import { jsonDOMLoad } from "../util";

interface args {
  dismissible: boolean;
  showModal: boolean;
  showTitle: boolean;
}

interface Modal extends ComponentBase {
  dismissible: boolean;
  showModal: boolean;
  showTitle: boolean;
  toggleModal: () => void;
}

const modal = ({ dismissible, showModal, showTitle }: args): Modal => ({
  dismissible,
  showModal,
  showTitle,
  toggleModal() {
    if (!this.showModal) {
      this.showModal = !this.showModal;
    } else if (this.dismissible) {
      this.showModal = !this.showModal;
    }
  },
});

Alpine.data("modal", jsonDOMLoad(modal));
