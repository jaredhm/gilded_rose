# gilded_rose

# Setup
### System Requirements:
 - nodejs is installed (I said >=8.0 because that's what I've developed on, though I'm sure an earlier version will cut it
 - Probably any OS with a terminal and POSIX-compliant shell

### Startup:
Setup should be as easy as:
```
git clone https://github.com/jaredhm/gilded_rose.git && cd gilded_rose
npm install
npm start
```
This ought to install all the required dependencies locally and then run the application. Once this is done, you ought to see the following printed to your terminal:
``` 
Booking app listening on port 3000!
```

# Using the API:
### Querying for a booking:
To query for a room assignment which will satisfy guest and luggage constraints, do
```
 GET /booking/guests/:numGuest/luggage/:storageNeeded
```
Where both `numGuests` and `storageNeeded` are integers. For example:
```
curl -XGET -w '\nCode:%{http_code}' localhost:3000/booking/guests/2/luggage/3
{
   "error" : "",
   "booking" : {
      "gold" : 0,
      "rooms" : {
         "Foo" : {
            "beds" : [
               {
                  "openLuggageSlots" : 0,
                  "guest" : {
                     "luggage" : 1
                  },
                  "name" : "A"
               }
            ]
         },
         "Baz" : {
            "beds" : [
               {
                  "name" : "A",
                  "guest" : {
                     "luggage" : 2
                  },
                  "openLuggageSlots" : 0
               }
            ]
         }
      }
   }
}
Code: 200
```
When the booking can't be satisfied, the API will respond as followings:
```
curl -XGET -w '\nCode: %{http_code}' localhost:3000/booking/guests/2/luggage/4
{
   "error" : "Could not accomodate booking"
}
Code: 404
```

### Making a booking:
When the client wishes to make a booking for a set of luggage and guest constraints, do
```
POST /booking/guests/:numGuest/luggage/:storageNeeded
```
Again, both `numGuests` and `storageNeeded` are integers here. An example query:
```
curl -XPOST -w '\nCode: %{http_code}' localhost:3000/booking/guests/2/luggage/3
{
   "error" : "",
   "booking" : {
      "rooms" : {
         "Foo" : {
            "beds" : [
               {
                  "name" : "A",
                  "guest" : {
                     "luggage" : 1
                  },
                  "openLuggageSlots" : 0
               }
            ]
         },
         "Baz" : {
            "beds" : [
               {
                  "name" : "A",
                  "openLuggageSlots" : 0,
                  "guest" : {
                     "luggage" : 2
                  }
               }
            ]
         }
      },
      "gold" : 21
   }
}
Code: 200
```
When the booking can't be satisfied, the API will respond as followings:
```
curl -XPOST -w '\nCode: %{http_code}' localhost:3000/booking/guests/2/luggage/4
{
   "error" : "Could not accomodate booking"
}
Code: 404
```

# Third party tools/frameworks used
I kept dependencies to a minimum, I think. All that's needed is:
 - express - provides a nice, easy way to create a node API fast
 - moment - really convenient set of functionality for working with dates and times
 - priorityqueuejs - implementation of a priority queue giving you callback-driven sorting. Used for optimal (I think) booking algorithm
