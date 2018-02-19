# gilded_rose

# Setup
###System Requirements:
 - nodejs is installed (I said >=8.0 because that's what I've developed on, though I'm sure an earlier version will cut it
 - Probably any OS with a terminal and POSIX-compliant shell

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


# Third party tools/frameworks used
I kept dependencies to a minimum, I think. All that's needed is:
 - express - provides a nice, easy way to create a node API fast
 - moment - really convenient set of functionality for working with dates and times
 - priorityqueuejs - implementation of a priority queue giving you callback-driven sorting. Used for optimal (I think) booking algorithm
