from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin

from django.views.generic.base import RedirectView as rv
from django.views.static import serve as static_serve

urlpatterns = [
    url(r'^favicon\.ico$', rv.as_view(url='/static/img/favicon.ico', permanent=True)),
    url(r'account/', include('{{ cookiecutter.repo_name }}.account.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^djangojs/', include('djangojs.urls')),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'', include('{{ cookiecutter.repo_name }}.home.urls')),
]


if settings.DEBUG:
    from djangojs.views import QUnitView
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += [
        url(r'^qunit/$', QUnitView.as_view(js_files='js/tests/*.tests.js'), name='qunit_view'),
        url(r'^media/(?P<path>.*)$', static_serve, {
            'document_root': settings.MEDIA_ROOT,
        }),
   ]
