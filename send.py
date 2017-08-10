from urllib2 import *
import urllib
import json

MY_API_KEY="AAAAeOLXjgM:APA91bFHkr29sxpwyStuwt_APgH4NcMduN0yiz6qbK__pGkHIUBy-pdvzDjoP-RIAE8_yHF3PKur2MdPgMgGiuY1GOYHKRj1goHPhPPWNeXZtPojHcxOPMa01E7KSIwCdNkI5va1qjpN"

data={
    "to" : "/topics/my_little_topic",
    "notification" : {
        "body" : sys.argv[1],
        "title" : sys.argv[2],
        "icon" : "ic_alarm_black_24dp"
    }
}
dataAsJSON = json.dumps(data)
request = Request(
    "https://gcm-http.googleapis.com/gcm/send",
    dataAsJSON,
    { "Authorization" : "key="+MY_API_KEY,
      "Content-type" : "application/json"
    }
)
print urlopen(request).read()
