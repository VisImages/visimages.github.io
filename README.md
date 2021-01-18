# resource url
The resource url is written in `src/store/APIv1.js`.
## local backend url (default):
```{json}
const url = uri => `http://localhost:5000/v1${uri}`;  //local version
```

## remote backend url:
```{json}
const url = uri => `http://3.16.54.204:4000/v1${uri}`;  //remote version
```
