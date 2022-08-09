## Steps to deploy
1. Run build with the base href option: ng build --base-href="/prodemics/"
2. Copy the dist folder to root folder
3. Change the base href to the extra path after root. Example: "/prodemics/" if 1 wasn't run with the base-href option.
4. Copy index.html and rename the copied file 404.html. This for the paths to be handled by the Angular/React/Any Frontend router.