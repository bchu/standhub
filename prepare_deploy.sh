echo "Preparing deploy folder..."
mkdir -p gh_pages
cd gh_pages
git init
git config user.name "Brian Chu"
git config user.email bc@brianchu.com
git remote add origin https://github.com/bchu/standhub.git
git remote set-url origin https://github.com/bchu/standhub.git
git checkout -b gh-pages
git pull origin gh-pages
cd ..
echo "Done!"
