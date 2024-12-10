from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from datetime import date

# Create your models here.
class Categoria(models.Model):
    Categoria=models.CharField(max_length=100)
    
    def __str__(self):
        return self.Categoria

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

class Alerta(models.Model):
    id_producto= models.ForeignKey(Productos, on_delete=models.CASCADE)
    Fecha_alerta= models.DateField(null=False, blank=False)
    Mensaje= models.CharField(max_length=100, null=False, blank=False)
    
    def __str__(self):
        return self.id_producto, self.Fecha_alerta, self.Mensaje
    
    

    
    
class Inventario(models.Model):
    Nombre_producto = models.ForeignKey(Productos, on_delete=models.CASCADE)
    Cantidad_actual = models.IntegerField(null=False, blank=False)
    Seccion = models.CharField(max_length=100, null=False, blank=False)
    
    def __str__(self):
        return f"{self.Nombre_producto} - {self.Cantidad_actual} - {self.Seccion}"
    
  
  

    
    
class Promociones(models.Model):
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE)
    url_imagen= models.URLField()
    Descuento = models.CharField(max_length=100, null=False, blank=False)  # % descuento
    Fecha_inicio = models.DateField(null=False, blank=False)
    Fecha_fin = models.DateField(null=False, blank=False)
    Precio_total = models.DecimalField(max_digits=10, decimal_places=2, blank=False)  # Precio final con descuento

    def __str__(self):
        return f"{self.id_producto.Nombre_producto} - {self.Descuento}% - {self.Precio_total}"

    
    
class Ventas(models.Model):
    id_producto = models.ForeignKey(Productos, on_delete=models.CASCADE)
    id_promociones = models.ForeignKey(Promociones, on_delete=models.SET_NULL, null=True, blank=True)
    Cantidad_venta = models.IntegerField(null=False, blank=False)
    Fecha_venta = models.DateField(null=False, blank=False)
    Total = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    Cliente = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.Cliente.first_name} - {self.id_producto.Nombre_producto}"

     
     
     
class Reporte(models.Model):
    Fecha_reporte= models.DateField(null=False, blank=False)
    Mes_reporte= models.CharField(max_length=100, null=False, blank=False)
    Total_ventas= models.ForeignKey(Ventas, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return self.Fecha_reporte, self.Mes_reporte, self.Total_ventas
    
    

    
    
class Empresa(models.Model):
    Nombre_empresa = models.CharField(max_length=100, null=False, blank=False, unique=False)
    Ubicacion = models.CharField(max_length=100, blank=False, null=False)
    Actividad_principal = models.CharField(max_length=100, null=False, blank=False)
    Descripcion = models.CharField(max_length=100, null=False, blank=False)
    Telefono = models.IntegerField(null=False, blank=False)
    Email_empresa = models.EmailField(null=False, blank=False)
    Fecha_fundacion = models.DateField(null=False, blank=False)
    
    def __str__(self):
        # Formatea una cadena con la información más relevante
        return f"{self.Nombre_empresa} - {self.Ubicacion} ({self.Actividad_principal})"


class Usuarios(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)

    def __str__(self):  
        return f"{self.user.username} - {self.empresa.Nombre_empresa}"  # Ahora es un string.

    

        