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
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Categoría creada exitosamente", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear la categoría", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class CategoriaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Categoría actualizada exitosamente", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Error al actualizar la categoría", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Categoría eliminada exitosamente"}, status=status.HTTP_204_NO_CONTENT)
    
 
###########################################################################

class PromocionesListCreate(generics.ListCreateAPIView):
    queryset = Promociones.objects.all()
    serializer_class = PromocionesSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Promoción creada exitosamente", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear la promoción", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class PromocionesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Promociones.objects.all()
    serializer_class = PromocionesSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Promoción actualizada exitosamente", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Error al actualizar la promoción", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Promoción eliminada exitosamente"}, status=status.HTTP_204_NO_CONTENT)   
    
############################################################################


class AlertaListCreate(generics.ListCreateAPIView):
    queryset = Alerta.objects.all()
    serializer_class = AlertaSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Alerta creada exitosamente", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear la alerta", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class AlertaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alerta.objects.all()
    serializer_class = AlertaSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Alerta actualizada exitosamente", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Error al actualizar la alerta", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Alerta eliminada exitosamente"}, status=status.HTTP_204_NO_CONTENT)
    
##########################################################################

class VentasListCreate(generics.ListCreateAPIView):
    queryset= Ventas.objects.all()
    serializer_class= VentaSerializers
    def post(self, request, *args, **kwargs):
        serializer= self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "La venta fue creada exitosamente",
                    "data": serializer.data,
                    
                },
                status=status.HTTP_201_CREATED
                
                
            )
        print(serializer.erros)   
        return Response(
            {
                "message": "Ocurrio un error al crear la venta",
                "data": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST
        ) 

class VentasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Ventas
    serializer_class= VentaSerializers
    
##########################################################################


class ReporteListCreate(generics.ListCreateAPIView):
    queryset= Reporte.objects.all()
    serializer_class= ReporteSerializer
def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    if serializer.is_valid():  
        serializer.save()
        return Response(
            {
               "message": "Reporte creado existosamente",
               "data": serializer.data,
            },
             status=status.HTTP_201_CREATED
            
            )
    print(serializer.errors)  
    return Response(
        {
            "message": "Hubo un error al crear el reporte",
            "data": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
        
        )

        
    
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
        print(serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class UsuarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= User.objects.all()
    serializer_class= UsuarioSerializer
    permission_classes= [AllowAny]
    
##########################################################################


class EmpresaListCreate(generics.ListCreateAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Empresa creada exitosamente", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear la empresa", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class EmpresaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Empresa actualizada exitosamente", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Error al actualizar la empresa", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Empresa eliminada exitosamente"}, status=status.HTTP_204_NO_CONTENT)
    
###########################################################################

class InventarioListCreate(generics.ListCreateAPIView):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer
    permission_classes= [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Inventario creado exitosamente", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear el inventario", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class InventarioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Inventario actualizado exitosamente", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Error al actualizar el inventario", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Inventario eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)
    
    
############################################################################
class ProductosListCreate(generics.ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Producto creado exitosamente", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al crear el producto", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
        


class ProductoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Producto actualizado exitosamente", "data": serializer.data},
                status=status.HTTP_200_OK
            )
        return Response(
            {"message": "Error al actualizar el producto", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"message": "Producto eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)
    
###########################################################################    
    
class Registro_userListCreate(generics.ListCreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = RegistroUser_Empresa
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Usuario registrado exitosamente", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"message": "Error al registrar el usuario", "data": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
  
  