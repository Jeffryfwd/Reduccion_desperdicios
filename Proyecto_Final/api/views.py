from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny, IsAdminUser
from .models import Categoria, Productos, Promociones, Alerta, Ventas, Reporte, Usuarios, Empresa, Inventario
from .serializers import CategoriaSerializer, ProductoSerializer, PromocionesSerializer, AlertaSerializer, ReporteSerializer,  UsuarioSerializer, EmpresaSerializer, InventarioSerializer, VentaSerializers 
# Create your views here.


class CategoriaListCreate(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Categoria.objects.all()
    serializer_class= CategoriaSerializer  
    
 
###########################################################################

class PromocionesListCreate(generics.ListCreateAPIView):
    queryset= Promociones.objects.all()
    serializer_class= PromocionesSerializer
    
class PromocionesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Promociones.objects.all()
    serializer_class= PromocionesSerializer     
    
############################################################################


class AlertaListCreate(generics.ListCreateAPIView):
    queryset= Alerta.objects.all()
    serializer_class= AlertaSerializer
    

class AlertaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Alerta.objects.all()
    serializer_class= AlertaSerializer
    
##########################################################################

class VentasListCreate(generics.ListCreateAPIView):
    queryset= Ventas.objects.all()
    serializer_class= VentaSerializers

class VentasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Ventas
    serializer_class= VentaSerializers
    
##########################################################################


class ReporteListCreate(generics.ListCreateAPIView):
    queryset= Reporte.objects.all()
    serializer_class= ReporteSerializer
    
class ReporteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Reporte
    serializer_class= ReporteSerializer
    
##########################################################################


class UsuarioListCreate(generics.ListCreateAPIView):
    queryset= Usuarios.objects.all()
    serializer_class= UsuarioSerializer
    permission_classes= [AllowAny]
    
class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Usuarios.objects.all()
    serializer_class= UsuarioSerializer
    
##########################################################################


class EmpresaListCreate(generics.ListCreateAPIView):
    queryset= Empresa
    serializer_class= EmpresaSerializer
    
class EmpresaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Empresa
    serializer_class= EmpresaSerializer
    
###########################################################################

class InventarioListCreate(generics.ListCreateAPIView):
    queryset= Inventario
    serializer_class= InventarioSerializer
    
class InventarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Inventario
    serializer_class= InventarioSerializer
    
    
############################################################################
class ProductosListCreate(generics.ListCreateAPIView):
    queryset= Productos
    serializer_class= ProductoSerializer
    
class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Productos
    serializer_class= ProductoSerializer
    
    
                              
           