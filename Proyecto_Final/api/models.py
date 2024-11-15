from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Categoria(models.Model):
    Categoria=models.CharField(max_length=100)
    
    def __str__(self):
        return self.Categoria

class Productos(models.Model):
    Nombre_producto= models.CharField(max_length=100, null=False, blank=False,)
    Categoria= models.ForeignKey(Categoria,null= False, blank=False, on_delete=models.CASCADE)
    Fecha_vencimiento= models.DateField(null=False, blank=False)
    Cantidad= models.IntegerField(null=False, blank=False)
    Precio= models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    Estado= models.CharField(max_length=100, null=False, blank=False)
    
    def __str__(self):
        return self.Nombre_producto, self.Categoria, self.Fecha_vencimiento, self.Cantidad, self.Cantidad, self.Estado
    
    
class Alerta(models.Model):
    id_producto= models.ForeignKey(Productos, on_delete=models.CASCADE)
    Fecha_alerta= models.DateField(null=False, blank=False)
    Mensaje= models.CharField(max_length=100, null=False, blank=False)
    
    def __str__(self):
        return self.id_producto, self.Fecha_alerta, self.Mensaje
    
    

    
    
class Inventario(models.Model):
    Nombre_producto= models.ForeignKey(Productos, on_delete=models.CASCADE)
    Cantidad_actual= models.IntegerField(null=False, blank=False)
    Seccion= models.CharField(max_length=100, null=False, blank=False)
    
    def __str__(self):
        return self.Nombre_producto, self.Cantidad_actual, self.Seccion
    
    
class Promociones(models.Model):
    id_producto= models.ForeignKey(Productos, on_delete=models.CASCADE)
    Descuento= models.CharField(max_length=100, null=False, blank=False)
    Fecha_inicio= models.DateField(null=False, blank=False)
    Fecha_fin= models.DateField(null=False, blank=False)
    
    def __str__(self):
        return self.id_producto, self.Descuento, self.Fecha_inicio, self.Fecha_fin
    
    
class Ventas(models.Model):
     id_producto= models.ForeignKey(Productos, on_delete=models.CASCADE)
     Cantidad_venta= models.IntegerField(null=False, blank=False)
     Fecha_venta= models.DateField(null=False, blank=False)
     Total= models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
     
     
     def __str__(self):
         return self.id_producto, self.Cantidad_venta, self.Fecha_venta, self.Total
     
     
class Reporte(models.Model):
    Fecha_reporte= models.DateField(null=False, blank=False)
    Mes_reporte= models.CharField(max_length=100, null=False, blank=False)
    Total_ventas= models.ForeignKey(Ventas, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return self.Fecha_reporte, self.Mes_reporte, self.Total_ventas
    
    
class Usuarios(models.Model):
    Usuario= models.OneToOneField(User, on_delete=models.CASCADE, null=False, blank=False)
    Email= models.EmailField(null=False, blank=False, unique=True)
    Telefono= models.IntegerField(null= False, blank=False)
    
    
    def __str__(self):
        return self.Usuario, self.Email, self.Telefono
    
    
class Empresa(models.Model):
    Nombre_empresa= models.CharField(max_length=100, null=False, blank=False, unique=False)
    Ubicacion= models.CharField(max_length=100, blank=False, null=False)
    Actividad_principal= models.CharField(max_length=100, null=False, blank=False)
    Descripcion= models.CharField(max_length=100, null=False, blank=False)
    Telefono= models.IntegerField(null=False, blank=False)
    Email_empresa= models.EmailField(null=False, blank=False)
    Fecha_fundacion= models.DateField(null=False, blank=False)
    
    
    def __str__(self):
        return self.Nombre_empresa, self.Ubicacion, self.Actividad_principal, self.Descripcion, self.Telefono, self.Email_empresa, self.Fecha_fundacion
    

    
    

        