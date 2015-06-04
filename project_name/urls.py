from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin

from filebrowser.sites import site
from django.views.generic.base import RedirectView as rv

urlpatterns = patterns('',
    # Examples:
    url(r'^favicon\.ico$', rv.as_view(url='/static/img/favicon.ico')),
    url(r'account/', include('account.urls')),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/filebrowser/', include(site.urls)),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^djangojs/', include('djangojs.urls')),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'', include('app.urls')),
)


from django.conf import settings
#TODO dev
if settings.DEBUG:
    from djangojs.views import JasmineView, QUnitView
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += patterns('',
        url(r'^qunit/$', QUnitView.as_view(js_files='js/tests/*.tests.js'), name='qunit_view'),
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
        }),
   )
