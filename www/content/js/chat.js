

var newConversationCell = function (options) {
    var perDefault = {
        name: 'Undefined',
        date: 'Undefined',
        extract: 'Undefined',
        image: '/content/img/user-astronaut.jpg',
        id: 0
    },
        config = $.extend({}, perDefault, options);

    return $(document.createElement('div'))
        .addClass('list-group-item list-group-item-action p-2')
        .attr('href', '/chat/' + config.id)
        .append(
            $(document.createElement('div'))
            .addClass('form-row align-items-center')
            .append(
                $(document.createElement('div'))
                    .addClass('col-auto')
                    .append(
                        $(document.createElement('img'))
                            .addClass('rounded-circle border')
                            .css('height', 48)
                            .attr('src', config.image)
                    ),
                $(document.createElement('div'))
                    .addClass('col')
                    .append(
                        $(document.createElement('div'))
                            .addClass('form-row justify-content-between')
                            .append(
                                $(document.createElement('div'))
                                    .addClass('col-auto')
                                    .text(config.name),
                                $(document.createElement('div'))
                                    .addClass('col-auto')
                                    .append(
                                        $(document.createElement('small'))
                                            .addClass('text-muted')
                                            .text(config.date)
                                    )
                            ),
                        $(document.createElement('span'))
                            .addClass('text-muted text-truncate')
                            .text(config.extract)
                    )
            )
        )
    },
    addConversationCell = function (options) {
        var list = $('#conversation-list');
        
        if (list !== 'undefinde') {
            list.append(newConversationCell(options));
            return true;
        }
        
        return false;
    }

var i;
for (i = 0; i < 5; i++) {
    addConversationCell();
}

var conn = new WebSocket('ws://localhost:8080');
conn.onopen = function(e) {
    console.log("Connection established!");
};

conn.onmessage = function(e) {
    console.log(e.data);
};

function subscribe(channel) {
    conn.send(JSON.stringify({command: "subscribe", channel: channel}));
}

function sendMessage(msg) {
    conn.send(JSON.stringify({command: "message", message: msg}));
}

$(function () {
    $('#chat-container').css('top', $('#main-navbar').outerHeight()).css('left', 0).css('right', 0).css('bottom', 0);
    $('#conversation-list').addClass('position-absolute')
        .css('top', ($('#conversation-navbar').outerHeight()))
        .css('left', 0)
        .css('right', 1)
        .css('bottom', 1);
    subscribe('test');
});
