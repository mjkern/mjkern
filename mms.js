var domain = 'https://view-awesome-table.com/';

function comsInit() {
    setTimeout(function() {
    
        if (document.querySelectorAll('iframe[data-type="AwesomeTableView"]').length < 1) {
            console.log("too soon");
            comsInit();
            return;
        }
        
        console.log("logging works at least");
        console.log(document.getElementById('sandboxFrame'));
        console.log(document.getElementById('userHtmlFrame'));
        console.log(document.querySelectorAll('iframe[data-type="AwesomeTableView"]')[0]);
        console.log(document.getElementById('dashboard'));
        
        iframe = document.querySelectorAll('iframe[data-type="AwesomeTableView"]')[0].contentWindow;

        
        //listen to holla back
        var gotResponse = false;
        window.addEventListener('message',function(event) {
            if(event.origin !== 'https://view-awesome-table.com') return;
            if(event.data.type !== 'initResponse') {
                console.log("bad response");
                return;
            }
            console.log('received response:  ',event.data);
            console.log(event.origin);
            gotResponse=true;
        },false);

        function sendInitialMessage(iframe) {
            var body = 'Hello!  The time is: ' + (new Date().getTime());
            var message = {
                "type": "initMessage",
                "body": body
            }
            console.log('blog.local:  sending message: ' + 'message');
            iframe.postMessage(message,domain); //send the message and target URI
            setTimeout(function () {
                if (!gotResponse) {
                    sendInitialMessage(iframe);
                }
            }, 1000);
        }

        // initial message
        sendInitialMessage(iframe);

    }, 10);
    
}
comsInit();

google.script.run
    .withSuccessHandler(function (accessibleLinkData) {
        console.log(accessibleLinkData);
    })
    .withFailureHandler(function (error) {
        console.log(error);
    })
    .accessibleEditLinks();