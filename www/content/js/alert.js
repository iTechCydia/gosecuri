function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function addAlert(value, text, call = function () {}) {
    console.log(text);
    if (!$('#notifier').length) {
        var notifier = $(document.createElement('div'));
        
        notifier
            .addClass('position-fixed')
            .css('top', $('#main-navbar').outerHeight())
            .css('right', 0)
            .attr('id', 'notifier');
        
        $('body').append(notifier);
    }
    
    var alertContainer = $(document.createElement('div')),
        alert = $(document.createElement('div')),
        closeBtn = $(document.createElement('button')),
        closeSpan = $(document.createElement('span'));
    
    alertContainer
        .addClass('mt-2 px-3 ml-auto');

    alert
        .addClass('alert alert-' + value + ' alert-dismissable fade shadow d-flex')
        .css('max-width', 400)
        .html('<span>' + (text).replace(/\+/g, ' ') + '</span>');

    closeBtn
        .addClass('close ml-2');

    closeSpan
        .attr('aria-hidden', 'true')
        .html('&times;')
        .attr({'data-dismiss': 'alert', 'aria-label': 'Close'});
    
    closeBtn.append(closeSpan);
    alert.append(closeBtn);
    alertContainer.append(alert);
    $('#notifier').append(alertContainer);
    alertContainer.css('height', alert.outerHeight());
    alertContainer.width(alert.outerWidth());

    setTimeout(function () {
        alert.addClass('show');
    }, 200);

    alert.on('closed.bs.alert', function () {
        alertContainer.animate({
            height: ["toggle", 'swing']
        }, 200);
        setTimeout(function () {
            alertContainer.remove();
        }, 300);
        call();
    })
}

$(function () {
    if (getCookie('alert') != '') {
        var cookieAlert = JSON.parse(getCookie('alert'));
        addAlert(cookieAlert.value, cookieAlert.text, function () {
            setCookie('alert', null, -1);
        });
    }
    if (getCookie('user.accept.cookie') == '') {
        addAlert('primary', 'En continuant votre navigation ce site web vous acceptez l\'utilisation de cookies.', function () {
            setCookie('user.accept.cookie', true, 365);
        })
    }
})