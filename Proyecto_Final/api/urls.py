from django.urls import path
from . import views 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    
    #path('productos/crear/', crear_producto, name='crear_producto'),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    
    path('usuario/', views.UsuarioListCreate.as_view(), name='Usuario-List'),
    path('usuario/<int:pk>', views.UsuarioDetail.as_view(), name='Usuario-Detail'),
    
    path('promociones/', views.PromocionesListCreate.as_view(), name='Promociones-List'),
    path('promociones/<int:pk>', views.PromocionesDetail.as_view(), name='Promociones-Detail'),
    
    path('productos/', views.ProductosListCreate.as_view(), name='Productos-List'),
    path('productos/<int:pk>', views.ProductoDetail.as_view(), name='Productos-Detail'),
    
    path('alertas/', views.AlertaListCreate.as_view(), name='Alerta-List'),
    path('alertas/<int:pk>', views.AlertaDetail.as_view(), name='Alerta-Detail'),  # Corrección aquí
    
    path('venta/', views.VentasListCreate.as_view(), name='Venta-List'),
    path('venta/<int:pk>', views.VentasDetail.as_view(), name='Venta-Detail'),
    
    path('reportes/', views.ReporteListCreate.as_view(), name='Reportes-List'),
    path('reportes/<int:pk>', views.ReporteDetail.as_view(), name='Reportes-Detail'),
    
    path('empresa/', views.EmpresaListCreate.as_view(), name='Empresa-List'),
    path('empresa/<int:pk>', views.EmpresaDetail.as_view(), name='Empresa-Detail'),
    
    path('inventario/', views.InventarioListCreate.as_view(), name='Inventario-List'),
    path('inventario/<int:pk>', views.InventarioDetail.as_view(), name='Inventario-Detail'),
    
    path('categoria/', views.CategoriaListCreate.as_view(), name='Categoria-List'),
    path('categoria/<int:pk>', views.CategoriaDetail.as_view(), name='Categoria-Detail'),
    
    path('registro/user/', views.Registro_userListCreate.as_view(), name='Categoria-List'),
    
    path('produc2/', views.ProductosApiView.as_view(), name='Categoria-List'),
    
    path('productosvenci/', views.ProductoVencimientoView.as_view(), name='Categoria-List'),
    
    
    
]
