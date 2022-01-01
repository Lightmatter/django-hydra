from rest_framework import serializers
from rest_framework.fields import Field
from wagtail.api.v2.serializers import PageSerializer
from wagtail.core import fields as wagtailcore_fields
from wagtail.core.blocks import StreamBlock
from wawo.wagtailapp.blocks import ComponentStreamBlock


class StreamField(Field):
    """Override default streamfield to add our 'Component' class to
    top level blocks declared in models. By default no component gets
    returned if you declare a SectionBlock (for instance)
    in a StreamField of a model (see ContentPage).
    This will mirror what we do with our custom stream block implementation
    ComponentStructBlock and ComponentStreamBlock"""

    def to_representation(self, value):

        if isinstance(value.stream_block, StreamBlock):
            value.stream_block.__class__ = ComponentStreamBlock
        return value.stream_block.get_api_representation(value, self.context)


class CustomPageSerializer(PageSerializer):
    """Override the default StreamField base level serializer by adding it to mapping."""

    # see https://github.com/wagtail/wagtail/blob/44f3731b1cd458f1fce0dbf87507805fce5fea4f/wagtail/api/v2/serializers.py#L251 # noqa
    serializer_field_mapping = serializers.ModelSerializer.serializer_field_mapping.copy()
    serializer_field_mapping.update({wagtailcore_fields.StreamField: StreamField})
