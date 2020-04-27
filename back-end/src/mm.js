
var csrf = "8j7yn4tsfpdjtkjzphckfjgqbw"  ;
function search(term) { 
    return fetch("https://chat.avidcloud.io/api/v4/teams/x4udit37dbyn7eyc39ph1ee1er/posts/search", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0",
            "Accept": "*/*",
            "Accept-Language": "en",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-Token": csrf,
            "Content-Type": "text/plain;charset=UTF-8",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        "body": `{\"terms\":\"${term}\",\"include_deleted_channels\":false,\"time_zone_offset\":16200,\"page\":0,\"per_page\":20}`,
        "method": "POST",
        "mode": "cors"
    });
}

console.log('hello');

search("Type: Failed ✗").then(response => {
    console.log(response.json() ); 
}) ;