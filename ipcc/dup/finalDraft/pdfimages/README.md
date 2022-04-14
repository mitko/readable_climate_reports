# Image extraction 

PDFBox/PMR automatically identifies images as bitmaps and gives their screen coordinates. For example
```
image.200.1.72_523.30_338.png
```
represents:
```
<page>.<image_in_page>.<x0>_<x1>.<y0>_<y1>.png
```
NOTE:

* pages start at 0
* images in page are 1-based
* coords are (0,0) == (LEFT, TOP) and DOWN the page


