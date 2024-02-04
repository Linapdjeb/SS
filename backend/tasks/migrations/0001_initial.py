# Generated by Django 4.0.6 on 2022-08-31 22:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('workspaces', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True)),
                ('category', models.CharField(max_length=200)),
                ('priority', models.CharField(choices=[('Low', 'Low'), ('Normal', 'Normal'), ('High', 'High'), ('Urgent', 'Urgent')], default='Normal', max_length=50)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('due_date', models.DateTimeField(blank=True)),
                ('is_private', models.BooleanField(default=True)),
                ('is_public', models.BooleanField(default=False)),
                ('assigned_to', models.OneToOneField(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='assigned_to', to=settings.AUTH_USER_MODEL)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Tasks', to=settings.AUTH_USER_MODEL)),
                ('workspace', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='workspaces.workspace')),
            ],
        ),
    ]