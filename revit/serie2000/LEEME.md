# Catalogos de tipos Revit - Accesorios forjados roscados

Cotas en mm (largo del niple en cm). Todos los archivos usan la misma convencion:
columna vacia + parametros con tipo de unidad (formato de catalogo de tipos de Revit).
Sin probar en Revit todavia.

## Como cargarlos
1. Crear (o duplicar de las familias de epoxi) la familia `.rfa` con el MISMO nombre que el `.txt`.
2. Crear en la familia parametros de **tipo** con los nombres exactos de la primera fila del `.txt`.
3. Vincular: `Diametro_nominal` al conector; las cotas a la geometria.
4. Dejar `.rfa` y `.txt` en la misma carpeta (PLANTILLAS INST-ARQ). Al cargar, Revit ofrece las medidas.
5. Los nombres de tipo no pueden llevar comillas dobles: por eso dicen "pulg".

## Archivos y parametros

| Archivo | Parametros | Medidas | Fuente |
|---|---|---|---|
| Codo_90_HH_Serie2000 | Diametro_nominal, A, B | 1/8" a 4" | Arana, Serie 2000 |
| Codo_45_HH_Serie2000 | Diametro_nominal, A, B | 1/8" a 4" | Arana, Serie 2000 |
| Tee_HHH_Serie2000 | Diametro_nominal, A, B | 1/8" a 4" | Arana, Serie 2000 |
| Cupla_HH_Serie2000 | Diametro_nominal, W, D | 1/8" a 4" | Arana / ref. 3000 lb |
| Buje_Reduccion_MH_Serie2000 | DN_mayor, DN_menor, A, F | 66 combinaciones | JGK |
| Union_Doble_HH_3000lb | Diametro_nominal, A, B | 1/4" a 3" | JGK, 3000 lb |
| Entrerrosca_3000lb | Diametro_nominal, A, B, Entrecara, C | 1/4" a 4" | JGK, 3000 lb |
| Niple_Serie2000 | Diametro_nominal, Diametro_exterior, Espesor_Sch40, Largo | 1/2" a 2" x 7 largos | JGK (Sch 40) |

Parametros extra de texto en todos: `Serie`, `Medida_comercial` (para el listado de materiales).

## Significado de las cotas
- Codos y tee: A = centro a extremo; B = ancho del cuerpo (segun dibujo del catalogo).
- Cupla: W = largo total; D = diametro exterior.
- Buje: A = largo; F = medida entre caras del hexagono.
- Union doble: A = diametro del cuerpo (entre vertices); B = largo total (deducido, sin confirmar).
- Entrerrosca: A = largo total; Entrecara = entre caras del hexagono; B y C sin confirmar.

## Dudas abiertas (verificar antes de modelar)
- Codo 90, 1/2": Arana 29 mm, JGK 28 mm. Codos 90/45, 3", B: Arana 110, JGK 109.
- Cupla 3/8": largo 48 mm (Arana dice 38, probable error). Cupla: W y D son de 3000 lb; el diametro exterior de 2000 es menor.
- Union doble y entrerrosca: no hay tabla de 2000 lb en los catalogos consultados.
- Entrerrosca 3", cota A: el catalogo JGK dice 408; se uso 108 (error evidente).
- Rosca (gas Whitworth o NPT) y aceptacion de la serie por la distribuidora: confirmar.

Cotas de origen: ver `serie2000_arana_cotas.csv` y `serie2000_jgk_cotas.csv` en la raiz del repo.
