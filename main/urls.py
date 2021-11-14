from django.urls import path


from .controllers.main import MainController
from .controllers.database import DatabaseController
from .controllers.estimate import EstimateController
from .controllers.contribute import ContributeController
from .controllers.login import LoginController
from .controllers.personal_area import Personal_area

urlpatterns = [
    path('', MainController, name = 'Main Page'),
    path('database', DatabaseController, name = 'Database Page'),
    path('login', LoginController, name = 'Login Page'),
    path('personal_area', Personal_area, name = 'Login Page'),
    path('contribute', ContributeController, name = 'Contribute Page'),
    path('estimate', EstimateController, name = 'Estimate Page'),
]
