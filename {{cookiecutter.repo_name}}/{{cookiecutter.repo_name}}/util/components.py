from uuid import uuid4

from django_components import component


class ComponentBase(component.Component):
    def __init__(self, component_name):
        self.uuid = uuid4()
        super().__init__(component_name)


@component.register("flyout")
class FlyoutMenu(ComponentBase):
    template_name = "components/flyout.html"

    def get_context_data(self, button_style=None, menu_style=None):
        return {
            "button_style": button_style,
            "menu_style": menu_style,
        }


@component.register("modal")
class Modal(ComponentBase):
    template_name = "components/modal.html"

    def get_context_data(self, dismissible=True, show_modal=False, show_title=True):
        return {
            "data": {
                "dismissible": dismissible,
                "showModal": show_modal,
                "showTitle": show_title,
            }
        }
