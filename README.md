# Raccoon

![Image of Raccoon](https://s-media-cache-ak0.pinimg.com/236x/73/47/11/734711d3bf78c2391e6ff06c6df759d4.jpg)

Javascript player from lean poker tournament.

### Hooks commits

pre-push for run tests and update version
```
#!/bin/sh

echo "Running tests"
STATUS=0

npm test
if [ $? -ne 0 ]
then
   echo "Tests had failed - push aborted"
   STATUS=1
fi

npm version minor

exit $STATUS
```

pre-commit for run tests
```
#!/bin/sh

echo "Running tests"
STATUS=0

npm test
if [ $? -ne 0 ]
then
   echo "Tests had failed - commit aborted"
   STATUS=1
fi

exit $STATUS
```