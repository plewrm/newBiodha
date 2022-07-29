import axios from "axios";

let BASE_URL='https://bodhavajiapi.disctesting.in/api'
export const MainUrl="https://bodhavajiapi.disctesting.in"
// let BASE_URL='http://localhost/Davininfo'
// call the api (GET) endpoint internal system
export const getDataFromApi = (getUrl) => {
    getUrl = getUrl.indexOf("mocky") !== -1 ? getUrl : (getUrl.startsWith("/") ? `${BASE_URL}${getUrl}` : `${BASE_URL}/${getUrl}`);
    const resp = axios.get(getUrl)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("Error", err);
        });
    return resp;
};

// call the api (PUT) endpoint internal system
export const putDataFromApi = (putUrl, model) => {
    putUrl = putUrl.startsWith("/") ? `${BASE_URL}${putUrl}` : `${BASE_URL}/${putUrl}`;
    const resp = axios.put(putUrl, model)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("Error", err);
        });
    return resp;
};

// call the api (POST) endpoint internal system
export const  postDataFromApi = async (postUrl, model) => {
    postUrl = postUrl.startsWith("/") ? `${BASE_URL}${postUrl}` : `${BASE_URL}/${postUrl}`;
    const resp = await axios.post(postUrl, model)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        // (resp.data.message)
        console.log(err)
       
    });
    return resp;
};

// call the api (DELETE) endpoint internal system
export const deleteDataFromApi = (deleteUrl, model) => {
    deleteUrl = deleteUrl.startsWith("/") ? `${BASE_URL}${deleteUrl}` : `${BASE_URL}/${deleteUrl}`;
    const resp = axios.delete(deleteUrl, { data: model })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("Error", err);
        });
    return resp;
};

// export const orderStatuses=['pending from bm','bm approved','reject BM','ready for loading','raise concern from yard','Hold order from BM','rejected from credit team','order loaded','order delivered'];
export const orderStatuses=['BM Approval Pending','Credit Approval Pending','Rejected By BM','Waiting for Loading','Raise Concern From Yard','Hold order from BM','Rejected From Credit Team','Order Loaded','Order Completed','Draft'];