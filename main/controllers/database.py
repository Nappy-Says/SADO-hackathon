from django.shortcuts import render

def DatabaseController(request):
    return render(request, 'database.html')
