# Footprinter

http://footprinter.xyz/

![Screencast](github/usage.gif?raw=true)

Creating component footprints is the most tedious part of any PCB layout project.

A lot of this pain comes from a single discrepancy:

- PCB design software expects us to enter pads with height and width centred at some grid coordinate
  -Component datasheets give recommended PCB footprints as strictly dimensioned mechanical drawings.

Drawing a footprint therefore involves a lot of mental arithmetic, resizing of grids and gentle sobbing.

This project offers a different approach to make KiCad footprint creation as painless as possible. By drawing footprints on top of the datasheet you can immediately verify that the pads are going in the right spot.

## Usage

- Screenshot the recommended footprint from the part's datasheet (photos of real PCBs work too).

- Drag and drop (or select) the image file.

- Drag and resize the scale bar to match a dimension on the drawing and enter its length to scale the image.

- Draw all the required pads.

- Export a KiCad footprint.
