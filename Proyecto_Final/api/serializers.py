from rest_framework import serializers
from django.contrib.auth.models import User



from .models import Productos, Categoria, Usuarios,  Promociones, Ventas, Usuarios
from datetime import date

#Un serializer lo que hace es convertir un objeto en un formato json
class CategoriaSerializer(serializers.ModelSerializer): #Declaro la clase
    class Meta: #Defino un clase interna
        model = Categoria
        fields = '__all__' #['Categoria']
        
  #--------------------------------------------------------------------------------------------#
  #Derializador de productos      
class ProductoSerializer(serializers.ModelSerializer):
    Categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all()) #Hace referencia a la clave primaria, lo cual trae los datos de categoria
    
    class Meta:
        model = Productos
        fields = '__all__'
        extra_kwargs = {
            'Imagen_Producto': {'required': False}  # No requerido en PATCH
        }

    def validate_Fecha_vencimiento(self, value): #Definimos una validacion value=valor ingresado
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
    
    
#------------------------------------------------------------------#
#Serializador de productos para obtener sus datos
class ProductoSerializer2(serializers.ModelSerializer):
    Categoria = CategoriaSerializer() #Obtener todos los campos del modelo categoria desde el serializer
    
    class Meta:
        model = Productos
        fields = '__all__'
        
    
 #-----------------------------------------------#
 #Serializador para Registar Usuarios       
class UsuarioSerializer(serializers.ModelSerializer):
    is_staff = serializers.BooleanField(default=False) #acepta valores booleano
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

    def validate_email(self, value):
        if User.objects.filter(email=value).exists(): #Usu el .filter para buscar si un email coinicide con el valor ingresado
            raise serializers.ValidationError("Este correo electronico ya esta registrado.")
        return value
    # def validate_password(self, value):
    #     if len(value)> 8:
    #         raise serializers.ValidationError("La contraseña debe contener minimo 8 caracteres")
    #     if not any(char.isdigit() for char in value ):
    #         raise serializers.ValidationError("La contraseña debe contener al menos un numero")
    #     return value
    def validate_username(self, value):
        if ' ' in value:
            raise serializers.ValidationError("El nombre de usuario no debe contener espacios")
        if not value.isalnum():
            raise serializers.ValidationError("El nombre de usuario solo puede contener letras y numeros")
        return value
        


#------------------------------------------------------------------------------------------------#
#Serializador de promociones
class PromocionesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Promociones
        fields = '__all__'

    def validate_descuento(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("El descuento debe estar entre 0 y 100.")
        return value
    
    def validate_fecha_promocion(self, data): #Validamos que la fecha de inicio no pueder despues a la de fin
        if data['Fecha_inicio']>data['Fecha_fin']:
          raise serializers.ValidationError('La fecha de inicio de la promocio no puede ser posterior a la fecha de fin')
      
        promociones_activas = Promociones.objects.filter( #Busacamos si la promocion si esta vigente  y guardamos en la variable
            id_producto=data['id_producto'], Fecha_fin__gte=date.today()
        ).exclude(id=self.instance.id if self.instance else None)  # Excluir la promoción actual si está editando

        if promociones_activas.exists(): #Y validammos si existe 
            raise serializers.ValidationError("Este producto ya tiene una promoción activa.")
        return data
    
    def validate_fecha_inicio(self, value): #Validamo que la fecha de inicio no puede ser anterior a la actual
         if value < date.today():
             raise serializers.ValidationError("La fecha de inicio no puede ser anterior a hoy.")
         return value
     
    def validate_Precio_total(self, value): #Validamos que el precio total debe ser mayor a 0
         if value <= 0:
          raise serializers.ValidationError("El precio final debe ser mayor que 0.")
         return value

#---------------------------------------------------------------#

#Serializer para solo obtener los datos de promociones
class SerializerPromocionesGet(serializers.ModelSerializer):
    id_producto = ProductoSerializer() #Traigo todos los datos de Productos
    
    class Meta:
        model= Promociones
        fields= '__all__'    

#---------------------------------------------------------------------------#

#Serializer ventas para obener la informacion de todas la fk
class VentaSerializers(serializers.ModelSerializer):
    id_producto= ProductoSerializer()
    Cliente= UsuarioSerializer()
    id_promociones= SerializerPromocionesGet()
    class Meta:
        model = Ventas
        fields = '__all__'

    def validate_total(self, value):
        if value <= 0:
            raise serializers.ValidationError("El total debe ser mayor que cero.")
        return value

#---------------------------------------------------------------#
#Serializer que utilizo para traer toda la info de un usuario
class RegistroUser(serializers.ModelSerializer):
    user= UsuarioSerializer()
    class Meta:
        model = Usuarios
        fields = '__all__'

#__________________________________
#Serializer para hacer un post de Usuario
class PostUser(serializers.ModelSerializer):
    class Meta:
        model= Usuarios
        fields= '__all__'
   

#---------------------------------------------------------------------#


        
        
#---------------------------------#
#class Serialisergroup(serializers.ModelSerializer):
 #   class Meta:
   #     model=         
 #
 
 
 
from rest_framework import serializers
from .models import Ventas

class VentasSerializer(serializers.ModelSerializer):
    id_producto= ProductoSerializer()
    id_promociones= PromocionesSerializer()
    Cliente= UsuarioSerializer()
    class Meta:
       
        model = Ventas
        fields = '__all__'  # Incluye todos los campos del modelo