FILE=../../allgood.txt
if test -f "$FILE"; then
    rm ../../allgood.txt;
else
    touch ../../allgood.txt
fi

git add .
git commit -m "trigger CI" && git push origin main
