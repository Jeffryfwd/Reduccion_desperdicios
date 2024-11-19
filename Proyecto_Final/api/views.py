from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny, IsAdminUser

from .models import Categoria, Productos, Promociones, Alerta, Ventas, Reporte, Usuarios, Empresa, Inventario
from .serializers import CategoriaSerializer, ProductoSerializer, PromocionesSerializer, AlertaSerializer, ReporteSerializer,  UsuarioSerializer, EmpresaSerializer, InventarioSerializer, VentaSerializers, RegistroUser_Empresa
# Create your views here.


class CategoriaListCreate(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes= [AllowAny]
    
    def get(self, request):
       return Response({"message": "Tienes acceso a esta vista protegida."})


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

from rest_framework import status

class UsuarioListCreate(generics.ListCreateAPIView):
    queryset= User.objects.all()
    serializer_class= UsuarioSerializer
    permission_classes= [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)  # Depuración
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= User.objects.all()
    serializer_class= UsuarioSerializer
    permission_classes= [AllowAny]
    
##########################################################################


class EmpresaListCreate(generics.ListCreateAPIView):
    queryset= Empresa.objects.all()
    serializer_class= EmpresaSerializer
    permission_classes= [AllowAny]
    
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
    queryset= Productos.objects.all()
    serializer_class = ProductoSerializer
    
    permission_classes= [AllowAny]
 
class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Productos.objects.all()
    serializer_class= ProductoSerializer
    
class Registro_userListCreate(generics.ListCreateAPIView):
    queryset= Usuarios.objects.all()
    serializer_class=  RegistroUser_Empresa 
    permission_classes= [AllowAny]
  
  