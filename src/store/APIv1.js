import paperInfo from "../metadata/visimage_paper_info.json"
import imageInfo from "../metadata/visimages_data_with_word_count.json"


var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

// const url = uri => "https://github.com/VisImages/visimages-image-data/blob/main"+`${uri}?raw=true`;  //remote version

const url = uri => process.env.PUBLIC_URL+"/image-data"+`${uri}`;  //local version in which the images are stored in the public folder

class APIv1 {

    getImages = (pids = []) => {
        const images = [];
        pids.forEach(pid => {
            if (imageInfo[pid] != undefined){
                imageInfo[pid].forEach(img => {
                    // console.log(img.iid)
                    // console.log(img);
                    let conference = undefined
                    for (const paper of paperInfo){
                        if (paper.pid == pid){
                            conference = paper.conference;
                        }
                    }
                    images.push({
                        conference: conference,
                        pid: pid,
                        url: url(`/${pid}/${img.iid}.png`),
                        ...img
                    })
                })
            }
        })
        let shuffled = images
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        return shuffled
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
        if (Object.keys(params).length === 0 || tokenizer.tokenize(params.search).length == 0){
            const pids = [];
            paperInfo.forEach(paperObj => {
                pids.push(paperObj);
            })
            return pids
        }

        const pids = [];
        ["search", "conference", "year", "authors"].forEach(key => {
            if (params[key] != undefined && key === "search"){
                const keywords = [];
                tokenizer.tokenize(params.search).forEach(word => {
                    keywords.push(natural.PorterStemmer.stem(word))
                })
                paperInfo.forEach(paperObj => {
                    const wordsStemmed = this.tokenizeAndStem(paperObj.title)

                    for (let i = 0; i < keywords.length; i++){
                        if (wordsStemmed.indexOf(keywords[i]) != -1){
                            pids.push(paperObj);
                            break
                        }
                    }
                })
            }
        })
        return pids;
    }

    getPaperConference = (pid) => {
        return paperInfo[pid].conference;
    }

    tokenizeAndStem = (text) => {
        const wordsStemmed = []
        let textProcessed = text.toLowerCase().split(" ");
        textProcessed.forEach(word => {
            if (word != "")
                wordsStemmed.push(natural.PorterStemmer.stem(word))
        })
        return wordsStemmed;
    }
}

export default APIv1;
