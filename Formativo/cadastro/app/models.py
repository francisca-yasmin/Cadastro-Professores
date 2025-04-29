from django.db import models

#modelo do professor
class Cadastro(models.Model):
    ni = models.CharField(max_length=20)
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    telefone = models.CharField(max_length=20)
    nascimento = models.CharField(max_length=20)

    def __str__(self):
        return self.nome
    
#modelo de disciplina
class Disciplinas(models.Model):
    nome = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    ch = models.IntegerField()
    professor = models.ForeignKey(Cadastro, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

#modelo para ambiente  
class Ambinente(models.Model):
    dt_inicio = models.DateField()
    dt_termino = models.DateField()
    periodos = [
        ('M', 'Manhã'),
        ('T', 'Tarde'),
        ('N', 'Noite'),
        ('I', 'Integral')
    ]
    periodo = models.CharField(max_length=30, choices=periodos, default='M')
    disciplina = models.ForeignKey(Disciplinas, on_delete=models.CASCADE)
    professor = models.ForeignKey(Cadastro, on_delete=models.CASCADE)
    

    def __str__(self):
        return self.dt_inicio
