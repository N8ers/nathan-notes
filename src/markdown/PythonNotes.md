# py-notes

## Python notes

### Lambda Functions

```py
# Function
def add(x, y):
    return x + y

# Lambda refactor
add = lambda x, y: x + y
```

### List Comprehension

```py
numbers = [1, 3, 5]
doubled = [(num * 2) for num in numbers] # => [2, 6, 10]
```

### Dictionary Comprehension

```py
users = [(1, "Tsuki", "123"), (2, "Goon", "456")]
username_mapping = {user[1]: user for user in users}
# result => [ {"Tsuki": (1, "Tsuki", "123"), "Goon": (2, "Goon", "456") } ]
```

### OOP

```py

```

### Decorators

```py

```

### Imports

#### PIP Imports

#### Relative Imports

## Flask

- setup env
create env `python3 -m venv venv`
`export FLASK_APP=flaskr`
`export FLASK_ENV=development`
`flask run`

- run app
  `export FLASK_APP=<app entry point, like 'flaskr' or 'hello'>`
  `flask run`
- fix cors errors
  1. install `flask-cors` with `pip install flask-cors`
  1. import it `from flask_cors import CORS`
  1. add it to the project: under `app = Flask(__name__)` add `cors = CORS(app)`
     resource: https://enable-cors.org/server_flask.html
