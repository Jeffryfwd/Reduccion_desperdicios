from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group


from .models import Productos, Categoria, Usuarios, Empresa, Alerta, Inventario, Promociones, Ventas, Reporte, Usuarios
from datetime import date

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__' #['Categoria']
        
class ProductoSerializer(serializers.ModelSerializer):
    Categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all()) #serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all()) #CategoriaSerializer() #Obtener todos los campos del modelo categoria desde el serializer
    
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
    
    #def validate_Nombre_producto(self, value):
        """Validar que el nombre del producto sea único dentro de la categoría."""
        # Obtener la categoría del contexto del serializador
       #categoria = self.initial_data.get('Categoria')

        #if Productos.objects.filter(Nombre_producto=value, Categoria=categoria).exists():
         #   raise serializers.ValidationError("Ya existe un producto con este nombre en esta categoría.")
        #return value

class ProductoSerializer2(serializers.ModelSerializer):
    Categoria = CategoriaSerializer() #Obtener todos los campos del modelo categoria desde el serializer
    
    class Meta:
        model = Productos
        fields = '__all__'
    
        
class UsuarioSerializer(serializers.ModelSerializer):
    is_staff = serializers.BooleanField(default=False)
    class Meta:
        model= User
        fields= ("first_name", "last_name" ,"username","email", "password","is_staff") #las filas donde se van a guardar la informacion
        
    def create(self, validated_data): #usamos  el metodo create basicamente crea un usuario
        
        if validated_data['password']== 'admin123':
            validated_data['is_staff']= True    
       
        user= User(**validated_data) #recibe los datos cuando alguien se quiere registar
        user.set_password(validated_data['password'])#luego aca codifica la contraseña ingresada
        user.save()# y la guarda
        return user  
   #Funcion para actualizar los datos de usuario
    # def update(self, instance, validate_data):
    #     role= validate_data.pop('role', None)
        
    #     username= validate_data.get('username', instance.username)
    #     email= validate_data.get('email', instance.email)
    #     first_name= validate_data.get('first_name', instance.first_name)
    #     last_name= validate_data.get('last_name', instance.last_name)
    #     is_staff= validate_data.get('is_staff', instance.is_staff)
        
    #     #Si se hace una nueva contraseña nueva se encripta
    #     if 'password' in validate_data:
    #         instance.set_password(validate_data['password'])
          
    #     instance.save()
       
   
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo electronico ya esta registrado.")
        return value
    def validate_password(self, value):
        if len(value)> 8:
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
        model = Empresa
        fields = '__all__'

    def validate_Telefono(self, value):
        if len(str(value)) != 8 or not str(value).isdigit():
            raise serializers.ValidationError("El número de teléfono debe contener exactamente 8 dígitos.")
        return value

    def validate_Email_empresa(self, value):
        if "@" not in value or "." not in value:
            raise serializers.ValidationError("Debe proporcionar un correo electrónico válido.")
        return value


class AlertaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alerta
        fields = '__all__'

    def validate(self, data):
        if data.get("fecha_inicio") >= data.get("fecha_fin"):
            raise serializers.ValidationError("La fecha de inicio debe ser anterior a la fecha de fin.")
        return data


class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

    def validate_cantidad(self, value):
        if value < 0:
            raise serializers.ValidationError("La cantidad no puede ser negativa.")
        return value
    
#----------------------------------------------------------------------------------------------#   



#------------------------------------------------------------------------------------------------#

class PromocionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promociones
        fields = '__all__'

    def validate_descuento(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("El descuento debe estar entre 0 y 100.")
        return value


class VentaSerializers(serializers.ModelSerializer):
    class Meta:
        model = Ventas
        fields = '__all__'

    def validate_total(self, value):
        if value <= 0:
            raise serializers.ValidationError("El total debe ser mayor que cero.")
        return value


class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'

    def validate(self, data):
        if data.get("productos_vendidos") < 0:
            raise serializers.ValidationError("La cantidad de productos vendidos no puede ser negativa.")
        if data.get("ganancias") < 0:
            raise serializers.ValidationError("Las ganancias no pueden ser negativas.")
        return data


class RegistroUser_Empresa(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

    def validate(self, data):
        if not data.get("empresa"):
            raise serializers.ValidationError("El usuario debe estar asociado a una empresa.")
        return data
    
#---------------------------------------------------------------#

#Serializer para solo obtener los datos de promociones
class SerializerPromocionesGet(serializers.ModelSerializer):
    id_producto = ProductoSerializer() #Traigo todos los datos de Productos
    
    class Meta:
        model= Promociones
        fields= '__all__'




#---------------------------------------------------------------------#

#Tabla group

class Serializergroup(serializers.ModelSerializer):
    class Meta:
        model= Group
        fields= '__all__'
        
        
#---------------------------------#
#class Serialisergroup(serializers.ModelSerializer):
 #   class Meta:
   #     model=         
 #
 
 
 
from rest_framework import serializers
from .models import Ventas

class VentasSerializer(serializers.ModelSerializer):
 
    id_User= User()
    class Meta:
       
        model = Ventas
        fields = '__all__'  # Incluye todos los campos del modelo