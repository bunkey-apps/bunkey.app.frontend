export default {
    get,
};

function get() {
    let data = localStorage.getItem('user_id');
    data = JSON.parse(data);
    return data.accessToken;
}