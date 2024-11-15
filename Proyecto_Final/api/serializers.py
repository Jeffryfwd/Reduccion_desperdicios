from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Productos, Categoria, Usuarios, Empresa, Alerta, Inventario, Promociones, Ventas, Reporte, Usuarios


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Productos
        fields= '__all__'
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model= Categoria
        fields= '__all__'
        
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuarios
        fields= '__all__'
        model= User
        fields= ("first_name", "last_name" ,"username","password","is_staff") #las filas donde se van a guardar la informacion
    def create(self, validated_data): #usamos  el metodo create basicamente crea un usuario
       user= User(**validated_data) #recibe los datos cuando alguien se quiere registar
       user.set_password(validated_data['password'])#luego aca codifica la contraseña ingresada
       user.save()# y la guarda
       return user
        
class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model= Empresa
        fields= '__all__'
    
class AlertaSerializer(serializers.ModelSerializer):
    class Meta:
        model= Alerta
        fields= '__all__'
        

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Inventario
        fields='__all__'
        
class PromocionesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Promociones
        fields= '__all__'
        
class VentaSerializers(serializers.ModelSerializer):
    class Meta:
        model= Ventas 
        fields= '__all__'
        
class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model= Reporte
        fields= '__all__'                                               