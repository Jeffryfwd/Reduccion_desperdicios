from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny, IsAdminUser, BasePermission

from .models import Categoria, Productos, Promociones, Alerta, Ventas, Reporte, Usuarios, Empresa, Inventario
from .serializers import CategoriaSerializer, ProductoSerializer, PromocionesSerializer, AlertaSerializer, ReporteSerializer,  UsuarioSerializer, EmpresaSerializer, InventarioSerializer, VentaSerializers, RegistroUser, ProductoSerializer2, SerializerPromocionesGet,Serializergroup,PostUser
# Create your views here.
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class CategoriaListCreate(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAdminUser]

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
    permission_classes=[AllowAny]


class VentasDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset= Ventas.objects.all()
    serializer_class= VentaSerializers
    permission_classes= [AllowAny]
    
##########################################################################
#Vista para obtener la venta mediante el id de usuario
class VentaPorusuarioId(generics.ListAPIView):
    serializer_class= VentaSerializers
    permission_classes= [AllowAny]
    
    def get_queryset(self):
        cliente_id= self.kwargs['Cliente_id']    
        return  Ventas.objects.filter(Cliente_id= cliente_id).select_related('id_producto', 'id_promociones__id_producto')
    

    
##########################################################################
#Vista para eliminar o editar


    
#-------------------------------------------------------------------#    


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
    
    
    
#-------------------------------------#
#vista para editar usuario   
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import Usuarios
import json


