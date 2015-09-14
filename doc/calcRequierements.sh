#/bin/bash

if [ -s $1 ]
then
	export dir="../js/"
else
	export dir="$1"
fi

export allReq="`grep -Enro "\w+(\(|\.apply|\.call)" $dir`"
export allGroup="`cut -d: -f1 <(echo -ne \"$allReq\") | sed -r "s/.*\///" | sed -r "s/\.js//" | uniq`"

echo -ne "$allGroup" | while read line
do
	echo -e ">required for $line:"
	grep -E "$line\.js" <(echo -ne \"$allReq\")
done
