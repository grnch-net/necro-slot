let utils = (function () {

    let serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';

    function request(name, path) {
        console.log(`Full path of request is: ${serviceUrl}${name}${path}`);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `${serviceUrl}${name}${path}`,
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function getData(data) {
        if (typeof data !== 'undefined') {
            return data;
        } else {
            throw new Error('Data is undefined!');
        }
    }

    return {
        request,
        getData
    };
})();
