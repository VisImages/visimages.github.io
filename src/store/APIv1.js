// const url = uri => `http://3.16.54.204:4000/v1${uri}`;//remote version
const url = uri => `http://localhost:5000/v1${uri}`;  //local version

class APIv1 {
    getPapers = (params = {}, cb = null) => {
        const args = [];
        ['search', 'conference', 'authors', 'year'].forEach(key => {
            if (!!params[key]) args.push(`s=${params[key].join(',')}`);
        })
        const req = new Request(url(`/papers${args.length > 0 ? `?${args.join('&')}` : ''}`));
        this.fetch(req, cb);
    }

    getImages = (pids = [], cb = null) => {
        const req = new Request(url('/images/collection'), {
            method: 'POST',
            body: JSON.stringify(pids),
        })
        this.fetch(req, cb)
    }

    getBBox = (pid, iid, cb = null) => {
        const req = new Request(url(`/bbox/${pid}/${iid}`));
        this.fetch(req, cb);
    }

    fetch = (req, cb) => {
        fetch(req)
          .then(res => res.json())
          .then(res => {
              if (cb instanceof Function) cb(res);
          })
          .catch(e => console.error(e));
    }
}

export default APIv1;
