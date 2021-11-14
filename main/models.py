from django.db import models


class User(models.Model):
    first_name = models.CharField(verbose_name='name', max_length=255)
    last_name = models.CharField(verbose_name='surname', max_length=255)

    password = models.CharField(verbose_name='password', max_length=255)
    email = models.EmailField(verbose_name='email')

    def __str__(self):
        return f'{self.email}'

