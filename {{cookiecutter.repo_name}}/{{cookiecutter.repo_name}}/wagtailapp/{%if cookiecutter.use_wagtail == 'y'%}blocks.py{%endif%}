from wagtail.core.blocks import (
    CharBlock,
    IntegerBlock,
    PageChooserBlock,
    RichTextBlock,
    StreamBlock,
    StructBlock,
    TextBlock,
    URLBlock,
)
from wagtail.images.blocks import ImageChooserBlock


class ComponentStreamBlock(StreamBlock):
    def get_api_representation(self, value, context=None):
        if value is None:
            # treat None as identical to an empty stream
            return []

        representation = []
        for child in value:  # child is a StreamChild instance
            child_data = {
                "type": child.block.name,
                "value": child.block.get_api_representation(
                    child.value, context=context
                ),
                "id": child.id,
                "component": getattr(child.block.meta, "component", ""),
            }
            representation.append(child_data)
        return representation


class ComponentStructBlock(StructBlock):
    def get_api_representation(self, value, context=None):
        """ Recursively call get_api_representation on children and return as a plain dict """
        representation = []
        for name, val in value.items():
            if isinstance(self.child_blocks[name], StreamBlock):
                self.child_blocks[name].__class__ = ComponentStreamBlock
            representation.append(
                (
                    name,
                    self.child_blocks[name].get_api_representation(
                        val, context=context
                    ),
                )
            )
        return dict(representation)


class TitleBlock(ComponentStructBlock):
    title = CharBlock()

    class Meta:
        component = "Title"
        template = "blocks/title_block.html"


class LinkBlock(ComponentStructBlock):
    link_text = CharBlock(max_length=100, required=False)
    page_link = PageChooserBlock(label="Page")

    class Meta:
        component = "Link"
        template = "blocks/link_block.html"


class ColumnBlock(ComponentStructBlock):
    class_name = "column"
    body = StreamBlock(
        [
            ("title", TitleBlock(required=False)),
            ("text", RichTextBlock(required=False)),
            ("image", ImageChooserBlock(required=False)),
            ("link", LinkBlock(required=False)),
        ]
    )

    class Meta:
        component = "Column"
        icon = "cogs"
        label = "Column"
        template = "blocks/column.html"

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        context["class_name"] = self.class_name
        return context


class SpacerBlock(ComponentStructBlock):
    height = IntegerBlock(default=0)
    mobile_height = IntegerBlock(default=0)

    class Meta:
        component = "Spacer"
        template = "blocks/spacer.html"


class RowBlock(ComponentStructBlock):
    content = StreamBlock([("column", ColumnBlock(required=False))])

    class Meta:
        component = "Row"
        template = "blocks/row.html"
        icon = "cogs"
        label = "Row"


class SectionBlock(ComponentStructBlock):
    special_class = CharBlock(required=False)

    rows = StreamBlock([("row", RowBlock()), ("spacer", SpacerBlock()),])

    class Meta:
        component = "Section"
        template = "blocks/section.html"
        icon = "doc-empty"
        label = "Section"


class SocialBlock(ComponentStructBlock):
    url = URLBlock(help_text="Your social page URL")
    title = CharBlock()
    logo_text = TextBlock()
    image = ImageChooserBlock(required=False)
