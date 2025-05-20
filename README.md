# For Local:
Use the following commands in terminal

npm install (one time)
npm run build && npm start

# For Development:
Use the command to generate zip fle: 
- npm run build
- tar -a -f deploymentdev.zip -c build public src .cfignore .env manifest.yml package.json tsconfig.json package-lock.json README.md Staticfile
Upload the Zip file to Cloud Foundry
Ensure the Config is Uploaded as SERVICES with name "development" in Cloud Foundry

# For Production:
Use the command to generate zip fle: 
- npm run build
- tar -a -f deploymentprod.zip -c build public src .cfignore .env manifest.yml package.json tsconfig.json package-lock.json README.md Staticfile
Upload the Zip file to Cloud Foundry
Ensure the Config is Uploaded as SERVICES with name "production" in Cloud Foundry