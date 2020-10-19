

## Requirements and Delivery

| Requirement | Complete | Comments |
| --------------- | --------------- | --------------- |
| Clicking on `Add filter` should show the list of columns in a dataset | Complete | |
| Hovering on one of the columns should show the sample data for that particular column | Incomplete | I ran into limitations of not being able to make nested dropdowns with Reactstrap. I began implemeting a solution to this (in the AddFilter.tsx component) howver ran out of time to complete it so stuck with Reactstrap so as to be able to delivery a product |
| Clicking on a column should add that column as a `Default` filter with name defaulted to the sample header for that column | Complete |  |
| It should also be possible to change the type of the filter to other types | Partially complete | There is a bug where changing the value of 1 of the dropdowns will change the value of all of them, and I ran out of time to complete this requrement fully |
| Each filter must have a name | Complete | |
| Clicking on delete should remove the filter from the list | Complete | |
| It should be possible to rearrange the filters to show up in a specific order | Incomplete | Ran out of time to complete this requirement |
| Upon saving the filters, the list of filters should be displayed in an alert box showing the name and the type of each filter added in the chosen order | Incomplete | Ran out of time to complete this requirement |




## Thematic Frontend Task


This project is based off the Auth0 project created for a new project. Details on Auth0 are at the end of this file.

This sample demonstrates:
- Logging in to Auth0 using Redirect Mode
- Accessing profile information that has been provided in the ID token
- Gated content. The `/profile` route is not accessible without having first logged in
- Calling the task test backend to get information on the current-user

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run dev
```

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

### Run your tests

```bash
npm run test
```

### Lints and fixes files

```bash
npm run lint
```

## What is Auth0?

Auth0 helps you to:

- Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
- Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
- Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
- Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
- Analytics of how, when and where users are logging in.
- Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