@method_decorator(csrf_exempt, name='dispatch')
class EditarUsuarioView(View):
    def post(self, request):
        try:
            # Obtener los datos enviados en el cuerpo de la solicitud
            data = json.loads(request.body)

            # Obtener el ID del usuario desde los datos enviados
            user_id = data.get('user_id')

            # Validar si el ID del usuario fue enviado
            if not user_id:
                return JsonResponse({'success': False, 'error': 'ID de usuario no proporcionado.'}, status=400)

            # Buscar el usuario en ambas tablas
            user = User.objects.get(id=user_id)
            usuario = Usuarios.objects.get(user=user)

            # Validar y actualizar los campos de la tabla User
            first_name = data.get('first_name', user.first_name).strip()
            email = data.get('email', user.email).strip()

            # Validaciones antes de actualizar
            if len(first_name) > 100:  # Ajusta el límite según la base de datos
                return JsonResponse({'success': False, 'error': 'El nombre no puede exceder los 100 caracteres.'}, status=400)
            if len(email) > 100:
                return JsonResponse({'success': False, 'error': 'El correo no puede exceder los 100 caracteres.'}, status=400)

            user.first_name = first_name
            user.email = email
            user.save()

            # Validar y actualizar los campos de la tabla Usuarios
            direccion_envio = data.get('Direccion_envio', usuario.Direccion_envio).strip()
            numero_telefono = data.get('Numero_telefono', usuario.Numero_telefono).strip()

            if len(direccion_envio) > 100:
                return JsonResponse({'success': False, 'error': 'La dirección no puede exceder los 100 caracteres.'}, status=400)
            if len(numero_telefono) > 15:  # Ajusta el límite según el modelo
                return JsonResponse({'success': False, 'error': 'El teléfono no puede exceder los 15 caracteres.'}, status=400)

            usuario.Direccion_envio = direccion_envio
            usuario.Numero_telefono = numero_telefono
            usuario.save()

            # Respuesta exitosa
            return JsonResponse({'success': True, 'message': 'Usuario actualizado correctamente.'})

        except User.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Usuario no encontrado.'}, status=404)

        except Usuarios.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Datos adicionales del usuario no encontrados.'}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Datos JSON inválidos.'}, status=400)

        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

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
#Creacion de Productos
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
class PostUserListCreate(generics.ListCreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class= PostUser
    permission_classes= [AllowAny]

#----------------------------------------
#Vista para editar los datos de usuario

    
    
 #___________________________________________________   
class Registro_userListCreate(generics.ListCreateAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = RegistroUser
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
class RegistroUserRetrieve(generics.RetrieveAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = RegistroUser
    permission_classes = [AllowAny]    
    
     
  
  ################################################}
#Para obtener los productos
class ProductosApiView(generics.ListAPIView):
      queryset= Productos.objects.all()
      serializer_class= ProductoSerializer2
     
      permission_classes= [AllowAny]
      
##################################################
from datetime import timedelta
from django.utils import timezone
class ProductoVencimientoView(APIView):
    
      def get(self, request):
        hoy = timezone.now()
        fecha_limite = hoy + timedelta(days=15)
        productos = Productos.objects.filter(Fecha_vencimiento__lte=fecha_limite)
        serializer = ProductoSerializer(productos, many=True)
        return Response(serializer.data)           
    
    
    
#_---------------------------------------------------------------#
class PromocionesApiViews(generics.ListAPIView):
    queryset= Promociones.objects.all()
    serializer_class= SerializerPromocionesGet
    permission_classes = [AllowAny]
    
    
#-------------------------------------------------#
class gruopListacreate(generics.ListCreateAPIView):
    queryset= Group.objects.all()
    serializer_class= Serializergroup
    permission_classes= [AllowAny]
    
    
    
#---------------------------------------------------------------#
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from decimal import Decimal
from datetime import date
from rest_framework import status
from .models import Ventas, Productos
from .serializers import VentasSerializer

class RegistrarVentaAPIView(APIView):
    queryset = Ventas.objects.all()
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        cliente_id = data.get('Cliente_id')
        carrito = data.get('carrito')
        comprobante= data.get('Comprobante')

        if not cliente_id or not carrito:
            return Response({"error": "Datos incompletos"}, status=status.HTTP_400_BAD_REQUEST)

        # Registrar cada producto del carrito como una venta
        for item in carrito:
            try:
                id_producto = item.get('id_producto')
                id_promocion = item.get('id')
                precio_total = Decimal(item.get('Precio_total', 0))
                precio_raw = item.get('Precio', 0)
                precio = Decimal(precio_raw)
                cantidad = item.get('cantidad', 1)

                if id_producto:
                    # Si es una promoción
                    producto = Productos.objects.get(id=id_producto['id'])
                    promocion = Promociones.objects.get(id_producto=producto)
                    Ventas.objects.create(
                        id_producto=None,
                        id_promociones=promocion,
                        Cantidad_venta=cantidad,
                        Fecha_venta=date.today(),
                        Total=cantidad * precio_total or cantidad * precio,
                        Cliente_id=cliente_id,
                        Comprobante= comprobante
                    )
                else:
                    # Si es un producto normal
                    producto = Productos.objects.get(id=id_promocion)
                    Ventas.objects.create(
                        id_producto=producto,
                        id_promociones=None,
                        Cantidad_venta=cantidad,
                        Fecha_venta=date.today(),
                        Total=cantidad * precio_total or cantidad * precio,
                        Cliente_id=cliente_id,
                        Comprobante= comprobante
                    )
            except Productos.DoesNotExist:
                return Response({"error": f"Producto con ID {id_promocion or id_producto} no encontrado"},
                                status=status.HTTP_404_NOT_FOUND)

        return Response({"mensaje": "Compra registrada con éxito"}, status=status.HTTP_201_CREATED)

    def get(self, request):
        ventas = Ventas.objects.all()  # Obtiene todas las ventas
        serializer = VentasSerializer(ventas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


#---------------------------------------------------------------------#
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Ventas
from datetime import datetime, timedelta
from django.db.models import Sum

@api_view(['GET'])
@permission_classes([AllowAny])  # Permitir acceso sin autenticación
def obtener_reportes(request):
    try:
        # Obtener la fecha actual
        hoy = datetime.now().date()
        
        # Rango de 15 días
        hace_15_dias = hoy - timedelta(days=15)
        ventas_15_dias = Ventas.objects.filter(Fecha_venta__range=[hace_15_dias, hoy]) \
                                       .aggregate(total=Sum('Total'))

        # Rango mensual
        inicio_mes = hoy.replace(day=1)
        ventas_mensuales = Ventas.objects.filter(Fecha_venta__range=[inicio_mes, hoy]) \
                                         .aggregate(total=Sum('Total'))

        # Retornar los reportes
        return Response({
            "ventas_15_dias": ventas_15_dias['total'] or 0,
            "ventas_mensuales": ventas_mensuales['total'] or 0
        }, status=200)
    
    except Exception as e:
        # En caso de error, retornamos un mensaje
        return Response({
            "error": str(e)
        }, status=500)



#______________________________________________________________________#
