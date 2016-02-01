#!/bin/bash

value=$(curl http://stocksfirst.com/books/ | grep -o '<a href=['"'"'"][^"'"'"']*['"'"'"]'|sed -e 's/^<a href=["'"'"']//' -e 's/["'"'"']$//')
echo "all bool->$value"

for i in $value;
do
   curl -O "http://stocksfirst.com/books/$i"
done
