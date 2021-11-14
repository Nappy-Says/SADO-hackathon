from ..models import *
from django.shortcuts import render


def Personal_area(request):
    if request.method == "GET":
        return render(request, 'html.html')

