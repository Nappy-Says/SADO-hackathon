from ..models import *
from django.template import RequestContext
from django.shortcuts import render


def LoginController(request):
    if request.method == "GET":
        return render(request, 'login.html')

    email = request.POST.get('email')
    password = request.POST.get('password')

    user_query = User.objects.filter(email=email, password=password).first()
    if not user_query:
        return render(request, 'login.html', context={'error': 'Неправильная почта или пароль'})
    

    return render(request, 'main.html')
