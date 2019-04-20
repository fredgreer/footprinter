export const MOD_TEMPLATE = (
  name,
  timestamp,
  pads
) => `(module "${name}" (layer F.Cu) (tedit ${timestamp})
  (fp_text reference REF** (at 0 0.5) (layer F.SilkS)
    (effects (font (size 1 1) (thickness 0.15)))
  )
  (fp_text value "${name}" (at 0 -0.5) (layer F.Fab)
    (effects (font (size 1 1) (thickness 0.15)))
  )
${pads}
)`;

export const PAD_TEMPLATE = (
  pinNum,
  x,
  y,
  h,
  w
) => `  (pad ${pinNum} smd rect (at ${x} ${y}) (size ${w} ${h}) (layers F.Cu)
    (zone_connect 0))`;
