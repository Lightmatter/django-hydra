from django_components import component


@component.register("menu")
class FlyoutMenu(component.Component):
    template_name = "components/menu.html"

    def get_context_data(self, button_style=None, menu_style=None):
        return {
            "button_style": button_style,
            "menu_style": menu_style,
        }
