from django.test import TestCase

from .blocks import ColumnBlock, LinkBlock, RowBlock, SpacerBlock, TitleBlock
from .models import ContentPage


class BlockTests(TestCase):
    def setUp(self):
        self.url = "https://www.google.com"
        self.string = "Hello world!"
        self.link_text = "Link me!"

    def convert_title_block(self):
        title = TitleBlock()
        title = title.to_python({"title": self.string})
        return title

    # TODO this currently won't render the link url for the streamblock tests but haven't found a good solution thus far
    def convert_link_block(self):
        page, created = ContentPage.objects.get_or_create(
            path="/", slug="123", depth=1, title="foo"
        )
        link = LinkBlock()
        # NOTE: this is a weird solution because to run to_python on link it wants a page id but not a page instance
        link = link.to_python({"link_text": self.link_text, "page_link": page.pk})
        link["page_link"] = page.pk
        return link

    def dictify_title_link(self):
        title = self.convert_title_block()
        link = self.convert_link_block()
        return [
            {"type": "title", "value": title},
            {"type": "link", "value": link},
        ]

    def dictify_column(self):
        return {"body": self.dictify_title_link()}

    def render_column_block(self):
        block = ColumnBlock()
        result = block.to_python(self.dictify_column())
        return result

    def render_row_block(self):
        block = RowBlock()
        result = block.to_python(
            {"content": [{"type": "column", "value": self.dictify_column(),}]}
        )
        return result

    def test_title_block(self):
        block = TitleBlock()
        html = block.render({"title": self.string})
        self.assertInHTML(self.string, html)

    def test_link_block(self):
        block = LinkBlock()
        html = block.render(
            {"link_text": self.link_text, "page_link": {"url": self.url}}
        )
        self.assertHTMLEqual(
            html, '<a class="" href="{}">{}</a>'.format(self.url, self.link_text)
        )

    def test_link_block__nothing_if_empty_text(self):
        block = LinkBlock()
        # no link_text should make it show nothing
        html = block.render({"page_link": {"url": self.url}})
        self.assertHTMLEqual(html, "")

    def test_spacer_block(self):
        block = SpacerBlock()
        result = block.render({"height": 10, "mobile_height": 5})
        self.assertTrue("spacer" in result)
        self.assertTrue("height:10px;" in result)
        self.assertTrue("mobile-spacer" in result)
        self.assertTrue("height:5px;" in result)

    # Stream block tests
    def test_column_block(self):
        column = self.render_column_block()
        result = column.render_as_block()
        self.assertInHTML("<h2>Hello world!</h2>", result)
        self.assertTrue("column-title" in result)
        self.assertTrue(self.string in result)
        self.assertTrue("column-title" in result)
        self.assertTrue(self.link_text in result)

    def test_row_block(self):
        row = self.render_row_block()
        result = row.render_as_block()
        self.assertInHTML("<h2>Hello world!</h2>", result)
        self.assertTrue("column-title" in result)
        self.assertTrue(self.string in result)
        self.assertTrue("column-title" in result)
        self.assertTrue(self.link_text in result)
