# before hand you need to run git init, git remote add origin <github page repo>,
# and git branch gh-pages in the directory. Also set git config to your name.
# run prepare_deploy.sh to achieve this

echo "Starting..."
echo "Warning, every run we are replacing the contents of the directory gh_pages"
grunt build
mkdir -p gh_pages #make dir if doesn't exist
cd gh_pages
git init
git checkout gh-pages # gives pathspec warning (git tries to checkout the file?)
git pull origin gh-pages
ls|grep -v .git|xargs rm -r #clear out folder contents except for .git folder
cd ..
cp -r dist/. gh_pages
cp CNAME gh_pages
cd gh_pages
git add .
git add -u #adds untracked changes
DATE=$(date -u) #utc date, cannot have spaces next to equals operator
git commit -m "Site updated at $DATE"
git push origin gh-pages --force
echo "Done!"