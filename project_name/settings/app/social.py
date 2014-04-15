SOCIAL_AUTH_PIPELINE = (
     'social.pipeline.social_auth.social_details',
     'social.pipeline.social_auth.social_uid',
     'social.pipeline.social_auth.auth_allowed',
     'social.pipeline.social_auth.social_user',
     'social.pipeline.user.get_username',
     'social.pipeline.user.create_user',
     'social.pipeline.social_auth.associate_user',
     'social.pipeline.social_auth.load_extra_data',
     'social.pipeline.user.user_details',
     'account.pipeline.save_facebook_details'
)


SOCIAL_AUTH_ENABLED_BACKENDS = ('facebook')
SOCIAL_AUTH_USER_MODEL = 'account.User'
SOCIAL_AUTH_DEFAULT_USERNAME = "new_social_auth_user"
