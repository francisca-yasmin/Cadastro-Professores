from django.contrib import admin
from .models import Usuario, Disciplina, Sala, Ambiente
from django.contrib.auth.admin import UserAdmin

class UsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets +(
        (None, {
            "fields":(
                'tipo', 'ni', 'telefone', 'data_contratacao', 'nascimento'
            ),
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets +(
        (None, {
            "fields":(
                'tipo', 'ni', 'telefone', 'data_contratacao', 'nascimento'
            ),
        }),
    )

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Disciplina)
admin.site.register(Sala)
admin.site.register(Ambiente)

