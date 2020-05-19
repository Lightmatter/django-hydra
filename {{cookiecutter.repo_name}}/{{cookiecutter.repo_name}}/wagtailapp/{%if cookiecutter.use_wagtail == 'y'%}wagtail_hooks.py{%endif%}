from wagtail.core import hooks


@hooks.register("register_rich_text_features")
def register_headings_feature(features):
    h2_pos = features.default_features.index("h2")
    features.default_features.insert(h2_pos, "h1")
    h4_pos = features.default_features.index("h4")
    features.default_features.insert(h4_pos + 1, "h5")
