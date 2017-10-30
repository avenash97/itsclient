# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import coreapi
import json
from django.http import Http404,HttpRequest

def index(request):
	return render(request, 'index/index.html')

def index1(request):
	data = coreapi.Client()
	schema = data.get("http://10.0.3.23:8050/household/")
	with open('itsclient/static/json/household.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/farm/")
	with open('itsclient/static/json/farm.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/well/")
	with open('itsclient/static/json/well.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/member/")
	with open('itsclient/static/json/member.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/season/")
	with open('itsclient/static/json/season.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/crop/")
	with open('itsclient/static/json/crop.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/storage/")
	with open('itsclient/static/json/storage.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/storagephoto/")
	with open('itsclient/static/json/storagephoto.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/farmphoto/")
	with open('itsclient/static/json/farmphoto.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/householdphoto/")
	with open('itsclient/static/json/householdphoto.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/wellphoto/")
	with open('itsclient/static/json/wellphoto.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/wellvideo/")
	with open('itsclient/static/json/wellvideo.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/householdvideo/")
	with open('itsclient/static/json/householdvideo.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/farmvideo/")
	with open('itsclient/static/json/farmvideo.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/storagevideo/")
	with open('itsclient/static/json/storagevideo.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("http://10.0.3.23:8050/householdaudio/")
	with open('itsclient/static/json/householdaudio.json', 'w') as outfile:
		json.dump(schema, outfile)
	return render(request, 'index/index1.html')

def technology(request):
	return render(request, 'index/technology.html')

def faq(request):
	return render(request, 'index/pricing.html')

def contactus(request):
	return render(request, 'index/contact.html')

def landlord(request):
	return render(request, 'index/landlords.html')

def wells(request):
	return render(request, 'index/wells.html')

def household(request):
	return render(request, 'index/household.html')	

