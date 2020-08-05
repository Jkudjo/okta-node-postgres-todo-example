# Node PostgreSQL To Do Example Application

This is the companion repository for a [blog post](https://developer.okta.com/blog/2019/11/22/node-postgres-simple-webapp) on the [Okta Developer](https://developer.okta.com) website.

## Getting Started

Clone the repository by running:

```sh
git clone https://github.com/oktadeveloper/okta-node-postgres-todo-example.git
```

Restore the NPM packages:

```sh
npm install
```

### Create the Item Table

* Using your Postgres query tool of choice, connect to your Postgres developer server
* Create a new database named `todolist` (or use an existing development database)
* Create the `Item` table in the database using the following command

```sql
CREATE TABLE Item (
  id serial primary key
  , title varchar(100)
  , description text
  , isComplete boolean
);
```

### Configuration

* Copy the included `.env.sample` file to `.env`
* Update the configuration in this file to match your environment, such as your Postgres database connection
* Sign up for a [free Okta developer account](https://developer.okta.com)
* Create a new **Web** application in the Okta Developer Dashboard
* Change the port for the **Base** and **redirect** URIs to use `3000` (e.g. Login redirect URI `http://localhost:3000/authorization-code/callback`)
* Update the Okta configuration settings in the `.env` file with your Okta application's **Client Id**, **Client secret**, and **Okta Org Url** (e.g. `https://dev-123456.okta.com`)

## Run the Application

Then run the application from within the root folder with:

```sh
node index.js
```

## Getting Help

Please pose any questions about the blog post in the comments section of the blog post page.

Any questions about Okta in particular can be posted on the [Okta Developer Forum](https://devforum.okta.com/).

## License

[Apache 2.0](LICENSE)
