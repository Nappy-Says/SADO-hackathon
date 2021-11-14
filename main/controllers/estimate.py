from django.shortcuts import render


def EstimateController(request):
    return render(request, 'contribute_estimate.html')