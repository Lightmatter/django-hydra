from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from filebrowser.sites import site

urlpatterns = patterns('',
    # Examples:
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'account/', include('account.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/filebrowser/', include(site.urls)),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^admin/', include('smuggler.urls')), # put it before admin url
    url(r'^admin/', include(admin.site.urls)),
    url(r"^payments/", include("payments.urls")),
    url(r'', include('app.urls')),
)


from django.conf import settings
#TODO dev
if settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
   )
