from django.db import models

from wagtail.admin.edit_handlers import FieldPanel, StreamFieldPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting
from wagtail.core.fields import StreamField
from wagtail.core.models import Page
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.images.models import AbstractImage, AbstractRendition, Image

from . import blocks


class CustomImage(AbstractImage):
    # Add any extra fields to image here

    # eg. To add a caption field:
    # caption = models.CharField(max_length=255, blank=True)

    admin_form_fields = Image.admin_form_fields + (
        # Then add the field names here to make them appear in the form:
        # 'caption',
    )


class CustomRendition(AbstractRendition):
    image = models.ForeignKey(
        CustomImage, on_delete=models.CASCADE, related_name="renditions"
    )

    class Meta:
        unique_together = (("image", "filter_spec", "focal_point_key"),)


@register_setting
class SocialMediaSettings(BaseSetting):
    socials = StreamField([("social", blocks.SocialBlock())], blank=True)
    default_social_image = models.ForeignKey(
        CustomImage, on_delete=models.CASCADE, null=True
    )
    default_meta_description = models.CharField(max_length=300, null=True, blank=True)

    panels = [
        FieldPanel("default_meta_description"),
        ImageChooserPanel("default_social_image"),
        StreamFieldPanel("socials"),
    ]


class BasePage(Page):
    social_image = models.ForeignKey(
        CustomImage, on_delete=models.SET_NULL, default=None, null=True, blank=True
    )
    promote_panels = Page.promote_panels + [
        ImageChooserPanel("social_image"),
    ]

    class Meta:
        abstract = True


class ContentPage(BasePage):
    body = StreamField(
        [("spacer", blocks.SpacerBlock()), ("section", blocks.SectionBlock()),],
        blank=True,
    )

    content_panels = BasePage.content_panels + [
        StreamFieldPanel("body"),
    ]
