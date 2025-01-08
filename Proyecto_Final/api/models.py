from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from datetime import date

# Create your models here.
#Modelo Categorias
class Categoria(models.Model):
    Categoria=models.CharField(max_length=100)
    
    def __str__(self):
        return self.Categoria

#Modelo productos
class Productos(models.Model):
    Nombre_producto = models.CharField(max_length=100, null=False, blank=False)
    Imagen_Producto= models.URLField()
    Categoria = models.ForeignKey(Categoria, null=False, blank=False, on_delete=models.CASCADE)
    Fecha_vencimiento = models.DateField(null=False, blank=False)
    Cantidad = models.IntegerField()
    Precio = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    Estado = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return f"{self.Nombre_producto} - {self.Categoria} - {self.Fecha_vencimiento} - {self.Cantidad} - {self.Estado}"


#Modelo Promociones
class Promociones(models.Model):
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE)
    url_imagen= models.URLField()
    Descuento = models.CharField(max_length=100, null=False, blank=False)  # % descuento
    Fecha_inicio = models.DateField(null=False, blank=False)
    Fecha_fin = models.DateField(null=False, blank=False)
    Precio_total = models.DecimalField(max_digits=10, decimal_places=2, blank=False)  # Precio final con descuento

    def __str__(self):
        return f"{self.id_producto.Nombre_producto} - {self.Descuento}% - {self.Precio_total}"

    
   #Modelo ventas 
class Ventas(models.Model):
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE, null=True, blank=True)
    id_promociones = models.ForeignKey(Promociones, on_delete=models.CASCADE, null=True, blank=True)
    Cantidad_venta = models.IntegerField(null=False, blank=False)
    Fecha_venta = models.DateField(null=False, blank=False)
    Total = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    Cliente = models.ForeignKey(User, on_delete=models.CASCADE)
    Comprobante = models.URLField()

    def __str__(self):
        return f"{self.Cliente.first_name} - {self.id_producto.Nombre_producto}"

     
   #Modelo Usuarios  
class Usuarios(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Numero_telefono= models.CharField(max_length=100, null=False, blank=False)
    Direccion_envio= models.CharField(max_length=100, null=False, blank=False)
    

    def __str__(self):  
        return f"{self.user.username} - {self.Numero_telefono}- {self.Direccion_envio}- {self.Foto_perfil}"  # Ahora es un string.

    

        