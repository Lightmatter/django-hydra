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


class TitleBlock(StructBlock):
    title = CharBlock()

    class Meta:
        template = "blocks/title_block.html"


class LinkBlock(StructBlock):
    link_text = CharBlock(max_length=100, required=False)
    page_link = PageChooserBlock(label="Page")

    class Meta:
        template = "blocks/link_block.html"


class ColumnBlock(StructBlock):
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
        icon = "cogs"
        label = "Column"
        template = "blocks/column.html"

    def get_context(self, value, parent_context=None):
        context = super().get_context(value, parent_context=parent_context)
        context["class_name"] = self.class_name
        return context


class SpacerBlock(StructBlock):
    height = IntegerBlock(default=0)
    mobile_height = IntegerBlock(default=0)

    class Meta:
        template = "blocks/spacer.html"


class RowBlock(StructBlock):
    content = StreamBlock([("column", ColumnBlock(required=False))])

    class Meta:
        template = "blocks/row.html"
        icon = "cogs"
        label = "Row"


class SectionBlock(StructBlock):
    special_class = CharBlock(required=False)

    rows = StreamBlock([("row", RowBlock()), ("spacer", SpacerBlock()),])

    class Meta:
        template = "blocks/section.html"
        icon = "doc-empty"
        label = "Section"


class SocialBlock(StructBlock):
    url = URLBlock(help_text="Your social page URL")
    title = CharBlock()
    logo_text = TextBlock()
    image = ImageChooserBlock(required=False)
