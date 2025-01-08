from django.urls import path
from . import views 
from .views import obtener_reportes
from .views import RegistroUserRetrieve, EditarUsuarioView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    
    #path('productos/crear/', crear_producto, name='crear_producto'),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('ventas/cliente/<int:Cliente_id>/', views.VentaPorusuarioId.as_view(), name='Usuario-List'),
    
    path('usuario/', views.UsuarioListCreate.as_view(), name='Usuario-List'),
    path('usuario/<int:pk>', views.UsuarioDetail.as_view(), name='Usuario-Detail'),
    path('editar/usuario/', views.EditarUsuarioView.as_view(), name='Usuario-Detail'),
    
    path('promociones/', views.PromocionesListCreate.as_view(), name='Promociones-List'),
    path('promociones/<int:pk>', views.PromocionesDetail.as_view(), name='Promociones-Detail'),
    
    path('productos/', views.ProductosListCreate.as_view(), name='Productos-List'),
    path('productos/<int:pk>', views.ProductoDetail.as_view(), name='Productos-Detail'),
    

    path('venta/', views.VentasListCreate.as_view(), name='Venta-List'),
    path('venta/<int:pk>', views.VentasDetail.as_view(), name='Venta-Detail'),
    
    path('categoria/', views.CategoriaListCreate.as_view(), name='Categoria-List'),
    path('categoria/<int:pk>', views.CategoriaDetail.as_view(), name='Categoria-Detail'),
    
    path('registro/user/', views.Registro_userListCreate.as_view(), name='Categoria-List'),
    path('registro/user/<int:pk>/', views.RegistroUserRetrieve.as_view(), name='user-retrieve'),
    
    path('regist/user/', views.PostUserListCreate.as_view(), name='Categoria-List'),
    
    
    path('produc2/', views.ProductosApiView.as_view(), name='Categoria-List'),
    
    path('productosvenci/', views.ProductoVencimientoView.as_view(), name='Categoria-List'),
    
    path('promocionesget/', views.PromocionesApiViews.as_view(), name='Categoria-List'),
 
    path('reportes2/',obtener_reportes, name='Categoria-List'),
    
    path('rventa/', views.RegistrarVentaAPIView.as_view(), name='Cliente-List'),
    
    
]
