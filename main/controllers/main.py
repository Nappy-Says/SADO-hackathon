from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect

@csrf_protect
def MainController(request):
    return render(request, 'main.html')