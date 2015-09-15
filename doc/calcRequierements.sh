#/bin/bash

if [ -s $1 ]
then
	export dir="../js/"
else
	export dir="$1"
fi

# couldn't managed to do the grep query bellow, so I am going to do it in two grep command
# export allReq="`grep -Enro \"(?<!function\s+)\w+(\(|\.apply|\.call)\" $dir`"
export allReq="`grep -Enrv \"^\s*(function|//)\" $dir | grep -E \"\w+(\(|\.apply|\.call)\"`"
export allGroup="`echo -n \"$allReq\" | cut -d: -f1 | uniq | sed -r "s/.*\/js\///" | sed -r "s/\.js//"`"
export allObj="`echo -n \"$allGroup\" | wc -l`"

echo "$allGroup" | while read line
do
	echo ">required for $line:"
	grep -E "$line\.js" <(echo -n "$allReq") | uniq | cut -d: -f3 | grep -Eo "\w+(\(|\.apply|\.call)" | sed -r "s/(\(|\.apply|\.call)$//" | sed -r "s/^/\t/"
done
echo -ne "\n>On $allObj file requiring."
