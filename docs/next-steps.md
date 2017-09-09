# Suggested next steps

## Security

In case of more non-trivial interaction with the client, it could be beneficial
to use security modules like Lusca. 

## Pagination for /hazardous

As mentioned in the Assumptions, it could be beneficial to add pagination for
the results.

## Add unit tests

It is possible to add unit tests with the module rewire. It didn't feel like it
was necessary.

## Add better logging for production environment

There should be a little bit more logging going on. Also the logging should be
differentiated based on the current NODE_EN.

## Change to the NEO data model

First of all, some of the data is missing for the NEOs. That is why some of the
model parameters are not required.
Second date and speed are inside of an array. Therefor one could assume, that
some asteroids come back, every now and then.

## Use async await / drop lodash/fp

I might try this out to see how much the code looks cleaner with async await.
The advantage of async await is that some if conditions / more complex is more
readable. In order to do so, I would need to switch from lodash/fp to lodash.

## Why Lodash/fp?

I like the thought of a data stream, which is easily modelled with lodash/fp 
functions which switch the order of arguments and adding curry to it.
