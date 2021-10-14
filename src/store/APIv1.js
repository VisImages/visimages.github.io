import paperInfo from "../metadata/visimage_paper_info.json"
import imageInfo from "../metadata/visimages_data_with_word_count.json"

const url = uri => process.env.PUBLIC_URL+`${uri}`; 

class APIv1 {
    getPapers = (params = {}, cb = null) => {
        console.log(params)
        const args = [];
        ['search', 'conference', 'authors', 'year'].forEach(key => {
            if (!!params[key]) args.push(`s=${params[key].join(',')}`);
        })
        const req = new Request(url(`/papers${args.length > 0 ? `?${args.join('&')}` : ''}`));
        this.fetch(req, cb);
    }

    getImages = (pids = []) => {
        const images = [];
        pids.forEach(pid => {
            if (imageInfo[pid] != undefined){
                imageInfo[pid].forEach(img => {
                    // console.log(img.iid)
                    // console.log(img);
                    images.push({
                        pid: pid,
                        url: url(`/image-data/${pid}/${img.iid}.png`),
                        ...img
                    })
                })
            }
        })
        return images
    }

    getBBox = (pid, iid) => {
        // const req = new Request(url(`/bbox/${pid}/${iid}`));
        // this.fetch(req, cb);
        const visualizations = []
        imageInfo[pid].forEach(img => {
            if (img.iid === iid){
                Object.keys(img.visualization_bbox).forEach(visType => {
                    img.visualization_bbox[visType].forEach((box, idx) => {
                        visualizations.push({
                            visType: visType,
                            box: box,
                            idx: idx + 1,
                            visibility: "visible"
                        })
                    })
                })
            }
        })

        return visualizations
    }

    fetch = (req, cb) => {
        fetch(req)
          .then(res => res.json())
          .then(res => {
              if (cb instanceof Function) cb(res);
          })
          .catch(e => console.error(e));
    }

    filterPapersByCondition = (params) => {
        console.log(params)
        if (Object.keys(params).length === 0){
            const pids = [];
            paperInfo.forEach(paperObj => {
                pids.push(paperObj)
            })
            return pids
        }

        ['search', 'conference', 'authors', 'year'].forEach(key => {
            if (!!params[key]){
                const pids = [];
                if (key == 'search'){
                    if (params[key] == "")
                    paperInfo.forEach(paperObj => {
                        pids.push(paperObj) 
                    })
                }
            }
        })
    }

}

export default APIv1;
