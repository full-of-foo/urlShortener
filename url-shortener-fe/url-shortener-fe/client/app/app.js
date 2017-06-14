(function() {
    var currentHash = window.location.hash.substring(1);
    var baseApiUrl = window.MASTER_URL + '/entry/';

    if(currentHash) {
        $.getJSON(baseApiUrl + currentHash, function(data) {
            const url = data.url;
            if(!url) return;

            window.location = url;
        });
    }

    $('form#url-form').submit(function(e) {
        e.preventDefault();
        const url = $('input#url-input').val();
        if(!url) return;

        $('button#url-form-btn').prop('disabled', true);
        const payload = {url: url};
        $.post(baseApiUrl, payload, function(data) {
            const shortenerHash = data.shortenerHash;
            if(!shortenerHash) return;

            const url = `${window.location.origin}/#${shortenerHash}`;
            $('p#url-success')
                .text('Short URL created! ')
                .append(`<a href="${url}">${url}</a>`)
                .removeClass('hidden');
        });
    });
})();
