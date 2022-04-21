FILE="${SIMO_BASE_PATH}/allgood.txt"
if test -f "$FILE"; then
    rm "${SIMO_BASE_PATH}/allgood.txt"
else
    touch "${SIMO_BASE_PATH}/allgood.txt"
fi

git add "${SIMO_BASE_PATH}/allgood.txt"
git commit -m "trigger CI" && git push origin main
