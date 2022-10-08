var express = require('express');
var app = express();
var cors = require('cors')

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));

const SSE_RESPONSE_HEADER = {
  'Connection': 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
};

app.get('/sse', (req, res) => {

  res.type('notifications')

  let intervalId = setInterval(() => {
    data = {
      notificationId: new Date().getTime(),
      receiver: "178uy89jhybn758",
      projectId: "10l18jmz18",
      content: "<div><p>Notification</p></html>",
      isRead: false,
    }
    console.log(data);

    if (!data) res.write(`:\n\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 6000);

  req.on("close", function() {
    console.log(`Close.`);
    clearInterval(intervalId);
  });

  req.on("end", function() {
    lconsole.log("end connection")
  });
});

app.listen(3002, function() {
  console.log('Example app listening on port 3002!');
});