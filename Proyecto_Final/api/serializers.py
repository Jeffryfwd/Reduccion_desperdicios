from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Productos, Categoria, Usuarios, Empresa, Alerta, Inventario, Promociones, Ventas, Reporte, Usuarios
from datetime import date

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Productos
        fields = '__all__'

    def validate_Fecha_vencimiento(self, value):
        if value < date.today():
            raise serializers.ValidationError("La fecha de vencimiento no puede ser anterior a la fecha actual.")
        return value
    
    def validate_Precio(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value
    
    def validate_Cantidad(self, value):
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a 0")
        return value
    
    def validate_Nombre_producto(self, value):
        """Validar que el nombre del producto sea único dentro de la categoría."""
        # Obtener la categoría del contexto del serializador
        categoria = self.initial_data.get('Categoria')

        if Productos.objects.filter(Nombre_producto=value, Categoria=categoria).exists():
            raise serializers.ValidationError("Ya existe un producto con este nombre en esta categoría.")
        return value
   
    
        
class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model= Categoria
        fields= '__all__'
        
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields= ("first_name", "last_name" ,"username","email", "password","is_staff") #las filas donde se van a guardar la informacion
    def create(self, validated_data): #usamos  el metodo create basicamente crea un usuario
       user= User(**validated_data) #recibe los datos cuando alguien se quiere registar
       user.set_password(validated_data['password'])#luego aca codifica la contraseña ingresada
       user.save()# y la guarda
       return user
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electronico ya esta registrado.")
        return value
    def validate_password(self, value):
        if len(value)< 8:
            raise serializers.ValidationError("La contraseña debe contener minimo 8 caracteres")
        if not any(char.isdigit() for char in value ):
            raise serializers.ValidationError("La contraseña debe contener al menos un numero")
        return value
    def validate_username(self, value):
        if ' ' in value:
            raise serializers.ValidationError("El nombre de usuario no debe contener espacios")
        if not value.isalnum():
            raise serializers.ValidationError("El nombre de usuario solo puede contener letras y numeros")
        return value
        
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