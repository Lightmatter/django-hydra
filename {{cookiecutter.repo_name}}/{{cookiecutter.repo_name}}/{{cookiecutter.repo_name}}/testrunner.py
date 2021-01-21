from django.test.runner import DiscoverRunner


class TestRunner(DiscoverRunner):
    def __init__(self, *args, **kwargs):
        tags = kwargs.get("tags")
        exclude_tags = kwargs.get("exclude_tags")
        if (tags and "integration" not in tags) or not tags:
            if not exclude_tags:
                exclude_tags = ["integration"]
            if "integration" not in exclude_tags:
                exclude_tags.append("integration")
        kwargs["exclude_tags"] = exclude_tags
        super().__init__(*args, **kwargs)
