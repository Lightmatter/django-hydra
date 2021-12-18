from django_components import component


@component.register("form_field")
class FormField(component.Component):
    template_name = "components/form_field.html"

    def get_context_data(self, **kwargs):
        return {**kwargs}
