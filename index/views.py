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
	
	schema = data.get("https://kisan-vikas-server.herokuapp.com/household/")
	with open('static/json/household.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/farm/")
	with open('static/json/farm.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/well/")
	with open('static/json/well.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/member/")
	with open('static/json/member.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/season/")
	with open('static/json/season.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/crop/")
	with open('static/json/crop.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/storage/")
	with open('static/json/storage.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/storagephoto/")
	with open('static/json/storagephoto.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/farmphoto/")
	with open('static/json/farmphoto.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/householdphoto/")
	with open('static/json/householdphoto.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/wellphoto/")
	with open('static/json/wellphoto.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/wellvideo/")
	with open('static/json/wellvideo.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/householdvideo/")
	with open('static/json/householdvideo.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/farmvideo/")
	with open('static/json/farmvideo.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/storagevideo/")
	with open('static/json/storagevideo.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/householdaudio/")
	with open('static/json/householdaudio.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/leasefarm/")
	with open('static/json/leasefarm.json', 'w') as outfile:
		json.dump(schema, outfile)
	schema = data.get("https://kisan-vikas-server.herokuapp.com/landprice/")
	with open('static/json/landprice.json', 'w') as outfile:
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
	return render(request, 'index/new.html')

def household(request):
	return render(request, 'index/finalmap.html')	

