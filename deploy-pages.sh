#!/usr/bin/env bash
# Збирає сайт і викладає його в гілку gh-pages (GitHub Pages).
# Запуск із кореня Design-Amazon: bash deploy-pages.sh
set -euo pipefail

OUT="$(mktemp -d)"
npx quartz build -o "$OUT"
touch "$OUT/.nojekyll"

cd "$OUT"
git init -q -b gh-pages
git add -A
git commit -q -m "Збірка сайту $(date '+%Y-%m-%d %H:%M')"
git push -q -f https://github.com/AmzProfessional/design-amazon.git gh-pages
rm -rf "$OUT"

echo "Готово: https://amzprofessional.github.io/design-amazon/ (оновиться за 1–2 хв)"
