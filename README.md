## installation
run npm install to install testing dependencies

##What?

A Stopwatch!

##How?

- The stopwatch is a single Javascript object `Watch` with methods `start()`, `stop()`, `lap()` and `reset()`.
- The digits are drawn with svg paths, filled white on a white background. The paths were extracted from a font file.
- Every second, a fill() function randomly adds rectangles behind the paths and then takes them away.
 
##Testing

Adding the svg animations broke the tests. We have not figured out why!


