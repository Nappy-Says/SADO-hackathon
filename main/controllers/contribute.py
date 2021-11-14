from django.shortcuts import render


def ContributeController(request):
    return render(request, 'contribute_record.html')