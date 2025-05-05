from django.db import models
from django.contrib.auth.models import AbstractUser

#modelo do professor e/ou gestor -> usuario
class Usuario(AbstractUser):
    TIPO_CHOICES = [
        ('G', 'Gestor'),
        ('P', 'Professor')
    ]
    tipo = models.CharField(max_length=1, choices=TIPO_CHOICES, default='P')

    ni = models.IntegerField()
    telefone = models.CharField(max_length=20, blank=True, null=True)
    nascimento = models.DateField(blank=True, null=True)
    data_contratacao = models.DateField()

    REQUIRED_FIELDS = ['ni', 'data_contratacao']

    def __str__(self):
        return f'{self.username} ({self.get_tipo_display()})' #funcao que pega a palavra não o valor (dicionario)
    
#modelo de disciplina
class Disciplina(models.Model):
    nome = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    ch = models.IntegerField()
    desc = models.TextField(blank=True, null=True)
    # SET_NULL -> uma disciplina pode não pertencer a nenhum professor
    professor = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, limit_choices_to={'tipo':'P'}) #chave estrangeira da tabela usuario

    def __str__(self):
        return self.nome

# modelo para o cadastro de salas
class Sala(models.Model):
    nome = models.CharField(max_length=100)
    capacidade = models.IntegerField()

    def __str__(self):
        return self.nome

#modelo para ambiente  
class Ambiente(models.Model):
    dt_inicio = models.DateField()
    dt_termino = models.DateField()
    PERIODO = [
        ('M', 'Manhã'),
        ('T', 'Tarde'),
        ('N', 'Noite'),
        ('I', 'Integral')
    ]
    periodo = models.CharField(max_length=1, choices=PERIODO, default='M')
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
    professor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    reserva = models.ForeignKey(Sala, on_delete=models.CASCADE)
    professor = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'tipo': 'P'}) #chave estrangeira da tabela professor
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.reserva} - {self.get_periodo_display()}, Do dia {self.dt_inicio} até {self.dt_termino}'

    

    def __str__(self):
        return self.dt_inicio
    

