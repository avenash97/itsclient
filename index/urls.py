from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^rest', views.index, name='index'),
    url(r'^$', views.index1, name='index1'),
    url(r'^technology', views.technology, name='technology'),
    url(r'^faq', views.faq, name='faq'),
    url(r'^contactus', views.contactus, name='contactus'),
    url(r'^landlord/', views.landlord, name='landlord'),
    url(r'^wells/', views.wells, name='wells'),
    url(r'^household/', views.household, name='household'),    
]
