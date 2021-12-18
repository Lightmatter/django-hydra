from django_components import component


@component.register("button")
class Button(component.Component):
    template_name = "components/button.html"

    def get_context_data(self, **kwargs):
        return {**kwargs}
