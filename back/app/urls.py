from django.urls import path
from .views import LoginView, UsuarioListCreate, UsuarioRetrieveUpdateDestroy, AmbienteListCreate, AmbienteRetrieveUpdateDestroy, AmbienteProfessorList, DisciplinaListCreate, DisciplinaRetrieveUpdateDestroy, DisciplinaProfessorList, SalaListCreate, SalaRetrieveUpdateDestroy

urlpatterns = [
    path('login/', LoginView.as_view()),   #url de  login

    #urls de usuario
    path('usuario/', UsuarioListCreate.as_view()),    
    path('usuario/<int:pk>/', UsuarioRetrieveUpdateDestroy.as_view()),

    #urls de ambiente
    path('ambiente/', AmbienteListCreate.as_view()), 
    path('ambiente/<int:pk>/', AmbienteRetrieveUpdateDestroy.as_view()),
    path('professor/ambiente/', AmbienteProfessorList.as_view()), #get -> pegar os ambientes do professor que esta fazendo a requisicao

    #disciplina
    path('disciplinas/', DisciplinaListCreate.as_view()),
    path('disciplinas/<int:pk>', DisciplinaRetrieveUpdateDestroy.as_view()),
    path('professor/disciplinas/', DisciplinaProfessorList.as_view()),

    #salas
    path('sala/', SalaListCreate.as_view()),
    path('sala/<int:pk>/', SalaRetrieveUpdateDestroy.as_view()),
]