# query-manager
The idea is to create a simple query-only database with an HTTP interface, using nodejs and jsonql.

Use nodejs Connect or Express (or similar) to create a simple server.

Allow queries against any one of a number of a json files from a directory on the server's filesystem. For example, /myfile?query=abc might provide the answer to the "abc" field within the JSON file called "myfile".

Allow queries using the query language defined in this package: https://github.com/PencilCode/jsonql.

Return results as JSON.
