# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import util.util


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TestFileModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('file_field', models.ImageField(verbose_name='foo', upload_to=util.util.file_url('filez'))),
            ],
        ),
    ]
