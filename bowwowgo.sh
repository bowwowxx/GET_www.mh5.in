
#!/bin/bash

j=0
commandstr=$(curl $1 | grep chapterTree | awk -F\[ '{print "["$2}' | sed 's/[^a-zA-Z0-9/,]//g')

#echo "gggg->$commandstr"

IFS=","
export IFS;

for i in $commandstr;
do
    j=$(( $j+ 1 ))
    node go http://www.mh5.tw/$i $2 $j;
done
