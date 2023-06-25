# NYTimesStories

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

This is a simple web application that utilizes the NY Times API to display a list of most popular articles. It provides features such as categorized top news, article search and user registration/login functionality.

## Features

### Categorized Top News: 
Users can choose between two categories, "World" and "Science," to view a list of top news articles specific to each category.
### Article Search: 
Users can search for articles by entering keywords in the search input. The app provides pagination support for fetching more results as the user navigates through the pages.
### Article Details:
When clicking on an article, users can view the article details, including its abstract, web URL, snippet, lead paragraph, print section, print page, source, multimedia, headline, byline, publication date, and keywords.
### User Authentication: 
The app includes user registration and login screens that are integrated with a local server. The server can be accessed at http://localhost:8000/. User authentication is handled using JSON Web Tokens (JWT), and the token received during the login process is passed through to NY Times API requests in the Authorization JWT Bearer token header.
### Token Refresh:
A middleware is implemented to automatically refresh the token after 15 minutes or whenever it expires, ensuring a seamless user experience.

## APIs Used
NY Times Top Stories API: https://developer.nytimes.com/docs/top-stories-product/1/overview
NY Times Article Search API: https://developer.nytimes.com/docs/articlesearch-product/1/overview

## Installation and Setup
1. Clone the repository: git clone <repository_url>
2. Install dependencies: npm install
3. Set up the server: Configure the local server using the instructions provided in the https://github.com/techiediaries/fake-api-jwt-json-server. Follow the instructions in the repository's README to set up and run the server at http://localhost:8000/.
4. Obtain an NY Times API Key: Go to the NY Times Developer Portal - https://developer.nytimes.com/. Sign up for an account and create an API key. Copy the API key. Replace the API_KEY constant with your NY Times API key in constant.ts
5. Start the application: npm start
6. Open the app in your browser: http://localhost:4200

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Acknowledgments
The app was developed as a part of a coding exercise or project assignment. Special thanks to the NY Times for providing access to their API.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
