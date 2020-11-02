# ref-savings-widget

to run this locally:

- npm run start

Deployment instructions

- npm run build
- cd build
- aws s3 cp . s3://refdevwidget --recursive

the above s3 bucket has a cloudfront distribution pointing towards it. That's where we can have it securely served to the end user.

That in turn is what is iframed on the home page.
