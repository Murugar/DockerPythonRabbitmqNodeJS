var celery = require('node-celery');

// Initialize connection to rabbitmq
var client = celery.createClient({
    CELERY_BROKER_URL: 'amqp://guest:guest@rabbitMQ//',
    CELERY_ROUTES: {
        'worker.run': {
            queue: 'tasks'
        }
    },
    IGNORE_RESULT: true
});

client.on('connect', () => {
    setInterval(sendMessageToWorker, 1000);
});

client.on('error', function (err) {
    console.log(err);
});


function sendMessageToWorker() {
    const message = { hello: 'Test Message' };

    console.log('connected from nodejs');
    console.log('Producer nodejs sending : ' + message );
    var task = client.createTask("worker.run");
    task.call([message]);
}

